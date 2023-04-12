import React from "react";
import Link from "next/link";
import style from "@/styles/Login.module.css"

const login = () => {

    return (
        <div className={style.loginFrom}>
            <h1>Login</h1>
            <Link href="/register">Link to register page</Link>
        </div>
    );
}

export default login;