import { useDispatch } from "react-redux";
import { registerUser } from "../../../_actions/user_action";
import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Form, Input, Button } from "antd";

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault(); // page refresh 방지
    if (Email === "" || Name === "") {
      return alert("Please Input this form.");
    }

    if (Password !== ConfirmPassword) {
      return alert("Password and Confirm password must be the same.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((res) => {
      if (res.payload.success) {
        props.history.push("/login");
      } else {
        console.log(res);
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
        autoComplete="off"
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
        <h2>Sign Up</h2>
        <Form.Item
          label="Email"
          name="email"
          value={Email}
        >
          <Input onChange={onEmailHandler} />
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          value={Name}
        >
          <Input onChange={onNameHandler} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          value={Password}
        >
          <Input.Password onChange={onPasswordHandler} />
        </Form.Item>

        <Form.Item
          label="Confirm PW"
          name="confirmPassword"
          value={ConfirmPassword}
        >
          <Input.Password onChange={onConfirmPasswordHandler} />
        </Form.Item>

        <Form.Item
          name="Button"
          wrapperCol={{
            offset: 6,
            span: 12,
          }}
        >
          <Button type="primary" htmlType="submit" style={{ width: "130px" }}>
            Sign Up
          </Button>
        </Form.Item>
        <div>
          Do you already have ID? <a href="/login">&nbsp;&nbsp;Login</a>
        </div>
      </Form>
    </div>
  );
}

export default withRouter(RegisterPage);
