import express from 'express';

const studentsList = [
    {
        id: 1,
        name: "Alice"
    },
    {
        id: 2,
        name: "Bob"
    },
    {
        id: 3,
        name: "Clara"
    },
];

const router = express.Router();

router.get("/create", (req, res) => {
    studentsList.push({ id: 4, name: "Daniel" });
});

router.get("/read", (req, res) => { res.json(studentsList) });

router.get("/edit", (req, res) => {
    const idToEdit = req.query.id;
    const newName = req.query.newName;

    for (let i = 0; i < studentsList.length; i++) {
        if (studentsList[i].id === Number(idToEdit)) {
            studentsList[i].name = newName;
            break;
        }
    }

    res.json(studentsList);

});

router.get("/delete/:id", (req, res) => {
    const delID = req.params.id;

    for (let i = 0; i < studentsList.length; i++) {
        if (studentsList[i].id === Number(delID)) {
            studentsList.splice(i, 1);
            break;
        }
    }

    res.json(studentsList);

    // let newList = studentsList.filter(student => student.id !== Number(req.params.id));
    // res.json(newList);
});

export default router;