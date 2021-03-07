from celery.decorators import task
from django.core.mail import EmailMessage 

@task(name='send_email')
def send_emali(data):
    email = EmailMessage(subject=data['email_subject'], body=data['email_body'], to=[data['to_email']])
    print(email)
    email.send()




