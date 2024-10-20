from django_filters import filters
from django_filters.rest_framework import FilterSet


class UsersFilter(FilterSet):
    """
    Filters
    /?id= ,/?name=, /?surname=, /?email= , /?is_active= , /?is_staff=,
    /?is_superuser=,  /?is_deleted=True or False,  /?company_name=, /?registration_date=,
    Ordering sample
    /?ordering=id asc or /?ordering=-id desc
    """

    id = filters.CharFilter(lookup_expr="icontains")
    surname = filters.CharFilter(lookup_expr="icontains")
    email = filters.CharFilter(lookup_expr="icontains")
    is_active = filters.CharFilter(lookup_expr="icontains")
    is_staff = filters.CharFilter(lookup_expr="icontains")
    is_superuser = filters.CharFilter(lookup_expr="icontains")
    is_deleted = filters.BooleanFilter(method="filter_is_deleted")
    company_name = filters.CharFilter(
        field_name="profile__name", lookup_expr="icontains"
    )
    registration_date = filters.CharFilter(
        field_name="profile__created_at", lookup_expr="icontains"
    )

    def filter_is_deleted(self, queryset, name, value):
        if value:
            queryset = queryset.filter(email__startswith="is_deleted_")
        return queryset

    ordering = filters.OrderingFilter(
        fields=(
            ("id", "id"),
            ("name", "name"),
            ("surname", "surname"),
            ("email", "email"),
            ("is_active", "is_active"),
            ("is_staff", "is_staff"),
            ("is_superuser", "is_superuser"),
            ("is_deleted", "is_deleted"),
            ("profile__name", "company_name"),
            ("profile__created_at", "registration_date"),
        )
    )
