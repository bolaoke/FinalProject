import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [images, setImages] = useState([])

  useEffect(() => {
    // setImages([
    //   {
    //     "id": 0,
    //     "imageName": "Test",
    //     "url": "https://images.pexels.com/photos/12458104/pexels-photo-12458104.jpeg"
    //   }
    // ])
    fetch('http://localhost:3000/list').then(async (data) => {
      const json = await data.json()
      setImages(json)
    })
  }, [])

  async function addImage() {
    const imageName = prompt(`What do you want to call the new image?`)
    const imageURL = prompt(`What's the direct link to the image?`)
    console.log('Would add', imageName, imageURL)
    fetch('http://localhost:3000/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the Content-Type header
      },
      body: JSON.stringify({
        imageName: imageName,
        url: imageURL
      })
    }).then(async (response) => {
      const json = await response.json()
      setImages(images.concat({ id: json.id, imageName, url: imageURL }))
    }).catch((error) => {
      console.error(error)
    })

  }

  async function deleteImage(id) {
    if (confirm('Are you sure you want to delete the image?')) {
      fetch('http://localhost:3000/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the Content-Type header
        },
        body: JSON.stringify({
          id: id
        })
      }).then(async (response) => {
        const json = await response.json()
        setImages(images.filter((e) => e.id !== id))
        alert('OK, image was deleted :(')
      }).catch((error) => {
        console.error(error)
        alert('Delete failed!!')
      })
    }
  }

  function openImage(url) {
    window.open(url, '_blank')
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">

        </a>
        <a href="https://react.dev" target="_blank">

        </a>
      </div>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <h1>Gallery</h1>
      {/* <p><img src={viteLogo} className="logo" alt="Vite logo" /><span style={{ fontSize: 18, fontWeight: 'bold', verticalAlign: 'middle', paddingTop: '-200px' }}>Gallery</span></p> */}
      <div className="card">
        <div className="boxes">
          {
            images.map((entry) =>
              <div style={{ textAlign: 'center' }}>
                <div title='Open image in new tab' onClick={() => openImage(entry.url)} className='box' style={{ backgroundImage: `url(${entry.url})`, cursor: 'pointer' }} id={entry.id}>
                </div>
                <div title='Delete image' style={{ cursor: 'pointer', paddingBottom: 8 }} onClick={() => deleteImage(entry.id)}>{entry.imageName} &bull; 🗑️</div>
              </div>
            )
          }
        </div>
      </div>
      <p className="read-the-docs">
        Upload an image to the Gallery!
      </p>
      <p>
        <button onClick={addImage}>Add Image To Gallery</button>
        {/* <button onClick={deleteImage}>Delete Image From Gallery</button> */}
      </p>
    </>
  )
}

export default App
