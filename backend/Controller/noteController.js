// const express = require('express');
const Note = require('../Models/noteModel');
const asyncHandler = require('express-async-handler');

const getNotes = asyncHandler(async (req, res) => {
    const note = await Note.find({ user: req.user._id });

    res.json(note);
})

const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error('Please fill all the fields');
    }
    else {
        const note = new Note({ user: req.user._id, title, content, category });

        const createdNote = note.save();
        res.status(201);
        res.json(createdNote);
    }
})

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note) {
        res.json(note);
    }
    else {
        res.status(404);
        throw new Error("Note not found");
    }
})

const updateNote = asyncHandler(async (req, res) => {
    const { title, category, content } = req.body;

    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        res.json(updateNote);
    }
    else {
        res.status(404);
        throw new Error("Note not Found");
    }

})

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You can't perform this action");
    }

    if (note) {
        await note.remove();
        res.json({ message: "Note Removed" });
    }
    else {
        res.status(404);
        res.json({ message: "Note Not Found" });
    }
})

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };