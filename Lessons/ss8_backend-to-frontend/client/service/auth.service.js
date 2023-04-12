export const loginService = async (username, password) => {

    try {
        const reqOptions = {
            method: "POST",
            headers: {
                "Content-type": "Application/json",
            },
            body: JSON.stringify({
                username,
                password
            }),
        };

        const response = await fetch("http://localhost:8080/api/v1/auth/login", reqOptions);

        const { data, message } = await response.json();

        if (!data) {
            throw new Error(message);
        }

        return data;

    } catch (error) {
        throw new Error(error.message);
    }
};

export const registerService = async (username, password) => {

    const reqOptions = {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
        },
        body: JSON.stringify({
            username,
            password
        }),
    };

    const response = await fetch("http://localhost:8080/api/v1/auth/register", reqOptions);

    const { data } = await response.json();
    return data;
};