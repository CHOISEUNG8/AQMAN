#!/usr/bin/env python
import os
import sys
import django

# Django 설정
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.core.management import execute_from_command_line

User = get_user_model()

def create_admin_user():
    """관리자 계정을 생성합니다."""
    username = 'zwadmin'
    password = '0045'
    email = 'admin@zenithworld.shop'
    name = 'ZenithWorld 관리자'
    
    try:
        # 기존 사용자가 있는지 확인
        if User.objects.filter(username=username).exists():
            print(f"사용자 '{username}'가 이미 존재합니다.")
            user = User.objects.get(username=username)
            user.set_password(password)
            user.is_staff = True
            user.is_superuser = True
            user.save()
            print(f"기존 사용자 '{username}'의 비밀번호를 업데이트하고 관리자 권한을 부여했습니다.")
        else:
            # 새 관리자 사용자 생성
            user = User.objects.create_user(
                username=username,
                email=email,
                password=password,
                name=name,
                is_staff=True,
                is_superuser=True
            )
            print(f"새 관리자 사용자 '{username}'를 생성했습니다.")
        
        print(f"관리자 계정 정보:")
        print(f"  사용자명: {username}")
        print(f"  비밀번호: {password}")
        print(f"  이메일: {email}")
        print(f"  이름: {name}")
        print(f"  관리자 권한: {user.is_superuser}")
        print(f"  스태프 권한: {user.is_staff}")
        
    except Exception as e:
        print(f"관리자 계정 생성 중 오류가 발생했습니다: {e}")

if __name__ == '__main__':
    create_admin_user() 