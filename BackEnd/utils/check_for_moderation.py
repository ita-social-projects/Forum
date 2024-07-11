from django.utils.timezone import now

from images.models import ProfileImage


def check_for_moderation(profile):
    moderation_is_needed = False
    if profile.banner != profile.banner_approved:
        banner = ProfileImage.objects.filter(hash_md5=profile.banner.hash_md5).exclude(uuid=profile.banner_id).first()
        if banner and banner.is_approved:
            profile.banner.is_approved = True
            profile.banner.save()
            profile.banner_approved = profile.banner
            profile.save()
        else:
            profile.moderation_status = "pending moderation"
            profile.status_updated_at = now()
            profile.save()
            moderation_is_needed = True
    if profile.logo != profile.logo_approved:
        logo = ProfileImage.objects.filter(hash_md5=profile.logo.hash_md5).exclude(uuid=profile.logo_id).first()
        if logo and logo.is_approved:
            profile.logo.is_approved = True
            profile.logo.save()
            profile.logo_approved = profile.logo
            profile.save()
        else:
            profile.moderation_status = "pending moderation"
            profile.status_updated_at = now()
            profile.save()
            moderation_is_needed = True
    return moderation_is_needed



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