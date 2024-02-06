const express = require('express');
const router = express.Router();

// contrôleurs
const authController = require('../controllers/authController');
const studentController = require('../controllers/studentController');

// middleware d'authentification
const verifyToken = require('../middleware/verifyToken');

// Route POST pour créer un nouvel utilisateur
router.post('/signup', authController.signup);

// Route POST pour authentifier un utilisateur et générer un JWT
router.post('/login', authController.login);

// Routes sécurisées avec JWT pour les étudiants
router.get('/students', verifyToken, studentController.getAllStudents); // Lire tous les étudiants
router.get('/students/:id', verifyToken, studentController.getStudentById); // Lire un étudiant par son ID
router.post('/students', verifyToken, studentController.createStudent); // Créer un nouvel étudiant (assurez-vous d'avoir cette méthode dans studentController)
router.put('/students/:id', verifyToken, studentController.updateStudent); // Mettre à jour un étudiant
router.delete('/students/:id', verifyToken, studentController.deleteStudent); // Supprimer un étudiant

module.exports = router;
