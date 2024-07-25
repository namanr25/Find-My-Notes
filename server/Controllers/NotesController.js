const express = require("express");
const dotenv = require("dotenv");
const Notes = require("../Models/Notes");
const multer = require("multer");
const path = require("path");
const { log } = require("console");

dotenv.config();

const storage = multer.memoryStorage();
var upload = multer({ storage: storage });

const uploadNote = async (req, res) => {
    
    try {
        const fileName = req.body.title;
        const fileDescription = req.body.description;
        const tags = req.body.tags;
        const file = req.file.filename;

        const uploadedBy = req.body.userId;
        console.log(req.file.filename);

        const newFile = new Notes({
            fileName: fileName,
            fileDescription: fileDescription,
            tags: tags,
            files: file,
            uploadedBy: uploadedBy
        });

        await newFile.save();
        res.send({ status: "Ok" });

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.log(error);
    }
};

const getNote = async (req, res) => {
    try {
        const { title, tag } = req.query;
        const query = {};

        if (title) {
            query.fileName = {
                $regex: title,
                $options: "i"
            };
        };

        if (tag) {
            query.tag = {
                $regex: tag,
                $options: "i"
            };
        };

        const data = await Notes.find(query);
        res.send({ data: data });

    } catch (error) {
        console.log(error);
    }
};

const getNoteByID = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        await Notes.find({
            uploadedBy: userId
        }).then(data => {
            res.send({ data: data });
        })
    } catch (error) {
        console.log(error);
    }
};

const getAllFiles = async (req, res) => {
    try {
      const files = await Notes.find();
      res.status(200).json({
        success: true,
        data: files,
      });
    } catch (error) {
      console.error('Error fetching all files:', error);
      res.status(500).json({
        success: false,
        error: 'Error fetching all files',
      });
    }
  };

module.exports = { uploadNote, getNote, getNoteByID, getAllFiles };