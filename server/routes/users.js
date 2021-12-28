const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.post("/register", (req, res) => {
  //const user = new User(req.body);

  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.status(500).json({
        loginSuccess: false,
        message: "This Email already exists.",
      });
    }
    user.save((err, userInfo) => {
      console.log('user info: ', userInfo)
      if (err) return res.json({ success: false, err });
      return res.status(200).json({
        success: true,
      });
    }); 
  })
});

router.post("/login", (req, res) => {
  //요청된 이메일을 DB에서 존재하는지 확인
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "The user does not exist in this Email address.",
      });
    }
    //요청된 이메일이 DB에 존재한다면 비밀번호 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "Password is wrong.",
        });

      //비밀번호 확인 후 토큰 생성
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // token을 저장한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

router.get("/auth", auth, (req, res) => {
  //여기 까지 미들웨어를 통과해 왔다는 얘기는 Authentication 이 True 라는 말
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

router.get("/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});


module.exports = router;
