from django.conf import settings
from django.conf.urls.static import static

from django.urls import path, include

from . import views

app_name = 'Client'

urlpatterns = [
        path('parent', views.parent, name='parent_dashboard'),
        path('', views.landingPage, name='landing_page'),
        path('child/<int:id>', views.child, name='child_dashboard'),
        path('booking/<int:id>', views.booking, name='booking'),
        path('delete/<int:id>', views.deleteChildAccount,name='deleteChildAccount'),
        ]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

