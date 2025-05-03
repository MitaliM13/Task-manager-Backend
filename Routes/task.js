import express from 'express'
import { Tasks } from '../model.js'
const router = express.Router()

router.post('/', async(req, res) => {
    const task = new Tasks(req.body);
    await task.save();
    res.status(201).json(task);
})

router.get('/', async(req, res) => {
    try {
        const task = await Tasks.find()
            .populate("createdBy", "username email")
            .populate("assignedTo", "username email");

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
})

router.put('/:id', async(req, res) => {
    const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(task)
})

router.delete('/:id', async(req, res) => {
    await Tasks.findByIdAndDelete(req.params.id);
    res.send('Task Deleted')
})

export default router;