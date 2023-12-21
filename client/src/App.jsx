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
          {/* <div className='box box-a'>X</div>
          <div className='box'>Y</div>
          <div className='box'>Z</div>
          <div className='box'>X</div>
          <div className='box'>Y</div>
          <div className='box'>Z</div> */}
        </div>
      </div>
      <p className="read-the-docs">
        Upload an image to the Gallery!
      </p>
    </>
  )
}

export default App
