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

//using POST method to create new student

// router.post("/post", (req, res) => {
//     const newID = req.body.id;
//     const newName = req.body.name;
//     //cả id lẫn name đề là data để thêm mới hoàn toàn, nằm trong req.body

//     studentsList.push({ id: Number(newID), name: newName });

//     res.json(studentsList);
// });

router.get("/create", (req, res) => {
    const newID = req.query.id;
    const newName = req.query.name;

    studentsList.push({ id: Number(newID), name: newName });

    res.json(studentsList);
});

//using GET method to read the students list

router.get("/read", (req, res) => { res.json(studentsList) });

//using PUT method to update student

// router.put("/:id", (req, res) => {
//     const idToEdit = req.params.id;
//     const newName = req.body.name;

//     for (let i = 0; i < studentsList.length; i++) {
//         if (studentsList[i].id === Number(idToEdit)) {
//             studentsList[i].name = newName;
//             break;
//         }
//     }

//     res.json(studentsList);
// });

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

//use DELETE method to delete student

// router.delete("/delete/", (req, res) => {
//     const delID = req.querry.id;//id là querry để xác định đối tượng cần xóa.

//     for (let i = 0; i < studentsList.length; i++) {
//         if (studentsList[i].id === Number(delID)) {
//             studentsList.splice(i, 1);
//             break;
//         }
//     }

//     res.json(studentsList);
// });

router.get("/delete/:id", (req, res) => {
    const delID = req.params.id; //params là các tham số nằm sau dấu ':'

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
// module.exports = studentsRouters