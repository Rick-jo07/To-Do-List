import { PrismaClient } from "@prisma/client";
import * as todoService from "../Services/TodoServices.js";


export const getAllTodos = async (req,res) => {
    const userId = req.session.user?.id;
    try{
        const todos =  await todoService.getAllTodo(userId);
        res.json(todos)
    } catch(error){
        res.status(500).json({ message : 'Failed To Fetch data' })
    }
}

export const createTodos = async (req,res) => {
    const { title , completed } = req.body;
    const userId = req.session.user?.id;
    try {
        const UpdateTodo = await todoService.createTodoData(title,completed,userId);
        res.status(201).json({
            message : 'Data Updated',
            data : UpdateTodo
        })
    } catch (error) {
        if(error.message === 'FORBIDDEN'){
            return res.status(403).json({ message : 'You are not authorized to update this todo' })
        } else if (error.message === 'EXIST'){
            return res.status(404).json({ message : 'Exist' });
        }
        res.status(500).json( {
            message : 'Failed To Create Data'
        })
    }
}

export const UpdateTodos = async (req,res) => {
    const { id } = req.params ;
    const { title, completed } = req.body;
    const userId = req.session.user?.id;
    try {
        const UpdateTodo = await todoService.UpdateTodoData(id,title,completed, userId);
        res.status(201).json({
            message : 'Data Updated',
            data : UpdateTodo
        })
    } catch (error) {
        if(error.message === 'FORBIDDEN'){
            return res.status(403).json({ message : 'You are not authorized to update this todo' })
        } else if (error.message === 'NOT_FOUND'){
            return res.status(404).json({ message : 'Todo Not Found' });
        }
        res.status(500).json( {
            message : 'Failed To Update Data'
        })
    }
}

export const DeleteTodos = async (req,res) => {
    const { id } = req.params;
    const { title } = req.body
    const userId = req.session.user?.id;
    try {
        const DeleteTodos = await todoService.DeleteTodoData(id, title, userId);
        res.status(201).json({
            message : 'Data Deleted',
            data : DeleteTodos
        })
    } catch (error) {
        if(error.message === 'FORBIDDEN'){
            return res.status(403).json({ message : 'You are not authorized to update this todo' })
        } 
        res.status(500).json( {
            message : 'Failed To Update Data'
        })
    }
}