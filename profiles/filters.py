from django_filters import filters
from django_filters.rest_framework import FilterSet


class ProfileFilter(FilterSet):
    is_saved = filters.BooleanFilter(method="is_saved_filter")

    def is_saved_filter(self, queryset, name, value):
        if value:
            return queryset.filter(saved_list__user=self.request.user)
        return queryset