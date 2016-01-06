from __future__ import division
import json

from filer.thumbnail_processors import normalize_point_subject_location
from filer.settings import FILER_IMAGE_MODEL

SUBJ_RECTANGLE_TO_ORIGINAL_RATIO = 0.05


def focal_point_to_rectangle(model_cls, ratio=SUBJ_RECTANGLE_TO_ORIGINAL_RATIO):
    """Migrate 'subject_location' values from single point to rectangle"""

    # We do not have to migrate this field in custom models.
    if FILER_IMAGE_MODEL:
        return

    for img in model_cls.objects.all():
        # Get old subject location coordinates.
        old_subject_location = normalize_point_subject_location(
            img.subject_location)

        # Get reasonable new subject location rectangle size.
        w, h = [int(d * ratio) for d in (img._width, img._height)]

        # import ipdb; ipdb.set_trace()
        if old_subject_location:
            # Place new subject rectangle center at the previous
            # subject_location point, but not outside the image.
            x = max(0, old_subject_location[0] - int(w / 2))
            y = max(0, old_subject_location[1] - int(h / 2))
            img.subject_location = json.dumps(
                dict(top=y, left=x, width=w, height=h))
        else:
            # We've got no subject location or wrong value from the database,
            # so the simplest way is to empty the field. The admin form
            # behaviour with empty values depends on the front-end
            # implementation.
            img.subject_location = None
        img.save()
