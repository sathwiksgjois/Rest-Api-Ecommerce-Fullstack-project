from django.urls import path
from .views import OrderListCreateView, OrderDetailView, CancelOrderView, InvoiceView

urlpatterns = [
    path('', OrderListCreateView.as_view(), name='order-list'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order-detail'),
    path("<int:pk>/cancel/", CancelOrderView.as_view()),
    path("<int:pk>/invoice/", InvoiceView.as_view()),
]
