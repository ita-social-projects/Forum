import logging

from django.utils.timezone import now
from celery.result import AsyncResult
from kombu.exceptions import OperationalError
from redis.exceptions import ConnectionError

from administration.models import AutoapproveTask, AutoModeration
from profiles.tasks import celery_autoapprove


logger = logging.getLogger(__name__)


class ModerationManager:
    def __init__(self, profile):
        self.profile = profile
        self.moderation_is_needed = False
        self.images = {"banner": None, "logo": None}
        self.content_deleted = False

    def handle_approved_status(self, secondary_image):
        if (
            self.profile.status == self.profile.PENDING
            and secondary_image.is_approved
        ):
            self.profile.status = self.profile.APPROVED
            self.profile.status_updated_at = now()
            self.content_deleted = True
            self.profile.save()

    def handle_undefined_status(self):
        banner = self.profile.banner
        logo = self.profile.logo

        if not banner and not logo:
            if self.profile.status == self.profile.PENDING:
                self.content_deleted = True
            self.profile.status = self.profile.UNDEFINED
            self.profile.status_updated_at = now()
        self.profile.save()

    def update_pending_status(self):
        self.profile.status = self.profile.PENDING
        self.profile.status_updated_at = now()
        self.profile.save()
        self.moderation_is_needed = True

    def needs_moderation(self, image):
        return image and not image.is_approved

    def check_for_moderation(self):
        if self.needs_moderation(self.profile.banner):
            self.update_pending_status()
            self.images["banner"] = self.profile.banner
        elif not self.profile.banner and self.profile.logo:
            self.handle_approved_status(self.profile.logo)

        if self.needs_moderation(self.profile.logo):
            self.update_pending_status()
            self.images["logo"] = self.profile.logo
        elif not self.profile.logo and self.profile.banner:
            self.handle_approved_status(self.profile.banner)

        self.handle_undefined_status()
        return self.moderation_is_needed

    def schedule_autoapprove(self):
        """Make shure that you called check_for_moderation on your ModerationManager instance, before scheduling autoapprove."""
        try:
            self.revoke_deprecated_autoapprove()
            if self.moderation_is_needed and not self.content_deleted:
                banner = self.images.get("banner")
                logo = self.images.get("logo")
                banner_uuid = str(banner.uuid) if banner else None
                logo_uuid = str(logo.uuid) if logo else None
                delay = (
                    (
                        AutoModeration.get_auto_moderation_hours().auto_moderation_hours
                    )
                    * 60
                    # * 60
                )
                result = celery_autoapprove.apply_async(
                    (self.profile.id, banner_uuid, logo_uuid), countdown=delay
                )

                task = AutoapproveTask(
                    celery_task_id=result.id, profile=self.profile
                )
                task.save()
        except (OperationalError, ConnectionError) as e:
            logger.error(e)

    def revoke_deprecated_autoapprove(self):
        try:
            deprecated_task = AutoapproveTask.objects.filter(
                profile=self.profile
            ).first()

            if deprecated_task:
                celery_deprecated_task = AsyncResult(
                    id=deprecated_task.celery_task_id
                )
                celery_deprecated_task.revoke()
                deprecated_task.delete()
        except (OperationalError, ConnectionError) as e:
            logger.error(e)
