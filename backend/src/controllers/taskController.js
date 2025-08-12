import { Task } from '../models/Task.js';

export const getTasks = async (req, res) => {
   const tasks = await Task.find();
   res.json(tasks);
};

export const createTask = async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.status(201).json(newTask);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: 'Tarea eliminada' });

};

export const updateTaskPartial = async (req, res) => {

  await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // devuelve el documento actualizado
      runValidators: true, // aplica validaciones del schema
    });
    res.status(204).json({ message: 'Tarea actualizada' });
  }
