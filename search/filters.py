from django_filters import filters
from django_filters.rest_framework import FilterSet


class CompanyFilter(FilterSet):
    name = filters.CharFilter()
    region = filters.CharFilter()
