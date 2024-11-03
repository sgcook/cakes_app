import express from 'express';
import { body, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import { cakeValidator } from '../cakeValidator';
import Cake from '../models/Cake';
import { check } from 'prettier';

const router = express.Router();

router.get("/", async(req, res) => {
  try {
    const cakes = await Cake.find();
    res.status(200).json(cakes);
  } catch (e) {
    res.json(e);
  }
})

router.get("/:id", async (req, res) => {
  try {
    const id = mongoose.Types.ObjectId.createFromHexString(req.params.id);
    const cake = await Cake.findById(id);
    if (!cake) res.send("Not found").status(404);
    res.status(200).json(cake);
  } catch (e) {
    res.json(e);
  }
});

router.post("/", cakeValidator, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const cake = await Cake.create(req.body);
    res.status(201).json(cake);
  } catch (e) {
    res.json(e);
  }
});

router.patch("/:id", [body('comment').optional().isLength({ min: 5, max: 200 }).withMessage('Comment must be between 5 and 200 characters.')], async (req, res) => {
  try {
    const errors = validationResult(req);
    errors.array();
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()})
    }

    const cake = await Cake.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(cake);
  } catch (e) {
    res.json(e);
  }
})

router.delete("/:id", async (req, res) => {
  try {
    const cake = await Cake.findByIdAndDelete(req.params.id);
    res.status(200).json(cake);
  } catch (e) {
    res.json(e);
  }
});

export default router;