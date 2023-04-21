export const loginService = async (email, password) => {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    };

    const response = await fetch(
      "http://localhost:8080/api/v1/auth/login",
      requestOptions
    );
    const { data, message } = await response.json();
    if (!data) {
      throw new Error(message);
    }
    return data;
  } catch (error) {
    console.log("loginService", error);
    throw new Error(error.message);
  }
};

export const registerService = async (email, password) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const response = await fetch(
    "http://localhost:8080/api/v1/auth/register",
    requestOptions
  );
  const { data } = await response.json();
  return data;
};
