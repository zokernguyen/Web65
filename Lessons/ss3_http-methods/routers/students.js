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

router.post("/", (req, res) => {

    studentsList.push(req.body);

    res.status(201).json({
        message: "Create success.",
        data: req.body
    });
});

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Data loaded.",
        data: studentsList
    })
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    let isExist = false;

    for (let i = 0; i < studentsList.length; i++) {
        if (studentsList[i].id === Number(id)) {
            isExist = true;
        }
    }

    if (isExist) {
        res.send(studentsList.filter(student => student.id == id));
    } else {
        res.status(404).send("Id does not exist.");
    }

});

router.put("/:id", (req, res) => {
    const idToEdit = req.params.id;
    const dataToUpdate = req.body;
    let isExist = false;

    for (let i = 0; i < studentsList.length; i++) {
        if (studentsList[i].id === Number(idToEdit)) {
            isExist = true;
            studentsList[i] = {
                ...studentsList[i],
                ...dataToUpdate
            }
            break;
        }
    }

    if (isExist) {
        res.json({
            message: "Update success.",
            data: studentsList
        });
    } else {
        res.status(404).json("Id does not exist.")
    };
});

router.delete("/:id", (req, res) => {
    const delID = req.params.id;

    for (let i = 0; i < studentsList.length; i++) {
        if (studentsList[i].id === Number(delID)) {
            studentsList.splice(i, 1);
            break;
        }
    }

    res.json({
        message: "Delete success.",
        data: studentsList
    });
});

export default router;