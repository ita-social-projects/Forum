from django_filters import filters
from django_filters.rest_framework import FilterSet


class UsersFilter(FilterSet):
    """
    Filters
    /?id= , /?surname=, /?email= , /?is_active= , /?is_staff=,
    /?is_superuser=,  /?is_deleted=True or False,  /?company_name=, /?registration_date=,
    Ordering sample
    /?ordering=id asc or /?ordering=-id desc
    """

    id = filters.CharFilter(method="filter_partial_id")
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

    def filter_partial_id(self, queryset, name, value):
        return queryset.filter(id__icontains=value)

    ordering = filters.OrderingFilter(
        fields=(
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


class CategoriesFilter(FilterSet):
    id = filters.CharFilter(method="filter_partial_id")
    name = filters.CharFilter(lookup_expr="icontains")

    def filter_partial_id(self, queryset, name, value):
        return queryset.filter(id__icontains=value)

    ordering = filters.OrderingFilter(
        fields=(
            ("id", "id"),
            ("name", "name"),
        )
    )
