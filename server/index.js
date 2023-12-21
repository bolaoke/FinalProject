const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Simulated in-memory database (using a JSON file)
let galleryData = require('./gallery.json');

// Middleware to log requests and to disable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific HTTP methods
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allow specific headers

    // Allow cookies and credentials to be sent
    res.header('Access-Control-Allow-Credentials', 'true');

    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.get('/', (req, res) => {
    res.json({ ok: 'it works!' })
})

// Route to add an image
app.post('/add', (req, res) => {
    console.log('ADD REQUEST BODY', req.body)
    const { url, imageName } = req.body;

    // Generate a unique ID (you can use UUID or any other method)
    const imageId = Date.now()

    // Add the new image to the database
    const newImage = { id: imageId, url, imageName };
    galleryData.push(newImage);

    // Save the updated data to the JSON file
    fs.writeFileSync('./gallery.json', JSON.stringify(galleryData, null, 2));

    // Respond with the ID of the added image
    res.json({ id: imageId });
});

// Route to delete an image by ID
app.post('/delete', (req, res) => {
    const { id } = req.body;

    // Find and remove the image from the database
    galleryData = galleryData.filter(image => image.id !== id);

    // Save the updated data to the JSON file
    fs.writeFileSync('./gallery.json', JSON.stringify(galleryData, null, 2));

    // Respond with success message
    res.json({ message: 'Image deleted successfully' });
});

// Route to list all images
app.get('/list', (req, res) => {
    // Respond with the list of images
    res.json(galleryData);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
