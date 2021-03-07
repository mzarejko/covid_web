from .DataCreator import DataCreator
from .models import Covid_file
from . import Data_settings
from celery  import shared_task

@shared_task
def updateDatabase():
    Covid_file.objects.all().delete()
    confirmed = DataCreator(Data_settings.COVID_GLOBAL_CONFIRMED)
    deaths = DataCreator(Data_settings.COVID_GLOBAL_DEATH)

    confirmed_x, confirmed_y = confirmed.get_data(Data_settings.COUNTRY)
    deaths_x, deaths_y = deaths.get_data(Data_settings.COUNTRY)

    total_confirmed = confirmed.count_total(Data_settings.COUNTRY)
    total_death = deaths.count_total(Data_settings.COUNTRY)

    points = Covid_file.objects.create(country=Data_settings.COUNTRY, confirmed_x=confirmed_x, confirmed_y=confirmed_y, confirmed_total=total_confirmed,
                                                                        deaths_x=deaths_x, deaths_y=deaths_y, deaths_total=total_death)
    points.save()



