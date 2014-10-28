from django.db import models
from .widgets import LocationPickerWidget


class LocationField(models.CharField):
    def formfield(self, **kwargs):
        kwargs['widget'] = LocationPickerWidget
        return super(LocationField, self).formfield(**kwargs)