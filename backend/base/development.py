from .base import *
from celery.schedules import crontab
import os 
from datetime import timedelta
import django_heroku

SECRET_KEY= os.environ.get('SECRET_KEY') 

# if production change to False
DEBUG = False 


POSTGRES_HOST=os.environ.get('POSTGRES_HOST')
PORT=os.environ.get('PORT')
POSTGRES_DB=os.environ.get('POSTGRES_DB')
POSTGRES_USER= os.environ.get('POSTGRES_USER')
POSTGRES_PASSWORD= os.environ.get('POSTGRES_PASSWORD')
 
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": POSTGRES_DB,
        "USER": POSTGRES_USER,
        "PASSWORD": POSTGRES_PASSWORD,
        "HOST": POSTGRES_HOST,
        "PORT": PORT
    }
}

RABBITMQ_DEFAULT_USER= os.environ.get('RABBITMQ_DEFAULT_USER')
RABBITMQ_DEFAULT_PASS= os.environ.get('RABBITMQ_DEFAULT_PASS')

 
# if production change!
ALLOWED_HOSTS = ['*'] 
BASE_URL = 'http://0.0.0.0:8000'

CELERY_BROKER_URL=os.environ.get('CELERY_BROKER_URL')
CELERY_RESULT_BACKEND='django-db'

CELERY_BROKER_URL = CELERY_BROKER_URL
CELERY_RESULT_BACKEND =CELERY_RESULT_BACKEND 
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TAST_SERIALIZER = 'json'
CELERY_ENABLE_UTC = True

# execute task at 0:00 
CELERY_BEAT_SCHEDULE = {
    'scheduled_task': {
        'task': 'Covid.tasks.updateDatabase',
        'schedule': crontab(hour=0, minute=0),
    },
}


EMAIL_HOST_USER=os.environ.get('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD=os.environ.get('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS=True
EMAIL_HOST='smtp.gmail.com'
EMAIL_PORT=587

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': SECRET_KEY,
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,

    'AUTH_HEADER_TYPES': ('Bearer'),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}



# only if production

INSTALLED_APPS += [
    "whitenoise.runserver_nostatic",
]
MIDDLEWARE += ['whitenoise.middleware.WhiteNoiseMiddleware',]
STATICFILES_STORAGE = 'whitenoise.storage.CompressedStaticFilesStorage'

