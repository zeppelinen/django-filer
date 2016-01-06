# -*- coding: utf-8 -*-
from __future__ import unicode_literals, division

from django.db import migrations
from filer.utils.migrations import focal_point_to_rectangle


def convert_focal_point_to_rectangle(apps, schema_editor):
    focal_point_to_rectangle(model_cls=apps.get_model("filer", "Image"))


class Migration(migrations.Migration):

    dependencies = [
        ('filer', '0002_auto_20150606_2003'),
    ]

    operations = [
        migrations.RunPython(convert_focal_point_to_rectangle),
    ]
