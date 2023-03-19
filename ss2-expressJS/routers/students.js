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
router.get("/create", (req, res) => { });
router.get("/read", (req, res) => { res.json(studentsList) });
router.get("/edit", (req, res) => { });
router.get("/delete", (req, res) => { });

export default router;