import express from 'express';
import studentsRouters from './routers/students.js';
//const studentsRouters = require(./routers/students.js)
import teachersRouters from './routers/teachers.js';
import authenRouters from './routers/authen.js';

const app = express(); //express app wrapper
app.use(express.json()); //to read req.body in json format.
const port = 8080;


app.get("/", (req, res) => {

    //authen
    //querry DB
    //handle DB
    //...

    res.send('Homepage');
});

app.use("/students", studentsRouters);//adding relative "/students" prefix, no more repetition
app.use("/teachers", teachersRouters);
app.use("/authen", authenRouters);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});