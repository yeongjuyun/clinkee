import is from "@sindresorhus/is";
import { setUserToken } from "../utils";
import { BadRequestError } from "../errors";

const authController = {
  login: (req, res) => {
    if (is.emptyObject(req.body)) {
      throw new BadRequestError(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    res.okWithSetToken(200, {
      message: "로그인 성공",
      passwordReset: req.user.passwordReset,
    });
  },

  googleOauth: (req, res) => {
    res.okWithSetToken(201, req.user);
  },
};

export { authController };
