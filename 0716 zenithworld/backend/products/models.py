from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator, MaxValueValidator
from decimal import Decimal

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=100, verbose_name='카테고리명')
    description = models.TextField(blank=True, verbose_name='설명')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '카테고리'
        verbose_name_plural = '카테고리들'
        ordering = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
    STATUS_CHOICES = [
        ('active', '활성'),
        ('inactive', '비활성'),
        ('out_of_stock', '품절'),
    ]

    name = models.CharField(max_length=200, verbose_name='상품명')
    description = models.TextField(verbose_name='상품 설명')
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name='가격',
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    sale_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name='할인가격',
        null=True, 
        blank=True,
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    stock = models.PositiveIntegerField(default=0, verbose_name='재고')
    category = models.ForeignKey(
        Category, 
        on_delete=models.CASCADE, 
        related_name='products',
        verbose_name='카테고리'
    )
    image = models.ImageField(upload_to='products/', blank=True, null=True, verbose_name='상품 이미지')
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='active',
        verbose_name='상태'
    )
    is_featured = models.BooleanField(default=False, verbose_name='추천 상품')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '상품'
        verbose_name_plural = '상품들'
        ordering = ['-created_at']

    def __str__(self):
        return self.name

    @property
    def current_price(self):
        return self.sale_price if self.sale_price else self.price

    @property
    def discount_percentage(self):
        if self.sale_price and self.price > self.sale_price:
            return int(((self.price - self.sale_price) / self.price) * 100)
        return 0

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', '대기중'),
        ('processing', '처리중'),
        ('shipped', '배송중'),
        ('delivered', '배송완료'),
        ('cancelled', '취소됨'),
        ('refunded', '환불됨'),
    ]

    PAYMENT_STATUS_CHOICES = [
        ('pending', '결제대기'),
        ('paid', '결제완료'),
        ('failed', '결제실패'),
        ('refunded', '환불완료'),
    ]

    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='orders',
        verbose_name='주문자'
    )
    order_number = models.CharField(max_length=20, unique=True, verbose_name='주문번호')
    status = models.CharField(
        max_length=20, 
        choices=STATUS_CHOICES, 
        default='pending',
        verbose_name='주문상태'
    )
    payment_status = models.CharField(
        max_length=20, 
        choices=PAYMENT_STATUS_CHOICES, 
        default='pending',
        verbose_name='결제상태'
    )
    total_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name='총 금액'
    )
    shipping_address = models.TextField(verbose_name='배송주소')
    shipping_phone = models.CharField(max_length=20, verbose_name='배송연락처')
    shipping_name = models.CharField(max_length=100, verbose_name='수령인')
    notes = models.TextField(blank=True, verbose_name='주문메모')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '주문'
        verbose_name_plural = '주문들'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.order_number} - {self.user.username}"

    def save(self, *args, **kwargs):
        if not self.order_number:
            # 주문번호 자동 생성 (YYYYMMDD-XXXX 형식)
            from django.utils import timezone
            today = timezone.now().strftime('%Y%m%d')
            last_order = Order.objects.filter(
                order_number__startswith=today
            ).order_by('-order_number').first()
            
            if last_order:
                last_number = int(last_order.order_number.split('-')[1])
                new_number = last_number + 1
            else:
                new_number = 1
            
            self.order_number = f"{today}-{new_number:04d}"
        
        super().save(*args, **kwargs)

class OrderItem(models.Model):
    order = models.ForeignKey(
        Order, 
        on_delete=models.CASCADE, 
        related_name='items',
        verbose_name='주문'
    )
    product = models.ForeignKey(
        Product, 
        on_delete=models.CASCADE, 
        verbose_name='상품'
    )
    quantity = models.PositiveIntegerField(verbose_name='수량')
    price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name='단가'
    )
    total_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name='총 가격'
    )

    class Meta:
        verbose_name = '주문상품'
        verbose_name_plural = '주문상품들'

    def __str__(self):
        return f"{self.order.order_number} - {self.product.name}"

    def save(self, *args, **kwargs):
        if not self.total_price:
            self.total_price = self.price * self.quantity
        super().save(*args, **kwargs)

class TimeSale(models.Model):
    product = models.OneToOneField(
        Product, 
        on_delete=models.CASCADE, 
        related_name='time_sale',
        verbose_name='상품'
    )
    start_time = models.DateTimeField(verbose_name='시작시간')
    end_time = models.DateTimeField(verbose_name='종료시간')
    sale_price = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        verbose_name='할인가격',
        validators=[MinValueValidator(Decimal('0.01'))]
    )
    is_active = models.BooleanField(default=True, verbose_name='활성화')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = '타임세일'
        verbose_name_plural = '타임세일들'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.product.name} - 타임세일"

    @property
    def is_currently_active(self):
        from django.utils import timezone
        now = timezone.now()
        return self.is_active and self.start_time <= now <= self.end_time
