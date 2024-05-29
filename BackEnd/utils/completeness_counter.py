from profiles.models import Profile, Activity, Category, Region


def completeness_count(serializer):
    instance = serializer.save()
    instance.completeness = 0
    if instance.banner_image:
        instance.completeness += 100
    if instance.logo_image:
        instance.completeness += 1
    if Region.objects.all().filter(profile=instance.id):
        instance.completeness += 1
    if Activity.objects.all().filter(profile=instance.id):
        instance.completeness += 1
    if Category.objects.all().filter(profile=instance.id):
        instance.completeness += 1
    instance.save()
