const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const User = require('./models/User');
const Message = require('./models/Message');

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost/healthcare-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Auth routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role
    });
    
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      'your_jwt_secret'
    );
    
    res.json({ token, user: { name: user.name, role: user.role, id: user._id } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Message routes
app.post('/api/messages', async (req, res) => {
  try {
    const { senderId, receiverId, content } = req.body;
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/messages/:userId1/:userId2', async (req, res) => {
  try {
    const { userId1, userId2 } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId1, receiver: userId2 },
        { sender: userId2, receiver: userId1 }
      ]
    }).sort('timestamp');
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add this route to get users
app.get('/api/users', async (req, res) => {
  try {
    const { role } = req.query;
    const users = await User.find({ role }).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 