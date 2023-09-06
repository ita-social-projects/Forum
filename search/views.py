from django.shortcuts import render
from profiles.models import Profile
from authentication.models import CustomUser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import CompanySerializers


class SearchCompanyView(APIView):
    def get(self, request, *args, **kwargs):
        search_field = request.query_params.get('search_field', '').strip()                     # get data without space
        search_results = Profile.objects.filter(comp_name__icontains=search_field).order_by('comp_name')          # get all Profile objects wich contains search_field in comp_name
        serializer = CompanySerializers(search_results, many=True)                      # generate json data in serializer
        return Response(serializer.data)                                                # return data to React
