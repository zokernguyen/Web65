export const getStudentsService = async () => {
  const requestOptions = {
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const response = await fetch(
    "http://localhost:8080/api/v1/students",
    requestOptions
  );
  const { data } = await response.json();
  return data;
};

export const createStudentService = async (student) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(student),
  };

  const response = await fetch(
    "http://localhost:8080/api/v1/students",
    requestOptions
  );
  const { data } = await response.json();
  return data;
};
