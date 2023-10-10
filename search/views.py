from rest_framework.generics import ListAPIView
import django_filters

from profiles.models import Profile
from .serializers import CompanySerializers
from search.filters import CompanyFilter


class SearchCompanyView(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = CompanySerializers
    filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
    # filterset_class = CompanyFilter

    def get_queryset(self):
        search_field = self.request.query_params.get(
            "search_field", ""
        ).strip()
        return Profile.objects.filter(name__icontains=search_field).order_by(
            "name"
        )
