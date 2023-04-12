import React from "react";

function HomePage({ setToken, students }) {
    if (!students) return <div>Loading...</div>;

    //handle logout by removing access token from localStorage, so app will re-render and navigate to login page
    const onLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
    };

    return (
        <div>
            <button onClick={onLogout}>Logout</button>
            <div className="students-wrapper">
                {students.map(({ _id, name, class: classOfStudent, address, age }) => {
                    return (
                        <div key={_id}>
                            <h2>Name: {name}</h2>
                            <h2>Age: {age}</h2>
                            <h2>Address: {address}</h2>
                            <h2>Class: {classOfStudent}</h2>
                            <hr></hr>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default HomePage;