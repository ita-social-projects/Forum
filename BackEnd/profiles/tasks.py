from celery import shared_task

from .models import Profile

@shared_task
def t_cel(profile_id, text):
    p = Profile.objects.get(pk=profile_id)
    p.address = text
    p.save()

    


