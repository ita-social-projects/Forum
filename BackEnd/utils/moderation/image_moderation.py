from django.utils.timezone import now


class ModerationManager:
    def __init__(self, profile):
        self.profile = profile
        self.moderation_is_needed = False
        self.banner_logo = {"banner": None, "logo": None}
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
            self.banner_logo["banner"] = self.profile.banner
        elif not self.profile.banner and self.profile.logo:
            self.handle_approved_status(self.profile.logo)

        if self.needs_moderation(self.profile.logo):
            self.update_pending_status()
            self.banner_logo["logo"] = self.profile.logo
        elif not self.profile.logo and self.profile.banner:
            self.handle_approved_status(self.profile.banner)

        self.handle_undefined_status()
        return self.moderation_is_needed
