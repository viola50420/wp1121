import DiaryModel from "../models/DiaryModel.js";
import TodoModel from "../models/DiaryModel.js";

// Get all todos
export const getDiarys = async (req, res) => {
  try {

    // Find all todos
    const todos = await TodoModel.find({});
    // Return todos
    return res.status(200).json(todos);
  } catch (error) {
    // If there is an error, return 500 and the error message
    // You can read more about HTTP status codes here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Or this meme:
    // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
    return res.status(500).json({ message: error.message });
  }
};

export const getDiary = async (req, res) => {
  try {
    const id = req.body; 
    const dairy = await DiaryModel.findById(id);
    console.log(id);
    // Return todos
    return res.status(200).json(dairy);
  } catch (error) {
    // If there is an error, return 500 and the error message
    // You can read more about HTTP status codes here:
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
    // Or this meme:
    // https://external-preview.redd.it/VIIvCoTbkXb32niAD-rxG8Yt4UEi1Hx9RXhdHHIagYo.jpg?auto=webp&s=6dde056810f99fc3d8dab920379931cb96034f4b
    return res.status(500).json({ message: error.message });
  }
};
// Create a todo
export const createDiary = async (req, res) => {
  const { title, content, mood, tag } = req.body;

  // Check title and description
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: "Title and description are required!" });
  }

  // Create a new todo
  try {
    const newDairy = await DiaryModel.create({
      title,
      content,
      mood,
      tag
    });
    return res.status(201).json(newDairy);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update a todo
export const updateDiary = async (req, res) => {
  const { id } = req.params;
  const { title, content, mood, tag } = req.body;

  try {
    // Check if the id is valid
    const existedDairy = await DiaryModel.findById(id);
    if (!existedDairy) {
      return res.status(404).json({ message: "not found!" });
    }

    // Update the todo
    if (title !== undefined)  existedDairy .title = title;
    if (content !== undefined)  existedDairy .content = content;
    if (mood !== undefined)  existedDairy .mood = mood;
    if (tag !== undefined)  existedDairy .tag = tag;

    // Save the updated todo
    await  existedDairy .save();

    // Rename _id to id
    existedDairy.id = existedDairy ._id;
    delete existedDairy ._id;

    return res.status(200).json( existedDairy );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete a todo
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    // Check if the id is valid
    const existedTodo = await TodoModel.findById(id);
    if (!existedTodo) {
      return res.status(404).json({ message: "Todo not found!" });
    }
    // Delete the todo
    await TodoModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
