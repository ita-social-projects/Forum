from django_filters import filters
from django_filters.rest_framework import FilterSet, OrderingFilter


class CompanyFilter(FilterSet):
    name = filters.CharFilter(method="by_name_filter")
    regions_ukr = filters.CharFilter(method="by_regions_ukr_filter")
    regions_eng = filters.CharFilter(method="by_regions_eng_filter")

    def by_name_filter(self, queryset, name, value):
        if value:
            name = value.strip()
            return queryset.filter(name__icontains=name)
        else:
            return queryset.none()

    def by_regions_ukr_filter(self, queryset, name, value):
        if value:
            region = value.strip()
            return queryset.filter(regions__name_ukr__icontains=region)
        else:
            return queryset.none()

    def by_regions_eng_filter(self, queryset, name, value):
        if value:
            region = value.strip()
            return queryset.filter(regions__name_eng__icontains=region)
        else:
            return queryset.none()
