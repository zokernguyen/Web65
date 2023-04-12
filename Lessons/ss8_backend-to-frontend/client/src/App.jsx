import { useState, useEffect } from "react";
import "./App.css";
import { getStudentsService } from "../service/students.service";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

function App() {

  const [token, setToken] = useState(null);
  const [students, setStudents] = useState(null);

  //save access token to localStorage
  useEffect(() => {

    //check if a access token is already stored in localStorage, use this token as a props payload to pass to another component that responsible for calling API
    const tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
      setToken(tokenInLocalStorage);
    }
  }, [token]);

  //if access token is valid, render all students; if not, return to login page. Re-render whenever access token is changed.
  useEffect(() => {
    if (!token) return;
    getStudentsService().then((res) => setStudents(res));
  }, [token]);

  //conditional rendering for time-issue, better inprove with router.
  return (
    <div className="App">
      {token ? (
        <HomePage students={students} setToken={setToken} />
        //receive setToken props to handle logout
      ) : (
        <LoginPage setToken={setToken} />
      )}
    </div>
  );
}

export default App;