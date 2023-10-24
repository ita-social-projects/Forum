from django_filters import filters
from django_filters.rest_framework import FilterSet


class CompanyFilter(FilterSet):
    name = filters.CharFilter(method="by_name_filter")
    region = filters.CharFilter(method="by_region_filter")

    def by_name_filter(self, queryset, name, value):
        if value:
            name = value.strip()
            return queryset.filter(name__icontains=name)
        else:
            return queryset.none()

    def by_region_filter(self, queryset, name, value):
        if value:
            region = value.strip()
            return queryset.filter(region__icontains=region)
        else:
            return queryset.none()
