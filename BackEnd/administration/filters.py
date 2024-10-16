from django_filters import filters
from django_filters.rest_framework import FilterSet
from authentication.models import CustomUser


class UsersFilter(FilterSet):
    id = filters.CharFilter(lookup_expr="icontains")
    surname = filters.CharFilter(lookup_expr="icontains")
    email = filters.CharFilter(lookup_expr="icontains")
    company_name = filters.CharFilter(
        field_name="profile__name", lookup_expr="icontains"
    )
    status = filters.CharFilter(lookup_expr="icontains")
    registration_date = filters.CharFilter(lookup_expr="icontains")
    ordering = filters.OrderingFilter(
        fields=(
            ("id", "id"),
            ("name", "name"),
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
            "name",
            "surname",
            "email",
            "company_name",
            "status",
            "registration_date",
        ]
