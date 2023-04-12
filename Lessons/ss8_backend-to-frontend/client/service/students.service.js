export const getStudentsService = async () => {

    const reqOptions = {
        headers: {
            "Content-type": "Application/json",
            //put inside "" because keyname containing "-" char.
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };

    const response = await fetch("http://localhost:8080/api/v1/students", reqOptions);

    const { data } = await response.json();
    return data;
};

export const createStudent = async (student) => {

    const reqOptions = {
        method: "POST",
        headers: {
            "Content-type": "Application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(student),
    };

    const response = await fetch("http://localhost:8080/api/v1/students", reqOptions);

    const { data } = await response.json();
    //destructuring data from res object as defined in studentsRouter/create new student operation
    return data;
};