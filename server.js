const express = require('express');
const app = express();

app.use(express.json());

const students = [];

app.get('/', (req, res) => {
    res.send('Server is running');
});

app.post('/api/students', (req, res) => {
    const { id, name, email, course, age } = req.body;

    if (!id || !name || !email || !course || !age) {
        return res.status(400).json({ error: "All fields are required." });
    }

    if (students.find(s => s.id === id)) {
        return res.status(400).json({ error: "Student ID already exists." });
    }

    const newStudent = { id, name, email, course, age };
    students.push(newStudent);

    res.status(201).json({
        message: "Student created successfully",
        student: newStudent
    });
});

app.get('/api/students', (req, res) => {
    res.status(200).json(students);
});

app.get('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ error: "Student not found." });
    }

    res.status(200).json(student);
});

app.put('/api/students/:id', (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ error: "Student not found." });
    }

    const { name, email, course, age } = req.body;

    student.name = name || student.name;
    student.email = email || student.email;
    student.course = course || student.course;
    student.age = age || student.age;

    res.status(200).json({
        message: "Student updated successfully",
        student
    });
});

app.delete('/api/students/:id', (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ error: "Student not found." });
    }

    const deletedStudent = students.splice(index, 1);

    res.status(200).json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});