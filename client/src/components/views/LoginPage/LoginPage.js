import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";

function LoginPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // page refresh 방지

    if (Email === '' || Password === '') {
      return alert('Please input this form');
    }

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((res) => {
      if (res.payload.loginSuccess) {
        window.localStorage.setItem("userId", res.payload.userId);
        props.history.push("/");
      } else {
        alert(res.payload.message);
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 6,
        }}
        wrapperCol={{
          span: 16,
        }}
        onSubmit={onSubmitHandler}
        style={{
          backgroundColor: "#bfd0df",
          position: "absolute",
          width: "400px",
          padding: "30px 20px",
          textAlign: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
          boxShadow: "1px 1px 2px 1px rgba(0,0,0,0.3)",
        }}
      >
        <h2>Login</h2>
        <Form.Item
          label="Email"
          name="email"
          value={Email}
        >
          <Input allowClear onChange={onEmailHandler} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={Password}
        >
          <Input.Password onChange={onPasswordHandler} />
        </Form.Item>
        <Form.Item
          name="Button"
          wrapperCol={{
            offset: 6,
            span: 12,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: "130px" }}>
            Submit
          </Button>
        </Form.Item>
        <div>
          Don't you have ID? <a href="/register">&nbsp;&nbsp;Sign Up</a>
        </div>
      </Form>
    </div>
  );
}

export default withRouter(LoginPage);
