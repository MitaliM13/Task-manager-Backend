import express from 'express'
import { Tasks } from '../model.js'
const router = express.Router()

router.post('/', async(req, res) => {
    const task = new Tasks(req.body);
    await task.save();
    res.status(201).json(task);
})

router.get('/', async(req, res) => {
    const task = await Tasks.find();
    res.json(task);
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