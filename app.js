const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

app.use(express.json()); // Middleware pour parser le JSON

// Définition du port
const PORT = process.env.PORT || 3000;

// Routes
app.use('/api', apiRoutes);

// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});