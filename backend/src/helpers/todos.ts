import { TodoAccess } from './todosAcess'
import { AttachmentUtils } from '../helpers/attachmentUtils'
import { CreateTodoRequest } from '../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../requests/UpdateTodoRequest'
import { createLogger } from '../utils/logger'
import * as uuid from 'uuid'

// TODO: Implement businessLogic
const logger = createLogger('TodoAccess')
const attachmentUtils = new AttachmentUtils()
const todoAccess = new TodoAccess()

export const getTodosForUser = async (userId: string) => {
    return todoAccess.getAllTodos(userId)
}

export const createTodo = async (todo: CreateTodoRequest, userId: string) => {
  const todoId = uuid.v4()
  logger.info(`Creating todo ${todoId}`)
  const attachmentUrl = attachmentUtils.getAttachmentUrl(todoId)
    return todoAccess.createTodoItem({
    userId,
    todoId,
    createdAt: new Date().toISOString(),
    done: false,
    attachmentUrl,
    ...todo
  })
}

export const updateTodo = async (userId: string, todoId: string, todo: UpdateTodoRequest) => {
    return todoAccess.updateTodoItem(userId, todoId, todo)
}

export const deleteTodo = async (userId: string, todoId: string) => {
    return todoAccess.deleteTodoItem(userId, todoId)
}