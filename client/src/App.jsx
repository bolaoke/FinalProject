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
      images.push({ id: json.id, imageName, url })
      setImages(images)
    }).catch((error) => {
      console.error(error)
    })

  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Gallery</h1>
      <div className="card">
        <div className="boxes">
          {
            images.map((entry) =>
              <div className='box' style={{ backgroundImage: `url(${entry.url})` }}>
                {entry.imageName}
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
      </p>
    </>
  )
}

export default App
