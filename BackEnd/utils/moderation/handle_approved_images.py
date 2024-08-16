from ..completeness_counter import completeness_count


class ApprovedImages:
    def __init__(self, profile):
        self.profile = profile

    def delete_approved_image(self, approved_image):
        if self.profile.status == self.profile.PENDING and approved_image:
            approved_image.is_deleted = True
            approved_image.save()
            completeness_count(self.profile)
    
    def check_approved_images(self):
        if self.profile.banner and self.profile.banner.is_deleted:
            self.delete_approved_image(self.profile.banner_approved)

        if self.profile.logo and self.profile.logo.is_deleted:
            self.delete_approved_image(self.profile.logo_approved)
