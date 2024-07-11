from django.utils.timezone import now

from images.models import ProfileImage


class ModerationManager:
    def __init__(self, profile):
        self.profile = profile
        self.moderation_is_needed = False

    def update_image(self, image, image_type):
        existing_image = ProfileImage.objects.filter(hash_md5=image.hash_md5).exclude(uuid=image.uuid).first()
        if existing_image and image.is_approved:
            image.is_approved = True
            image.save()
            setattr(self.profile, f'{image_type}_approved', image)
            self.profile.save()
        else:
            self.profile.moderation_status = "pending moderation"
            self.profile.status_updated_at = now()
            self.profile.save()
            self.moderation_is_needed = True

    def check_for_moderation(self):
        if self.profile.banner != self.profile.banner_approved:
            self.update_image(self.profile.banner, 'banner')
        if self.profile.logo != self.profile.logo_approved:
            self.update_image(self.profile.logo, 'logo')
        return self.moderation_is_needed