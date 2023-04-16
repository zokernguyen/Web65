import React from "react";
import { loginService } from "../../../service/auth.service";

function LoginPage({ setToken }) {
    const onSubmit = async (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        if (!username || !password) {
            return alert("Please enter username and password");
        }
        try {
            const res = await loginService(username, password);
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
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" />
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                <input type="password" id="password" />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginPage;