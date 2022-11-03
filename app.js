const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const comression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");
const session = require("express-session");
const { sequelize } = require("./repository/index.repository");
const postRouter = require("./routers/post.router");
const userRouter = require("./routers/user.router");
const cookieParser = require("cookie-parser");
const passport = require("passport");
//const passportConfig = require("./passport");

dotenv.config();

const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = require("./swagger/swagger");
const { compareSync } = require("bcrypt");

//클라이언트에서 보내준 데이터를 json으로 파싱해서 req.body에 전송
데이터를;
app.use(express.json());
//로그인, 회원가입 등 form태그에서 submit하여 전달할 때 form 파싱
app.use(express.urlencoded({ extended: true }));
// app.use(compression());
app.use(helmet());
app.use(
  cors()
  // {
  // origin:'*',
  // credentials:true,
  // }
); //허용 도메인 설정
app.use(cookieParser(process.env.COOKIE_SECRET)); //cookieparser에 비밀키 설정
app.use(morgan("dev")); //개발모드로 로깅
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true, //자바스크립트 진입을 불가하기 위하여 true설정
    },
  })
);

app.use(passport.initialize()); //passport 초기화
app.use(passport.session()); //페이지 내에서 영구 로그인 설정 (변경 요)

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결됨.");
  })
  .catch((err) => {
    console.error(err);
  });
//mysql와 sequelize 동기화

const {
  SERVER_HOST,
  SERVER_PORT,
  DB_USER,
  DB_PASS,
  DB_HOST,
  DB_NAME,
  DB_PORT,
} = process.env;

//router
app.use("/post", postRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("백엔드 서버 실행중");
}); //실행확인용

//404 처리
app.use((req, res, next) => {
  console.log("404 Error");
  res.status(404).send("Not Found");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message);
});

app.listen(SERVER_PORT, () => {
  console.log(`서버실행중 : http://${SERVER_HOST}:${SERVER_PORT}`);
});
