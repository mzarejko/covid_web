FROM python:3.8


ENV PYTHONUNBUFFERED 1
ENV PYTHONDONOTWRITEBYTECODE 1


WORKDIR /app/backend



COPY requirements.txt .
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN apt-get update && apt-get install net-tools 
RUN apt-get install -y netcat

# wait tool for scheduling containers
COPY wait-for.sh wait-for.sh
RUN chmod +x wait-for.sh


COPY . /app/backend/

ENV DJANGO_SETTINGS_MODULE=base.development 
ENV SECRET_KEY=adh#*&^JT^#hfn.sd>lrv?<iiSW<#j@W)L:fffg:D@!!!Llfjfu#+>e+ek$Qker2;.chbfhy43## 
ENV RABBITMQ_DEFAULT_USER=staszek 
ENV RABBITMQ_DEFAULT_PASS=jebacEMC
ENV CELERY_BROKER_URL=pyamqp://staszek:jebacEMC@rabbitmq:5672// 
ENV CELERY_RESULT_BACKEND=django-db 
ENV EMAIL_HOST_USER=divmaildiv@gmail.com 
ENV EMAIL_HOST_PASSWORD=Synes99tezja! 
ENV EMAIL_USE_TLS=True 
ENV EMAIL_HOST=smtp.gmail.com 
ENV EMAIL_PORT=587 
ENV POSTGRES_HOST=db 
ENV PORT=5432 
ENV POSTGRES_DB=covidbase 
ENV POSTGRES_USER=kupadupa 
ENV POSTGRES_PASSWORD=jebacEMC 


RUN useradd user
USER user


EXPOSE 8000

CMD gunicorn config.wsgi:application
