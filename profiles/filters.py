from django_filters import filters
from django_filters.rest_framework import FilterSet


class ProfileFilter(FilterSet):
    is_saved = filters.BooleanFilter(method="is_saved_filter")
    is_registered = filters.BooleanFilter()
    is_startup = filters.BooleanFilter()
    activities__name = filters.CharFilter()
    # created_at = filters.BooleanFilter(method="get_latest_profiles")
    # completeness = filters.BooleanFilter(method="get_complete_profiles")


    def is_saved_filter(self, queryset, name, value):
        if value:
            if self.request.user.is_authenticated:
                queryset = queryset.filter(saved_list__user=self.request.user)
            else:
                queryset = queryset.none()
        return queryset

    # def get_latest_profiles(self, queryset, name, value):
    #     if value:
    #         return queryset.filter(created_at__isnull=False)
    #     else:
    #         return queryset.none()

    # def get_complete_profiles(self, queryset, name, value):
    #     if value:
    #         queryset1 = queryset.filter(completeness__isnull=False)
    #         if queryset1.count() > 5:
    #             return queryset1
    #         else:
    #
    #             # queryset2 = queryset.filter(completeness__isnull=True)
    #             # return queryset1.union(queryset2).order_by('completeness')
    #         #return queryset.filter(completeness__isnull=False)
    #     else:
    #         return queryset.none()
