# cubevalley-backend

## 시작하기
```shell
# 의존성(dependency) 설치
yarn
```

```shell
# 개발모드로 시작하기
yarn start:dev

# 백엔드 빌드 & 프로덕션 모드로 시작하기
yarn build
yarn start:prod
```

## 브랜치 전략
- `master` 개발 중인 브랜치입니다.
- `test` 테스트 서버에 배포를 하기 위한 브랜치입니다.
- `production` 프로덕션 서버에 배포를 하기 위한 브랜치입니다.

## 환경변수

```shell
cp .env.example .env
```

```dotenv
# 서버 타임존 강제설정
TZ=Asia/Seoul
# 회원가입 이메일, 문자인증 비활성화 여부 (true 설정 시 인증을 하지 않습니다.)
DISABLE_VERIFY_IDENTITY=

# 데이터베이스 주소
DATABASE_HOST=
# 데이터베이스 포트
DATABASE_PORT=
# 데이터베이스 계정 이름
DATABASE_USERNAME=
# 데이터베이스 계정 비밀번호
DATABASE_PASSWORD=
# 데이터베이스 이름
DATABASE_DBNAME=

# CORS 적용을 위한 프론트엔드 주소. 자바스크립트의 배열 형태를 따릅니다.
CORS_HOST=[]

# NCP SENS (문자 인증) 관련 정보
NCP_ACCESS_KEY=
NCP_SECRET_KEY=
NCP_SENS_SERVICE_ID=
NCP_SENS_SECRET_KEY=
NCP_SENS_CALLING_NUMBER=

# AWS 관련 정보 및 AWS SES 이메일
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
# 서울 리전, 다른 리전 사용 시 변경하면 됩니다.
AWS_REGION=ap-northeast-2
# 이메일 알림 시 사용할 이메일 주소입니다.
AWS_SES_SENDER=
# 큐비즈 서류 정보를 담는 S3 버킷 이름입니다.
AWS_CUBEEZ_BUCKET=
# 기타 이미지 또는 파일을 담는 S3 버킷 이름입니다.
AWS_IMAGE_BUCKET=
# 이미지 링크를 생성하기 위한 Cloudfront 배포 주소입니다. (trailing slash 포함)
# 예) https://foobar.cloudfront.net/
AWS_IMAGE_CLOUDFRONT=

# 비밀번호 암호화 Salt Round (권장: 12)
# 값이 높을 수록 보안은 올라가나 암호화 시간이 급격하게 늘어납니다.
PASSWORD_SALT_ROUND=12
# 개인정보(주민등록번호 뒷자리, 여권번호) 암호화 및 복호화할 때 사용하는 키입니다.
PRIVACY_KEY=

# 소셜로그인 시 프론트엔드 리다이렉트를 위한 주소입니다. 각각 신규 가입, 기존 로그인입니다.
REDIRECT_DOMAIN_NEW=
REDIRECT_DOMAIN_OLD=

# AccessToken 키
JWT_SECRET_KEY=
# RefreshToken 키
JWT_REFRESH_SECRET_KEY=
# AccessToken 만료 시간
JWT_EXPIRE_TIME=2h
# RefreshToken 만료 시간
JWT_REFRESH_EXPIRE_TIME=7d

# 소셜로그인을 위한 정보
NAVER_CLIENT_ID=
NAVER_SECRET=
KAKAO_CLIENT_ID=
KAKAO_SECRET=
FACEBOOK_CLIENT_ID=
FACEBOOK_SECRET=
APPLE_TEAM_ID=
APPLE_CLIENT_ID=
APPLE_KEY_ID=
APPLE_PRIVATE_KEY=

# 항공편 API KEY (Decoding 문자열을 전달해야 합니다.)
FLIGHT_API_KEY=
# 토스페이먼츠 시크릿 키
TOSS_PAYMENTS_API_KEY=

# 마스터 관리자 이메일
MASTER_ADMIN_EMAIL=
```

## 데이터베이스 초기 설정

- 최초 구축 후 아래 멍령어를 수동으로 실행해야 합니다.
- 통해 백엔드 모델에 따라서 데이터베이스 테이블을 생성합니다.
- **sync 사용 시 경우에 따라 데이터가 사라질 수 있습니다. 프로덕션 환경에서는 백업을 먼저 진행해주세요.**

```shell
yarn sync
```

## 커밋 컨벤션

- 커밋 메세지는 [컨벤션](https://www.conventionalcommits.org/ko/v1.0.0/#%EA%B0%9C%EC%9A%94)을 따르고 있습니다. 커밋메시지 접두사를 통해 어떤 내용인지 추측할 수 있습니다.
- 예를 들어 `feat` 은 기능추가, `fix` 는 코드 및 버그 수정을 뜻합니다.
