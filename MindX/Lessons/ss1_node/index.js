const fs = require('fs');
const http = require('http');
const url = require('url');

// fs.readFile('./hello.txt', 'utf-8', (err, data) => {
//     if (err) {
//         console.error(err);;
//     } else {
//         console.log(data);
//     }
// });

// const data = fs.readFileSync("./hello.txt", "utf-8");
// console.log(data);

// fs.writeFile(
//     "hello.txt",
//     "hello-1",
//     { flag: 'a' }, //'append' new content to existing file, of not set, the file will be overwritten.
//     (err) => {
//         if (err) {
//             console.log('Loi roi!');
//         } else {
//             console.log("Done writing file.")
//         };
//     });

// fs.writeFileSync("./hello.txt", "Hello 2", {
//     flag: "a",
// });

// fs.writeFileSync("./data.js", "const a = 1; console.log(a)"); //if the file is not exist, creat a new file and write the content.

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
            const idList = usersData.data.map(user => user.id);
            if (idList.includes(Number(userId))) {
                const user = usersData.data.find((user) => user.id === Number(userId));
                res.end(JSON.stringify(user));
            } else {
                res.end(fs.readFileSync('err.html', 'utf-8'));
            }
        }

        default:
            break;
    }
};

const server = http.createServer(serverListener);

server.listen(8080, () => {
    console.log(`Server is running on port 8080`);
});