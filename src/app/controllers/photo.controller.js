const Photo = require("../models/Photo");
const path = require("path");
const fs = require("fs").promises;
const cloudinary = require("../libs/cloudinary");

class PhotoController {
  static async getAll(req, res) {
    try {
      const photos = await Photo.find();
      res.status(200).json(photos);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async add(req, res) {
    const { title, description } = req.body;
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      const newPhoto = {
        title,
        description,
        imagePath: result.secure_url,
        public_id: result.public_id,
      };
      const photo = new Photo(newPhoto);
      await photo.save();
      await fs.unlink(req.file.path);

      res.status(201).json({ message: "Photo successfully saved", photo });
      console.log("Savig Photo");
      console.log(req.body);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const photo = await Photo.findById(id);
      res.status(200).json(photo);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  }

  static async update(req, res) {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
      const updatedPhoto = await Photo.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ message: "Photo updated successfully", updatedPhoto });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  }

  static async deleteById(req, res) {
    const { id } = req.params;
    try {
      const photo = await Photo.findByIdAndDelete(id);
      if (photo) {
        await cloudinary.v2.uploader.destroy(photo.public_id);
        console.log("file remove");
      }
      res.status(200).json({ message: `Photo with id: ${id} was removed` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  }
}

module.exports = PhotoController;
