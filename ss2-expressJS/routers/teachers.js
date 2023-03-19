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

router.get("/create", (req, res) => { });
router.get("/read", (req, res) => { res.json(teachersList) });
router.get("/edit", (req, res) => { });
router.get("/delete", (req, res) => { });

export default router;