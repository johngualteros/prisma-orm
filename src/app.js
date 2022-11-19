import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.get("/task", async (req, res) => {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
});

app.post("/task", async (req, res) => {
    const task = await prisma.task.create({
        data: {
            title: req.body.title,
            description: req.body.description,
        },
    });
    res.json(task);
});

app.get("/task/:id", async (req, res) => {
    const task = await prisma.task.findUnique({
        where: {
            id: Number(req.params.id),
        },
    });
    res.json(task);
});

app.put("/task/:id", async (req, res) => {
    const task = await prisma.task.update({
        where: {
            id: Number(req.params.id),
        },
        data: {
            title: req.body.title,
            description: req.body.description,
        },
    });
    res.json(task);
});

app.delete("/task/:id", async (req, res) => {
    const task = await prisma.task.delete({
        where: {
            id: Number(req.params.id),
        },
    });
    res.json(task);
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})