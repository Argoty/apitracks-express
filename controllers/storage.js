const { storageModel } = require("../models");

const { handleHttpError } = require("../utils/handleError");
const { matchedData } = require("express-validator");
const fs = require("fs");

const MEDIA_PATH = `${__dirname}/../storage`;
const PUBLIC_URL = process.env.PUBLIC_URL;

const getItems = async (req, res) => {
  try {
    const data = await storageModel.find({});
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_GET_FILES");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await storageModel.findById(id);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_GET_FILE");
  }
};

const createItem = async (req, res) => {
  try {
    const { file } = req;
    const fileData = {
      filename: file.filename,
      url: `${PUBLIC_URL}/${file.filename}`,
    };

    const data = await storageModel.create(fileData);
    res.send({ data });
  } catch (err) {
    handleHttpError(res, "ERROR_GET_FILE");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataFile = await storageModel.findById(id);
    await storageModel.deleteOne({_id: id})

    const { filename } = dataFile;
    const filePath = `${MEDIA_PATH}/${filename}`;
    fs.unlinkSync(filePath);

    const data = {
      filePath,
      deleted: 1
    }

    res.send({ data });
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_DELETE_FILE");
  }
};

module.exports = { getItems, getItem, createItem,  deleteItem };
