import express from 'express'
import { Tasks } from '../model.js'
const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const task = new Tasks(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find()
            .populate("createdBy", "username email");

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Tasks.findByIdAndDelete(req.params.id);
        res.send('Task Deleted');
    } catch (error) {
        res.status(500).json({ message: "Deletion failed", error });
    }
});

router.get('/created/:userId', async (req, res) => {
    try {
        const tasks = await Tasks.find({ createdBy: req.params.userId })
            .populate("createdBy", "username email");
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch created tasks", error });
    }
});

router.get('/search', async (req, res) => {
    const { q } = req.query;
    try {
        const tasks = await Tasks.find({
            $or: [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } }
            ]
        }).populate("createdBy", "username email");

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Search failed", error });
    }
});

router.get('/filter', async (req, res) => {
    const { status, priority, dueBefore } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (dueBefore) filter.dueDate = { $lt: new Date(dueBefore) };

    try {
        const tasks = await Tasks.find(filter)
            .populate("createdBy", "username email");

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Filtering failed", error });
    }
});

export default router;
