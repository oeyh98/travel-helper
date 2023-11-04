# server

### 기술 스택
```
express
javascript
```
### 폴더 구조
```
📂git/travle-helper/server
  ┣📂 src
    ┣📂 config # 환경 설정, db 옵션
    ┣📂 controllers # req->검사->service && service->검사->res, Controller Layer
    ┣📂 middlewares # 미들웨어
    ┣📂 models # DB와 직접적으로 만나는 디렉토리, DataManager Layer
    ┣📂 routers # 메서드 종류와 요청에 따른 분기를 다루는 곳
    ┣📂 services # Controller에서 비즈니스 로직을 분리한 곳, Service Layer
    ┣📂 utilities # response 관련 status와 함수를 모아둔 곳
    ┣📃 app.js
  ┣📂 swagger
  ┣📂 .env
  ┣📂 package.json
  ┣📂 package-lock.json
```

### API 파일

```
📃 app.js - 익스프레스가 띄운 서버로 접속
📃 routers/index.js - 도메인별 라우터로 분기
📃 routers/*.router.js - 해당하는 도메인로 라우팅
📃 controllers/*.controller.js - 유효성 검사, 인증처리 등, Controller Layer
📃 services/*.service.js - DB로 데이터 전달 혹은 DB에서 뽑아온 데이터 정제, Service Layer
📃 respository/*.repository.js - DB 접근 쿼리들의 집합, DataManager Layer
📃 DataBase
```

### 실행 방법

```
npm run start
npm run dev (nodemon : 개발시)
```

### default page

```
http://localhost:8080
```
