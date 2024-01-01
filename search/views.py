from rest_framework.generics import ListAPIView
import django_filters
from rest_framework import filters

from profiles.models import Profile
from .serializers import CompanySerializers
from search.filters import CompanyFilter
from profiles.serializers import ProfileListSerializer


class SearchCompanyView(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = CompanySerializers
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
        filters.OrderingFilter,
    ]
    filterset_class = CompanyFilter
    ordering_fields = ["name", "region"]

#
# class NewMembersList(ListAPIView):
#     serializer_class = ProfileListSerializer
#
#     def get_queryset(self):
#         q1 = (
#             Profile.objects.all()
#             .exclude(banner_image__isnull=True)
#             .exclude(logo_image__isnull=True)
#             .exclude(region__isnull=True)
#             .exclude(activities__exact=None)
#             .exclude(categories__exact=None)
#             .exclude(banner_image__exact="")
#             .exclude(logo_image__exact="")
#             .exclude(region__exact=None)
#         ).order_by("-create_at")[0:6]
#         q2 = (
#             Profile.objects.all()
#             .exclude(banner_image__isnull=True)
#             .exclude(banner_image__exact="")
#         ).order_by("-create_at")[0:6]
#         q3 = Profile.objects.all().order_by("-create_at")[0:6]
#
#         querysets = [q1, q2, q3]
#
#         for queryset in querysets:
#             # print(queryset, len(queryset), queryset.count(), '*'*100)
#             # print(type(len(queryset)), type(queryset.count()), '@'*100)
#             if queryset.count() > 5:
#                 return queryset
#         return q3
