from django_filters import filters
from django_filters.rest_framework import FilterSet


class CompanyFilter(FilterSet):
    name = filters.CharFilter(method='by_name_filter')
    region = filters.CharFilter(method='by_region_filter')

    def by_name_filter(self, queryset, name, value):
        if value:
            name = self.request.query_params.get('name', '').strip()
            return queryset.filter(name__icontains=name).order_by('name')
        else:
            return queryset.none()

    def by_region_filter(self, queryset, name, value):
        if value:
            region = self.request.query_params.get('region', '').strip()
            return queryset.filter(region__icontains=region).order_by('region')
        else:
            return queryset.none()
