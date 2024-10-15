from django_filters import filters
from django_filters.rest_framework import FilterSet
from authentication.models import CustomUser
from rest_framework import viewsets


class UsersFilter(FilterSet):
    id = filters.CharFilter(lookup_expr="icontains")
    surname = filters.CharFilter(lookup_expr="icontains")
    email = filters.CharFilter(lookup_expr="icontains")
    company_name = filters.CharFilter(
        field_name="profile__name", lookup_expr="icontains"
    )
    status = filters.CharFilter(lookup_expr="icontains")
    registration_date = filters.CharFilter(lookup_expr="icontains")

    def is_saved_filter(self, queryset, name, value):
        if value:
            if self.request.user.is_authenticated:
                queryset = queryset.filter(saved_list__user=self.request.user)
            else:
                queryset = queryset.none()
        return queryset

    ordering = filters.OrderingFilter(
        fields=(
            ("id", "id"),
            ("surname", "surname"),
            ("email", "email"),
            ("company_name", "company_name"),
            ("registration_date", "registration_date"),
            ("status", "status"),
        )
    )

    class Meta:
        model = CustomUser
        fields = [
            "id",
            "surname",
            "email",
            "company_name",
            "status",
            "registration_date",
        ]
