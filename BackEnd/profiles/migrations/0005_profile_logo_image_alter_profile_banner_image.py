# Generated by Django 4.2.4 on 2023-12-09 15:58

from django.db import migrations, models
import validation.validate_image


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_alter_viewedcompany_unique_together_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='logo_image',
            field=models.ImageField(null=True, upload_to='logos', validators=[validation.validate_image.validate_image_format, validation.validate_image.validate_logo_size]),
        ),
        migrations.AlterField(
            model_name='profile',
            name='banner_image',
            field=models.ImageField(null=True, upload_to='banners', validators=[validation.validate_image.validate_image_format, validation.validate_image.validate_banner_size]),
        ),
    ]