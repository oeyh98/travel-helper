const userService = require("../services/userService");

const baseResponse = require("../utilities/baseResponseStatus");
const { errResponse, response } = require("../utilities/response");
const regexDate = new RegExp(
  /(^(19|20)\d{2})(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/
); // YYYYMMDD 확인 정규표현식

exports.loadPosts = async function (req, res) {
  const lastId = req.query.lastId;
  const result = await postService.loadPosts(lastId);
  return res.status(200).json(result);
};
