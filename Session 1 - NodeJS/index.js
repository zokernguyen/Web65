const { json } = require('express/lib/response');
const fs = require('fs');
const http = require('http');
console.log(fs);

const serverListener = (req, res) => {
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

        case "/api/users/1": {
            const usersData = JSON.parse(fs.readFileSync("./data.json", "utf-8"));
            // console.log(usersData);
            res.end(JSON.stringify(usersData.data[0]));
        }

        case 

        default:
            break;
    }
};

const server = http.createServer(serverListener);

server.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});