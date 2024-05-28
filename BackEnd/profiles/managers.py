from django.db import models


class ProfileManager(models.QuerySet):
    def active_only(self):
        return self.filter(is_deleted=False, person__is_active=True)
