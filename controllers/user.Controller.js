const userService = require("../services/user.Service");

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");
const regexDate = new RegExp(
  /(^(19|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
); // YYYYMMDD 확인 정규표현식

exports.loadUsers = async function (req, res) {
  const result = await userService.loadUser();
  return res.status(200).json(result);
};

const passport = require("passport");

exports.login = async function (req, res) {
  // 패스포트를 활용한 로그인 컨트롤러(서비스는 패스포트 내에 존재함)

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      // passport index.js 실행

      if (loginErr) {
        return next(loginErr);
      }

      return res.json(user);
    });
  })(req, res, nest);
};

exports.signup = async function (req, res) {
  // POST /user/
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("이미 사용 중인 아이디입니다.");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send("ok");
  } catch (error) {
    console.error(error);
    next(error); // status 500
  }
};
