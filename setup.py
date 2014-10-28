from setuptools import setup, find_packages


setup(
    name="django-location-picker",
    version='0.2.0',
    url="https://github.com/jamesfoley/django-location-picker",
    author="James Foley",
    author_email="jamesfoley@onespacemedia.com",
    platforms=["any"],
    packages=find_packages(),
    include_package_data=True,
    description='A location picker field for the Django admin',
    install_requires=[
        'django',
    ],
)
