import os
from celery import Celery
from celery.schedules import crontab

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "forum.settings")
app = Celery("forum")

app.config_from_object("django.conf:settings", namespace="CELERY")

app.autodiscover_tasks()

app.conf.beat_schedule = {
    "every": {
        "task": "images.tasks.celery_send_email_images",
        "schedule": crontab(minute=0, hour=9, day_of_month="1"),
    }
}
