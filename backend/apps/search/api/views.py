from rest_framework.generics import ListAPIView
import django_filters
from rest_framework import filters

from apps.profiles.models import Profile
from backend.apps.search.api.serializers import CompanySerializers
from apps.search.api.filters import CompanyFilter


class SearchCompanyView(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = CompanySerializers
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
        filters.OrderingFilter,
    ]
    filterset_class = CompanyFilter
    ordering_fields = ["name", "region"]
