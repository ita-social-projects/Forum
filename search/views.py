from rest_framework.generics import ListAPIView
import django_filters
from rest_framework import filters

from profiles.models import Profile, SavedCompany
from .serializers import CompanySerializers
from search.filters import CompanyFilter


class SearchCompanyView(ListAPIView):
    queryset = Profile.objects.active_only()
    serializer_class = CompanySerializers
    filter_backends = [
        django_filters.rest_framework.DjangoFilterBackend,
        filters.OrderingFilter,
    ]
    filterset_class = CompanyFilter
    ordering_fields = ["name", "region"]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        if self.request.user.is_authenticated:
            saved_companies_pk = frozenset(
                SavedCompany.objects.filter(
                    user=self.request.user.id
                ).values_list("company_id", flat=True)
            )
            context.update({"saved_companies_pk": saved_companies_pk})
        return context
