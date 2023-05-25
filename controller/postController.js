const Post = require("../model/postModel");
const getPost = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json({ status: 1, msg:post });
  } catch(error) {
    console.log(error);
    res.status(400).json({ status: 0, msg: error });
  }
};
const createPost = async (req, res) => {
  try {
    console.log(req.body);
    const post = await Post.create(req.body);
    console.log(req.user)
    console.log(post);
    res.status(200).json({ status: 1, msg: post });
  } catch (error){
    console.log(error);
    res.status(400).json({ status: 0, msg: error });
  }
};
const updatePost = async (req, res) => {
  try {
    let post = await Post.findOneAndUpdate(req.param.id, req.body);
    res.status(200).json({ status: 1, msg: post });
  } catch(error) {
    console.log(error);
    res.status(400).json({ status: 0, msg: error });
  }
};
const deletePost = async (req, res) => {
  try {
    let post = await Post.findOneAndDelete(req.param.id);
    console.log(post)
    res.status(200).json({ status: 1, msg: post });
  } catch(error) {
    console.log(error);
    res.status(400).json({ status: 0, msg: error });
  }
};

module.exports = { getPost, createPost, updatePost, deletePost };
