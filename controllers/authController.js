const { User } = require('../config/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Fonction pour créer un utilisateur
exports.signup = async (req, res) => {
  const { username, password, role } = req.body;
  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await User.create({
      username,
      password: hashedPassword,
      role
    });

    res.status(201).json({
      message: "User successfully created!",
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fonction pour authentifier un utilisateur et générer un JWT
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Vérification de l'existence de l'utilisateur
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed. User not found." });
    }

    // Vérification du mot de passe
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: "Authentication failed. Wrong password." });
    }

    // Génération du JWT
    const token = jwt.sign({ userId: user.id, role: user.role },
                            'SECRET_TOKEN', 
                            { expiresIn: '24h' }); 

    res.status(200).json({
      userId: user.id,
      valid: valid,
      // token: token
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
