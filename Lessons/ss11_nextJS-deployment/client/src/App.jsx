import { useState, useEffect } from "react";
import "./App.css";
import { getStudentsService } from "./service/students.service";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

function App() {
  const [token, setToken] = useState(null);
  const [students, setStudents] = useState(null);

  useEffect(() => {
    const tokenInLocalStorage = localStorage.getItem("token");
    if (tokenInLocalStorage) {
      setToken(tokenInLocalStorage);
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    getStudentsService().then((res) => setStudents(res));
  }, [token]);

  return (
    <div className="App">
      {token ? (
        <HomePage students={students} setToken={setToken} />
      ) : (
        <LoginPage setToken={setToken} />
      )}
    </div>
  );
}

export default App;
