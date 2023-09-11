from rest_framework.generics import ListAPIView

from profiles.models import Profile
from .serializers import CompanySerializers

class SearchCompanyView(ListAPIView):
    serializer_class = CompanySerializers

    def get_queryset(self):
        search_field = self.request.query_params.get('search_field', '').strip()                                    # get data without space
        return Profile.objects.filter(comp_name__icontains=search_field).order_by('comp_name')                      # get all Profile objects wich contains search_field in comp_name
