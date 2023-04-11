import express from 'express';

const teachersList = [
    {
        id: 1,
        name: "David"
    },
    {
        id: 2,
        name: "Ethan"
    },
    {
        id: 3,
        name: "Frank"
    },
];

const router = express.Router();

router.post("/", (req, res) => {

    teachersList.push(req.body);

    res.status(201).json({
        message: "Create success.",
        data: req.body
    });
});

router.get("/", (req, res) => {
    res.status(200).json({
        message: "Data loaded.",
        data: teachersList
    })
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    let isExist = false;

    for (let i = 0; i < teachersList.length; i++) {
        if (teachersList[i].id === Number(id)) {
            isExist = true;
        }
    }

    if (isExist) {
        res.send(teachersList.filter(teacher => teacher.id == id));
    } else {
        res.status(404).send("Id does not exist.");
    }

});

router.put("/:id", (req, res) => {
    const idToEdit = req.params.id;
    const dataToUpdate = req.body;
    let isExist = false;

    for (let i = 0; i < teachersList.length; i++) {
        if (teachersList[i].id === Number(idToEdit)) {
            isExist = true;
            teachersList[i] = {
                ...teachersList[i],
                ...dataToUpdate
            }
            break;
        }
    }

    if (isExist) {
        res.json({
            message: "Update success.",
            data: teachersList
        });
    } else {
        res.status(404).json("Id does not exist.")
    };
});

router.delete("/:id", (req, res) => {
    const delID = req.params.id;

    for (let i = 0; i < teachersList.length; i++) {
        if (teachersList[i].id === Number(delID)) {
            teachersList.splice(i, 1);
            break;
        }
    }

    res.json({
        message: "Delete success.",
        data: teachersList
    });
});

export default router;