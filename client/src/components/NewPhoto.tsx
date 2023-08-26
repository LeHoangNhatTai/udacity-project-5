import React from 'react'
import { useHistory } from 'react-router-dom'
import { addPhoto, uploadFile } from '../api/photos-api'
import { Button, Grid, Loader  } from 'semantic-ui-react'

const NewPhoto = ({auth} : {auth: any}) => {
  const [files, setFiles] = React.useState<any>()
  const history = useHistory()
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setFiles(files)
  }
  const [isloading, setisloading] = React.useState(false)
  async function handleUploadFile() {
    if (!files) return
    setisloading(true)

    const uploadUrl = await addPhoto(auth.idToken)
    await uploadFile(uploadUrl, files[0])
    setisloading(false)
    history.push('/photos')
  }

  return (
    <div>
      <Button disabled={!files} onClick={handleUploadFile} color="green">
        Add a photo
      </Button>
      {!isloading ? null :
        (
          <Grid.Row>
            <Loader indeterminate active inline="centered">
              Loading upload image
            </Loader>
          </Grid.Row>
        )
      }
      <input
        type="file"
        accept="image/*"
        placeholder="Image to upload"
        onChange={handleFileChange}
      />
    </div>
  )
}

export default NewPhoto
