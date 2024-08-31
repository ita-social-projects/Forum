from celery import shared_task
from datetime import timedelta

from django.db.models import Sum, Count
from django.utils import timezone

from .models import ProfileImage


@shared_task()
def celery_send_email_images():
    now = timezone.now()
    photos = ProfileImage.objects.filter(created_at__gte=now-timedelta(days=30))
    logo_data = photos.filter(image_type=ProfileImage.LOGO).aggregate(
        total_size=Sum('image_size'),
        count=Count('uuid')
    )
    banner_data = photos.filter(image_type=ProfileImage.BANNER).aggregate(
        total_size=Sum('image_size'),
        count=Count('uuid')
    )

    logo_total_size_kb = (logo_data['total_size'] / 1024).round(2)
    banner_total_size_kb = (banner_data['total_size'] / 1024).round(2)

    print(str(logo_total_size_kb) + 'kb', str(banner_total_size_kb) + 'kb')
