from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_admin_accounts(apps, schema_editor):
    User = apps.get_model('accounts', 'User')
    accounts = [
        {"adminId": "zwadmin", "username": "Administrator", "password": "0045", "name": "최고관리자", "role": "Admin", "is_staff": True, "is_superuser": True},
        {"adminId": "product", "username": "product_manager", "password": "0045", "name": "상품관리자", "role": "Product", "is_staff": True, "is_superuser": False},
        {"adminId": "order", "username": "order_manager", "password": "0045", "name": "주문관리자", "role": "Order", "is_staff": True, "is_superuser": False},
        {"adminId": "member", "username": "member_manager", "password": "0045", "name": "회원관리자", "role": "Member", "is_staff": True, "is_superuser": False},
        {"adminId": "marketing", "username": "marketing_team", "password": "0045", "name": "마케팅관리자", "role": "Marketing", "is_staff": True, "is_superuser": False},
        {"adminId": "support", "username": "cs_support", "password": "0045", "name": "고객센터담당자", "role": "Support", "is_staff": True, "is_superuser": False},
    ]
    for acc in accounts:
        if not User.objects.filter(username=acc["username"]).exists():
            user = User(
                username=acc["username"],
                password=make_password(acc["password"]),
                name=acc["name"],
                is_staff=acc["is_staff"],
                is_superuser=acc["is_superuser"],
            )
            if hasattr(user, 'role'):
                user.role = acc["role"]
            if hasattr(user, 'adminId'):
                user.adminId = acc["adminId"]
            user.save()
        # 일반 회원도 생성 (username_user)
        member_username = f"{acc['username']}_user"
        if not User.objects.filter(username=member_username).exists():
            member = User(
                username=member_username,
                password=make_password(acc["password"]),
                name=acc["name"] + " (일반회원)",
                is_staff=False,
                is_superuser=False,
            )
            if hasattr(member, 'role'):
                member.role = "Member"
            if hasattr(member, 'adminId'):
                member.adminId = acc["adminId"]
            member.save()

def reverse_func(apps, schema_editor):
    User = apps.get_model('accounts', 'User')
    usernames = ["zwadmin", "product", "order", "member", "marketing"]
    for username in usernames:
        User.objects.filter(username=username).delete()
        User.objects.filter(username=f"{username}_user").delete()

class Migration(migrations.Migration):
    dependencies = [
        ('accounts', '0001_initial'),
    ]
    operations = [
        migrations.RunPython(create_admin_accounts, reverse_func),
    ] 