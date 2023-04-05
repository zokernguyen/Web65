import express from 'express';
import studentsRouters from './routers/students.js';
import teachersRouters from './routers/teachers.js';
import authenRouters from './routers/authen.js';

const app = express();
app.use(express.json());
const port = 8080;

app.get("/", (req, res) => {

    res.send('Homepage');
});

app.use("/students", studentsRouters);
app.use("/teachers", teachersRouters);
app.use("/authen", authenRouters);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});