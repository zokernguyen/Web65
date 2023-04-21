import React from "react";

function HomePage({ setToken, students }) {
  if (!students) return <div>Loading...</div>;

  const onLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <div className="students-wrapper">
        {students.map(({ name, class: classOfStudent, _id, age }) => {
          return (
            <div key={_id}>
              <h2>Name: {name}</h2>
              <h2>Age: {age}</h2>
              <h2>Class: {classOfStudent}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
