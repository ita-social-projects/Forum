from django_filters import filters
from django_filters.rest_framework import FilterSet


class ProfileFilter(FilterSet):
    is_saved = filters.BooleanFilter(method="is_saved_filter")
    company = filters.BooleanFilter(field_name="is_registered")
    startup = filters.BooleanFilter(field_name="is_startup")
    activity_type = filters.CharFilter(field_name="activities__name")

    def is_saved_filter(self, queryset, name, value):
        if value:
            if self.request.user.is_authenticated:
                queryset = queryset.filter(saved_list__user=self.request.user)
            else:
                queryset = queryset.none()
        return queryset

    def company_filter(self, queryset, name, value):
        if value:
            return queryset.filter(is_registered=True)
        return queryset
    
    def startup_filter(self, queryset, name, value):
        if value:
            return queryset.filter(is_startup=True)
        return queryset

    def activity_type_filter(self, queryset, name, value):
        if value:
            queryset = queryset.filter(activities__name=value)
        return queryset
