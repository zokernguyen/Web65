import "./home.css";

const HomePage = () => {
    //Mock data
    const userData = [
        { username: "Zoker" },
        { username: "User001" },
        { username: "User002" },
    ]

    return (
        <main className="home-container">
            <div className="home-title">User List</div>
            <div className="home-userlist">
                {userData.map((user) => {
                    return (
                        <div className="user-container">
                            <div className="home-user">{user.username}</div>
                            <div className="delete-user"> Delete </div>
                        </div>
                    );
                })}
            </div>
        </main>
    );
};

export default HomePage;
