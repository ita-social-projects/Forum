from django_filters import filters
from django_filters.rest_framework import FilterSet


class ProfileFilter(FilterSet):
    is_saved = filters.BooleanFilter(method="is_saved_filter")
    is_registered = filters.BooleanFilter()
    is_startup = filters.BooleanFilter()
    activities__name = filters.CharFilter()

    def is_saved_filter(self, queryset, name, value):
        if value:
            if self.request.user.is_authenticated:
                queryset = queryset.filter(saved_list__user=self.request.user)
            else:
                queryset = queryset.none()
        return queryset

    ordering = filters.OrderingFilter(
        fields=(
            # field_name / alias
            ("name", "name"),
            ("saved_list__added_at", "saved_at"),
            ("completeness", "completeness"),
            ("created_at", "created_at"),
        )
    )
