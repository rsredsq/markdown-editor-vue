import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: String,
  content: String
});

const model = mongoose.model("Markdown", schema);

export default model;
