import express from 'express';
import { deleteNote, getAllNotes, createNote, updateNote, getNoteById } from '../controllers/notesController.js';

const router = express.Router();

router.get('/',getAllNotes);

router.get('/:id',getNoteById);

router.post("/",createNote);

router.put("/:id",updateNote);

router.delete("/:id",deleteNote);

// Export the router to be used in the main server file
export default router;