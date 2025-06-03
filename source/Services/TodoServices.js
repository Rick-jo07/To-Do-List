import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getAllTodo = async (userId) => { 
    return await prisma.todo.findMany({
        where: {
            userid: parseInt(userId)
        }
    });
}

export const createTodoData = async (title, completed, userId) => {
    const existingTodo = await prisma.todo.findFirst({
        where: {
            title: title,
            userid: parseInt(userId)
        }
    });
    if(existingTodo) throw new Error('EXIST');
    return await prisma.todo.create({ 
        data: {
            title,
            completed,
            userid: userId
        }
    });
}

export const UpdateTodoData = async (id, title, completed, userId) => {
    const todo = await prisma.todo.findFirst({
        where: {
            AND: [
              { userid: parseInt(userId) },
              { todo_id: parseInt(id) }
            ]
          }
    })
    if(!todo) throw new Error('NOT_FOUND');
    if(todo.userid !== userId ) throw new Error('FORBIDDEN');
    return await prisma.todo.update({ 
        where: {
            todo_id: parseInt(id) 
          } , 
        data : {title,completed} 
    });
}

export const DeleteTodoData = async (id,title,userId) => {
    const todo = await prisma.todo.findFirst({
        where: {
            AND: [
              {  title },
              { todo_id: parseInt(id) }
            ]
          }
    })
    if (!todo) {
        throw new Error('NOT_FOUND');
    }
    if(todo.userid !== parseInt(userId)) throw new Error('FORBIDDEN');
    return await prisma.todo.delete({ 
        where : {todo_id : parseInt(id)  } , 
    })
}


