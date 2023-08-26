import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { editPhoto } from '../api/photos-api'
import { Button, Input } from 'semantic-ui-react'

const EditPhoto = ({ idToken }: { idToken: string }) => {
  const params = useParams<{ photoKey: string }>()
  const [photoName, setPhotoName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const history = useHistory()
  function handleEditPhoto() {
    setLoading(true)
    if (!photoName || !photoName.length)
      return alert('Please enter a photo name')

    editPhoto(idToken, params.photoKey, photoName)
      .then(() => {
        history.push('/photos')
      })
      .catch(() => {
        alert('Failed to edit photo name.')
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div>
      <p>Edit photo name</p>
      <Input
        value={photoName}
        type="text"
        class="ui focus input"
        placeholder="Image Name"
        onChange={(e) => {
          setPhotoName(e.target.value)
        }}
      ></Input>
      <Button disabled={loading || photoName.trim() == ''} onClick={handleEditPhoto} color="blue">
        Update
      </Button>
    </div>
  )
}

export default EditPhoto
