const fs = require('fs');
const http = require('http');
const url = require('url');

const serverListener = (req, res) => {
    const userId = req.url.split('/').pop();

    switch (req.url) {

        case '/': {
            const htmlData = fs.readFileSync("./index.html", "utf-8");
            res.end(htmlData);
            break;
        }

        case "/api/users": {
            const usersData = fs.readFileSync("./data.json", "utf-8");
            res.end(usersData);
            break;
        }

        case `/api/users/${userId}`: {
            const usersData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
            const user = usersData.data.find((user) => user.id === Number(userId));
            console.log(user);
            res.end(JSON.stringify(user));
        }

        default:
            break;
    }
};

const server = http.createServer(serverListener);

server.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});