import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { deletePhoto, getPhotos } from '../api/photos-api'
import { Photo } from '../types/Photo'
import { Button, Label, Grid, Loader } from 'semantic-ui-react'

const Photos = ({auth}: {auth: any}) => {
  const history = useHistory()
  const [photos, setPhotos] = React.useState<Photo[]>([])
  const [loading, setLoading] = React.useState(true)
  const [count, setCount] = React.useState(0)
  useEffect(() => {
    getPhotos(auth.idToken).then((data) => {
      setLoading(false)
      setPhotos(data)
    })
  }, [auth.idToken, count])

  async function handleDeletePhoto(key: string) {
    deletePhoto(auth.idToken, key).then(() => {
      setCount(count + 1)
    })
  }
  return (
    <div>
      <h1> Photos:</h1>
      <Button onClick={() => history.push('/photos/add')} color="yellow">
        Create a photo
      </Button>

      {!!loading && 
        (
          <Grid.Row>
            <Loader indeterminate active inline="centered">
              Loading Photos
            </Loader>
          </Grid.Row>
        )
      }
      <Grid padded>
        {photos.map((photo) => {
          return (
            <Grid.Row>
              <Grid.Column
                key={photo.photoKey}
                style={{marginBottom: '3rem'}}
                width={5}
              >
                <img
                  width={300}
                  height={300}
                  src={photo.photoUrl}
                  alt={photo.photoName}
                />
              </Grid.Column>
              <Grid.Column width={5} verticalAlign="middle">
                <b style={{fontSize: '18px'}}>
                  {photo.photoName ?? 'NO_NAME'}
                </b>
              </Grid.Column>
              <Grid.Column width={3}  verticalAlign="middle">
                <Button
                  onClick={() => {history.push(`/photos/edit/${photo.photoKey}`)}}
                  color="green"
                >
                  Edit photo name
                </Button>
              </Grid.Column>
              <Grid.Column width={2}  verticalAlign="middle">
                <Button
                  onClick={() => {handleDeletePhoto(photo.photoKey)}}
                  color="red"
                >
                  Delete
                </Button>
              </Grid.Column>
            </Grid.Row>
          )
        })}
      </Grid>
    </div>
  )
}

export default Photos