import express from 'express'
import { Tasks, Users } from '../model.js'
const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, priority, status, createdBy, assignedTo } = req.body;

    const task = new Tasks({ title, description, dueDate, priority, status, createdBy, assignedTo });

    await task.save();

    await Users.findByIdAndUpdate(
      createdBy,
      { $push: { tasksCreated: task._id } }
    );

    if (assignedTo && assignedTo !== createdBy) {
      await Users.findByIdAndUpdate(
        assignedTo,
        { $push: { taskAssigned: task._id } }
      );
    }

    await task.populate('createdBy', 'username email');
    await task.populate('assignedTo', 'username email');

    console.log("Saved Task with populated createdBy:", task);
    res.status(201).json(task);
  } catch (err) {
    console.error("Error saving task:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
    try {
        const tasks = await Tasks.find()
            .populate("createdBy", "username email")
            .populate("assignedTo", "username email")
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch tasks", error });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .populate('createdBy', 'username email')
        .populate("assignedTo", "username email")
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Update failed", error });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task = await Tasks.findByIdAndDelete(req.params.id);
        if (task) {
            await Users.findByIdAndUpdate(task.createdBy, { $pull: { tasksCreated: task._id } });
            await Users.findByIdAndUpdate(task.assignedTo, { $pull: { taskAssigned: task._id } });
          }      
        res.send('Task Deleted');
    } catch (error) {
        res.status(500).json({ message: "Deletion failed", error });
    }
});

router.get('/created/:userId', async (req, res) => {
    try {
        const tasks = await Tasks.find({ createdBy: req.params.userId })
            .populate("createdBy", "username email")
            .populate("assignedTo", "username email")
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
        }).populate("createdBy", "username email")
        .populate("assignedTo", "username email")

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
            .populate("createdBy", "username email")
            .populate("assignedTo", "username email")

        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Filtering failed", error });
    }
});



export default router;