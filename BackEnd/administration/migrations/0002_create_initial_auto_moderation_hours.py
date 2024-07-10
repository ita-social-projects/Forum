from django.db import migrations

def create_auto_moderation_hours(apps, schema_editor):
    AutoModerationModel = apps.get_model('administration', 'AutoModeration')
    AutoModerationModel.objects.create(pk=1, auto_moderation_hours=12)

def delete_auto_moderation_hours(apps, schema_editor):
    AutoModerationModel = apps.get_model('administration', 'AutoModeration')
    AutoModerationModel.objects.filter(pk=1).delete()

class Migration(migrations.Migration):

    dependencies = [
        ('administration', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_auto_moderation_hours, delete_auto_moderation_hours),
    ]
