const app = require('./server');

const port = process.env.PORT || 3000;

// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

// app.get('/water', async (req, res) => res.sendFile(path.join(__dirname, '/water.html')))

// app.get('/sleep', async (req, res) => res.sendFile(path.join(__dirname, '/sleep.html')))

// app.get('/exercise', async (req, res) => res.sendFile(path.join(__dirname, '/exercise.html')))

app.listen(port, () => console.log(`Express now departing from port ${port}!`))