=====
Django Location Picker
=====

Simply adds a field to the django admin with a map that allows the user to pick a location on a map.

Quick start
-----------

1. Add "location_picker" to your INSTALLED_APPS setting like this::

    INSTALLED_APPS = (
        ...
        'location_picker',
    )

2. Import the field in your models.py::

    from location_picker.fields import LocationField

3. Add the location field to your model::

    location = LocationField(
        max_length=256,
        null=True,
        blank=True
    )
