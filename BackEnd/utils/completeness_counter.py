from profiles.models import Activity, Category, Region
from images.models import ProfileImage


def completeness_count(instance):
    instance.completeness = 0
    if instance.banner_approved and ProfileImage.objects.filter(
        is_deleted=False, uuid=instance.banner_approved.uuid
    ):
        instance.completeness += 100
    if instance.logo_approved and ProfileImage.objects.filter(
        is_deleted=False, uuid=instance.logo_approved.uuid
    ):
        instance.completeness += 1
    if Region.objects.all().filter(profile=instance.id):
        instance.completeness += 1
    if Activity.objects.all().filter(profile=instance.id):
        instance.completeness += 1
    if Category.objects.all().filter(profile=instance.id):
        instance.completeness += 1
    instance.save()
