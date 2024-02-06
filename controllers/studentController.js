const { Student } = require('../config/db'); 

// Créer un étudiant
exports.createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Lire tous les étudiants
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lire un étudiant par son identifiant
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mettre à jour les informations d'un étudiant
exports.updateStudent = async (req, res) => {
  try {
    const [updated] = await Student.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedStudent = await Student.findByPk(req.params.id);
      res.status(200).json(updatedStudent);
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Supprimer un étudiant
exports.deleteStudent = async (req, res) => {
  try {
    const deleted = await Student.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(200).json({ message: 'Student deleted.' });
    } else {
      res.status(404).json({ message: 'Student not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
