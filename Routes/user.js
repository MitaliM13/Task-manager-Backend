import express from "express";
import { Users } from "../model.js";
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await Users.find(
      {},
      "username email tasksCreated taskAssigned"
    )
      .populate("taskAssigned", "title description")
      .populate("tasksCreated", "title description");

    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users", error });
  }
});

export default router;