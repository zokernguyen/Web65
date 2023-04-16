import React from 'react';
import { registerService } from '../../../service/auth.service';

const RegisterPage = () => {

    const handleSubmit = async (e) => {

        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        if (!username || !password) {
            return alert("Please enter username and password");
        }
        try {
            const response = await registerService(username, password);
        } catch (error) {
            alert(error.message);
        }
    }



    return (
        <form
            onSubmit={handleSubmit}
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
            <button type="submit">Register</button>
        </form>
    );
}

export default RegisterPage;