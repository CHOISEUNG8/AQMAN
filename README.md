# ZenithWorld 관리 시스템

Django 백엔드와 Next.js 프론트엔드로 구성된 쇼핑몰 관리 시스템입니다.

## 🚀 기능

- **관리자 인증**: JWT 토큰 기반 인증 시스템
- **MySQL 데이터베이스**: 안정적인 데이터 저장
- **관리자 대시보드**: 실시간 통계 및 관리 기능
- **API 연동**: RESTful API를 통한 프론트엔드-백엔드 통신
- **토큰 관리**: 자동 토큰 갱신 및 보안 관리

## 📋 요구사항

- Python 3.8+
- Node.js 18+
- MySQL 8.0+
- npm 또는 yarn

## 🛠️ 설치 및 설정

### 1. 백엔드 설정 (Django)

```bash
# 백엔드 디렉토리로 이동
cd backend

# 가상환경 생성 (선택사항)
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt

# 데이터베이스 마이그레이션
python manage.py makemigrations
python manage.py migrate

# 관리자 계정 생성
python create_admin.py

# 개발 서버 실행
python manage.py runserver 8000
```

### 2. 프론트엔드 설정 (Next.js)

```bash
# 프로젝트 루트로 이동
cd ..

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 🔐 관리자 계정

기본 관리자 계정이 자동으로 생성됩니다:

- **사용자명**: `zwadmin`
- **비밀번호**: `0045`
- **권한**: 최고관리자 (모든 기능 접근 가능)

## 🌐 접속 방법

### 관리자 로그인
- URL: `http://localhost:3000/admin/login`
- 계정: `zwadmin` / `0045`

### 관리자 대시보드
- URL: `http://localhost:3000/admin`
- 로그인 후 자동 리다이렉트

### API 테스트
- URL: `http://localhost:3000/admin/test`
- API 연동 상태 확인 가능

## 📁 프로젝트 구조

```
├── backend/                 # Django 백엔드
│   ├── accounts/           # 사용자 관리 앱
│   ├── products/           # 상품 관리 앱
│   ├── backend/            # Django 설정
│   ├── manage.py           # Django 관리 스크립트
│   └── create_admin.py     # 관리자 계정 생성 스크립트
├── app/                    # Next.js 프론트엔드
│   ├── admin/              # 관리자 페이지
│   ├── api/                # API 라우트
│   └── contexts/           # React 컨텍스트
├── lib/                    # 유틸리티 함수
├── hooks/                  # React 훅
└── components/             # UI 컴포넌트
```

## 🔧 주요 설정

### 환경 변수

프론트엔드에서 사용할 환경 변수를 설정하세요:

```bash
# .env.local 파일 생성
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### 데이터베이스 설정

`backend/backend/settings.py`에서 MySQL 설정을 확인하세요:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'zenithDB',
        'USER': 'root',
        'PASSWORD': 'your_password',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
```

## 🔌 API 엔드포인트

### 인증 관련
- `POST /api/login/` - 로그인
- `GET /api/user-info/` - 사용자 정보 조회
- `POST /api/token/refresh/` - 토큰 갱신

### 관리자 관련
- `GET /api/admin/dashboard/` - 대시보드 데이터
- `GET /api/admin/users/` - 사용자 목록
- `GET /api/admin/stats/` - 통계 데이터

## 🛡️ 보안

- JWT 토큰 기반 인증
- CORS 설정으로 허용된 도메인만 접근 가능
- 관리자 권한 검증
- 토큰 자동 갱신

## 🐛 문제 해결

### 로그인 실패 시
1. Django 서버가 실행 중인지 확인
2. MySQL 데이터베이스 연결 확인
3. 관리자 계정이 생성되었는지 확인

### API 요청 실패 시
1. CORS 설정 확인
2. 토큰이 유효한지 확인
3. 네트워크 연결 상태 확인

## 📝 개발 가이드

### 새로운 API 추가
1. `backend/accounts/views.py`에 뷰 함수 추가
2. `backend/accounts/api_urls.py`에 URL 패턴 추가
3. 프론트엔드에서 `lib/api.ts`에 함수 추가

### 새로운 관리자 기능 추가
1. `app/admin/page.tsx`에 컴포넌트 추가
2. 권한 매트릭스 업데이트
3. 사이드바 메뉴 추가

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여

버그 리포트나 기능 제안은 이슈를 통해 제출해 주세요.

---

**ZenithWorld 관리 시스템** - 안전하고 효율적인 쇼핑몰 관리 솔루션 