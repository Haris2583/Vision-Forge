const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require('body-parser');
const { PythonShell } = require('python-shell');
const UserModel = require('./models/User');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection error:", err));

// Middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));

// Routes

// Registration route
app.post('/registration', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const newUser = new UserModel({ name, email, password });
    await newUser.save();
    res.json({ status: "success", message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });

    if (!user) {
      return res.json({ status: "error", message: "No record existed" });
    }

    console.log("User found:", user);

    if (user.password === password) {
      return res.json({ status: "success", message: "Successful Login" });
    } else {
      return res.json({ status: "error", message: "Incorrect password" });
    }
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

// Submit route using python-shell
app.post('/submit', async (req, res) => {
  try {
    const data = req.body;

    const options = {
      mode: 'json',
      pythonPath: 'C:/python 3.7/python.exe', 
      pythonOptions: ['-u'], 
      scriptPath: 'E:/MERN/backend', 
      args: [
        data.name,
        data.matricField,
        data.matricMarks,
        data.intermediateField,
        data.intermediateMarks,
        data.interest1,
        data.interest2,
        data.interest3
      ]
    };

    const pyshell = new PythonShell('TrainedModel.py', options);

    let scriptOutput = '';

    pyshell.on('message', (message) => {
      console.log('Python script output:', message);
      scriptOutput = message;
    });

    pyshell.end((err, code, signal) => {
      if (err) {
        console.error('Python error output:', err);
        if (!res.headersSent) {
          return res.status(500).send('Internal Server Error');
        }
      } else {
        console.log('Python script finished with code:', code, 'and signal:', signal);
        if (!res.headersSent) {
          return res.json(scriptOutput); // Correctly send the Python script output to the client
        }
      }
    });

  } catch (error) {
    console.error('Error:', error);
    if (!res.headersSent) {
      res.status(500).send('Internal Server Error');
    }
  }
});

// Port
const port = process.env.PORT || 8080;

// Listener
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
