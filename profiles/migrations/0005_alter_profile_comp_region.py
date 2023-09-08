# Generated by Django 4.2.3 on 2023-09-08 18:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('profiles', '0004_viewedcompany'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='comp_region',
            field=models.CharField(choices=[('Kyiv', 'Київська область'), ('Vinnytsia', 'Вінницька область'), ('Volyn', 'Волинська область'), ('Dnipro', 'Дніпропетровська область'), ('Donetsk', 'Донецька область'), ('Zhytomyr', 'Житомирська область'), ('Zakarpattia', 'Закарпатська область'), ('Zaporizhzhia', 'Запорізька область'), ('IvanoFrankivsk', 'Івано-Франківська область'), ('Kirovohrad', 'Кіровоградська область'), ('Crimea', 'Крим'), ('Luhansk', 'Луганська область'), ('Lviv', 'Львівська область'), ('Mykolaiv', 'Миколаївська область'), ('Odesa', 'Одеська область'), ('Poltava', 'Полтавська область'), ('Rivne', 'Рівненська область'), ('Sumy', 'Сумська область'), ('Ternopil', 'Тернопільська область'), ('Kharkiv', 'Харківська область'), ('Kherson', 'Херсонська область'), ('Khmelnytskyi', 'Хмельницька область'), ('Cherkasy', 'Черкаська область'), ('Chernivtsi', 'Чернівецька область'), ('Chernihiv', 'Чернігівська область')], default=None, max_length=128, null=True),
        ),
    ]
