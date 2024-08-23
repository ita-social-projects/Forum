from django.utils.timezone import now
from celery.result import AsyncResult

from administration.models import AutoapproveTask, AutoModeration
from profiles.tasks import celery_autoapprove


class ModerationManager:
    def __init__(self, profile):
        self.profile = profile
        self.moderation_is_needed = False

    def update_status(self):
        self.profile.status = self.profile.PENDING
        self.profile.status_updated_at = now()
        self.profile.save()
        self.moderation_is_needed = True

    def needs_moderation(self, image):
        return image and not image.is_approved and not image.is_deleted

    def check_for_moderation(self):
        if self.needs_moderation(self.profile.banner):
            self.update_status()
        if self.needs_moderation(self.profile.logo):
            self.update_status()
        return self.moderation_is_needed

    def schedule_autoapprove(self):
        self.revoke_deprecated_autoapprove()
        banner_uuid = str(self.profile.banner.uuid)
        logo_uuid = str(self.profile.logo.uuid)
        delay = (
            (AutoModeration.get_auto_moderation_hours().auto_moderation_hours)
            * 60
            * 60
        )
        result = celery_autoapprove.apply_async(
            (self.profile.id, banner_uuid, logo_uuid), countdown=delay
        )

        task = AutoapproveTask(celery_task_id=result.id, profile=self.profile)
        task.save()

    def revoke_deprecated_autoapprove(self):
        deprecated_task = AutoapproveTask.objects.filter(
            profile=self.profile
        ).first()

        if deprecated_task:
            celery_deprecated_task = AsyncResult(
                id=deprecated_task.celery_task_id
            )
            celery_deprecated_task.revoke()
            deprecated_task.delete()
