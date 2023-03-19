import express from 'express';
import studentsRouters from './routers/students.js';
import teachersRouters from './routers/teachers.js';
import authenRouters from './routers/authen.js';

const app = express();

app.get("/", (req, res) => {

    //authen
    //querry DB
    //handle DB
    //...

    res.send('Homepage');
});

app.use("/students", studentsRouters);
app.use("/teachers", teachersRouters);
app.use("/authen", authenRouters);

app.listen(8080, (err) => {
    console.log('Server is running on port 8080');
});