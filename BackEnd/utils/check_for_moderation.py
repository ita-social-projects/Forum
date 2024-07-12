from utils.completeness_counter import completeness_count
from images.models import ProfileImage


class ModerationManager:
    def __init__(self, profile):
        self.profile = profile
        self.moderation_is_needed = False

    def update_image(self, image, image_type):
        existing_image = ProfileImage.objects.filter(
            hash_md5=image.hash_md5, is_approved=True).exclude(uuid=image.uuid).first()
        print(existing_image) # 0d225102-903f-44ca-9b4e-cdde6116a63f
        if existing_image:
            image.is_approved = True
            image.save()
            setattr(self.profile, f'{image_type}_approved', image)
            completeness_count(self.profile)
            self.profile.save()
        else:
            self.profile.status = "pending"
            self.profile.save()
            self.moderation_is_needed = True

    def check_for_moderation(self):
        if self.profile.banner != self.profile.banner_approved:
            self.update_image(self.profile.banner, 'banner')
        if self.profile.logo != self.profile.logo_approved:
            self.update_image(self.profile.logo, 'logo')
        return self.moderation_is_needed
    