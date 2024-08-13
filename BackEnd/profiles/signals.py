from django.dispatch import Signal, receiver

from .models import SavedCompany

profile_retrieved = Signal()


@receiver(profile_retrieved)
def reset_is_updated(sender, company, user, **kwargs):
    SavedCompany.objects.filter(user=user, company=company).update(
        is_updated=False
    )
