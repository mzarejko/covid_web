import os 
from celery import Celery
from . import development


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'base.development')

app = Celery('base')
app.config_from_object(development, namespace='CELERY')
app.autodiscover_tasks()



