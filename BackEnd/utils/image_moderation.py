from utils.completeness_counter import completeness_count
from images.models import ProfileImage


class ModerationManager:
    def __init__(self, profile):
        self.profile = profile
        self.moderation_is_needed = False

    def update_image(self, image, image_type):
        existing_image = ProfileImage.objects.filter(
            hash_md5=image.hash_md5, is_approved=True
        ).first()
        if existing_image:
            image.is_approved = True
            image.save()
            setattr(self.profile, f"{image_type}_approved", image)
            completeness_count(self.profile)
            self.profile.save()
        else:
            self.profile.status = "pending"
            self.profile.save()
            self.moderation_is_needed = True

    def check_for_moderation(self):
        if self.profile.banner != self.profile.banner_approved:
            self.update_image(self.profile.banner, "banner")
        if self.profile.logo != self.profile.logo_approved:
            self.update_image(self.profile.logo, "logo")
        if (
            self.profile.banner.is_deleted and self.profile.logo.is_approved
        ) or (
            self.profile.logo.is_deleted and self.profile.banner.is_approved
        ):
            self.moderation_is_needed = False
        return self.moderation_is_needed
