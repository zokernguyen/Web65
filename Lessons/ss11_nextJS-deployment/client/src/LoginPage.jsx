import React from "react";
import { loginService } from "./service/auth.service";

function LoginPage({ setToken }) {
  const onSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    if (!email || !password) {
      return alert("Please enter email and password");
    }
    try {
      const res = await loginService(email, password);
      localStorage.setItem("token", res.token);
      setToken(res.token);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: 400,
        margin: "0 auto",
      }}
    >
      <div>
        <label>email</label>
        <input type="text" name="email" />
      </div>
      <div>
        <label>password</label>
        <input type="text" name="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginPage;
