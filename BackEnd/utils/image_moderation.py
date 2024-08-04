from django.utils.timezone import now
from utils.completeness_counter import completeness_count


class ModerationManager:
    def __init__(self, profile):
        self.profile = profile
        self.moderation_is_needed = False
        self.banner_logo = {"banner": None, "logo": None}

    def update_status(self):
        self.profile.status = "pending"
        self.profile.status_updated_at = now()
        self.profile.save()
        self.moderation_is_needed = True

    def needs_moderation(self, image):
        return image and not image.is_approved and not image.is_deleted

    def check_for_moderation(self):
        if self.needs_moderation(self.profile.banner):
            self.update_status()
            self.banner_logo["banner"] = self.profile.banner
        if self.needs_moderation(self.profile.logo):
            self.update_status()
            self.banner_logo["logo"] = self.profile.logo
        return self.moderation_is_needed

    def approve_image(self):
        if self.needs_moderation(self.profile.banner):
            self.profile.banner.is_approved = True
            self.profile.banner.save()
            self.profile.banner_approved = self.profile.banner
        if self.needs_moderation(self.profile.logo):
            self.profile.logo.is_approved = True
            self.profile.logo.save()
            self.profile.logo_approved = self.profile.logo
        self.profile.status = "approved"
        self.profile.status_updated_at = now()
        self.profile.save()
        completeness_count(self.profile)
