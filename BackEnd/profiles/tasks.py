from celery import shared_task

from .models import Profile
from images.models import ProfileImage
from utils.completeness_counter import completeness_count


@shared_task
def celery_autoapprove(profile_id, banner_uuid, logo_uuid):
    profile = Profile.objects.get(pk=profile_id)
    profile.status = "approved"
    banner = ProfileImage.objects.get(pk=banner_uuid)
    logo = ProfileImage.objects.get(pk=logo_uuid)
    banner.is_approved = True
    logo.is_approved = True
    profile.banner_approved = banner
    profile.logo_approved = logo
    profile.save()
    banner.save()
    logo.save()
    completeness_count(profile)
