import { useState, useEffect } from "react";
import "./App.css";
import { getStudentsService } from "../service/students.service";
import HomePage from "./components/Homepage/HomePage";
import LoginPage from './components//LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';

function App() {

  const [token, setToken] = useState(null);
  const [students, setStudents] = useState(null);

  //save access token to localStorage
  useEffect(() => {

    //check for access token, if it is already stored in localStorage, use this token as a props payload to pass to another component that responsible for calling API
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

  //conditional rendering due to time-issue, better inprove with router.
  return (
    <div className="App">
      {token ? (
        <HomePage students={students} setToken={setToken} />
        //receive setToken props to handle logout
      ) : (
        <LoginPage setToken={setToken} />
      )}
      <RegisterPage />
    </div>
  );
}

export default App;