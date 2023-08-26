import { PhotoAccess } from './photoAccess'
import { createLogger } from '../utils/logger'
import { AttachmentUtils } from './attachmentUtils'

const logger = createLogger('PhotoAccess')
const attachmentUtils = new AttachmentUtils()
const photoAccess = new PhotoAccess()

export const getAllPhotosForUser = async (userId: string) => {
  return photoAccess.getPhotos(userId)
}

export const addPhoto = async (userId: string, photoKey: string) => {
  logger.info(`add a photo with key: ${photoKey}`)
  const photoUrl = attachmentUtils.getAttachmentUrl(photoKey)
  return photoAccess.savePhoto({ userId, photoKey, photoUrl })
}

export const editPhoto = async (
  userId: string,
  photoKey: string,
  photoName: string
) => {
  logger.info(`edit a photo with key: ${photoKey}`)
  return photoAccess.editPhoto({ userId, photoKey, photoName })
}

export const deleteTodo = async (userId: string, photoKey: string) => {
  return photoAccess.deleteTodo(userId, photoKey)
}
