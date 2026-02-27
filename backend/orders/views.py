from rest_framework.generics import ListCreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpResponse
from reportlab.pdfgen import canvas

class OrderListCreateView(ListCreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user).order_by('-created_at')

    def get_serializer_context(self):
        return {'request': self.request}

class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # critical: prevents accessing others' orders
        return Order.objects.filter(user=self.request.user)
    
class CancelOrderView(APIView):
    def post(self, request, pk):
        try:
            order = Order.objects.get(pk=pk, user=request.user)
        except Order.DoesNotExist:
            return Response({"detail": "Order not found"}, status=404)

        if order.status != "PLACED":
            return Response(
                {"detail": "Order cannot be cancelled"},
                status=400
            )

        order.status = "CANCELLED"
        order.save()

        return Response({"detail": "Order cancelled successfully"})
    
class InvoiceView(APIView):
    def get(self, request, pk):
        order = Order.objects.get(pk=pk, user=request.user)

        response = HttpResponse(content_type="application/pdf")
        response["Content-Disposition"] = f'attachment; filename="invoice_{order.id}.pdf"'

        p = canvas.Canvas(response)
        p.drawString(100, 800, f"Invoice for Order #{order.id}")
        p.drawString(100, 770, f"Status: {order.status}")
        p.drawString(100, 740, f"Total: ₹ {order.total_amount}")

        y = 700
        for item in order.items.all():
            p.drawString(
                100,
                y,
                f"{item.product.name} x {item.quantity} = ₹ {item.price * item.quantity}"
            )
            y -= 20

        p.showPage()
        p.save()
        return response
