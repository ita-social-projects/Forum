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
        # print(search_field)
        search_results = Profile.objects.filter(comp_name__icontains=search_field).order_by('comp_name')          # get all Profile objects wich contains search_field in comp_name
        print(search_results)
        serializer = CompanySerializers(search_results, many=True)                      # generate json data in serializer
        return Response(serializer.data)                                                # return data to React
            

# class SearchCompanyView(APIView):
#     def get(self, request, *args, **kwargs):
#         search_field = request.query_params.get('search_field', '').strip()                     # get data without space
#         # print(search_field)
#         if search_field == '':     
#             # print('Введіть будь ласка назву компанії для пошуку')                             # if we get emppty field
#             return Response({'error': 'Введіть будь ласка назву компанії для пошуку'})          # return empty field error
#         else:                                                                                   # if not
#             search_results = Profile.objects.filter(comp_name__icontains=search_field)          # get all Progile objects wich contains search_field in comp_name
#             print(search_results)
#             if search_results.exists():                                                         # if Query obj is not empty
#                 serializer = CompanySerializers(search_results, many=True)                      # generate json data in serializer
#                 return Response(serializer.data)                                                # return data to React
#             else:                                                                               # if Quert obj is empty
#                 return Response({'error': 'За вашим запитом нічого не знайдено'})               # return empty resault error




# View for static page

def show_companies(request):
    error = ''
    search_field = request.GET.get('search_field')
    search_res = []

    if search_field is not None:
        search_field = str(search_field)
        if type(search_field) is str:
            if search_field == '':
                error = 'Введіть буль ласка назву компанії для пошуку'
            else:
                for item in Profile.objects.all():
                    if search_field.lower() in item.comp_name.lower():
                        search_res.append(
                            {"profile_id": item.profile_id,
                            "comp_name": item.comp_name,
                            "comp_common_info": item.comp_common_info,
                            "comp_product_info": item.comp_product_info}
                        )
                if search_res == []:
                    error = "За вашим запитом нічого не знайдено"

                print(search_res)

    return render(request, 'search_page.html', {'search_res': search_res, 'error': error})
