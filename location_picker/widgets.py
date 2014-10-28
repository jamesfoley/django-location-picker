from django import forms


class LocationPickerWidget(forms.TextInput):
    def render(self, name, value, attrs=None):
        if None == attrs:
            attrs = {}
        attrs['readonly'] = 'readonly'
        attrs['class'] = 'location_picker'
        return super(LocationPickerWidget, self).render(name, value, attrs)

    class Media:
        css = {
            'all': (
                '/static/css/location_picker.css',
            )
        }
        js = (
            'https://maps.googleapis.com/maps/api/js',
            '/static/js/location_picker.js',
        )
