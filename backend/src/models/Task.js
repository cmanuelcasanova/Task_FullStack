import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type: String},
  completed: { type: Boolean, default: false },
  username:{type: String},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },

});

export const Task = mongoose.model('Task', taskSchema);
