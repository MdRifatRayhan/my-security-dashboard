const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const logRoutes = require('./routes/logRoutes');
const threatRoutes = require('./routes/threatRoutes');
const reportRoutes = require('./routes/reportRoutes');
const authRoutes = require('./routes/authRoutes'); // এটি যোগ করুন

const app = express();
const server = http.createServer(app); 

// Socket.io সেটআপ
const io = new Server(server, {
    cors: { origin: "*" }
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes); // এটি যোগ করুন

// Socket.io কে কন্ট্রোলারের জন্য সেট করা
app.set('socketio', io);

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/uploads', express.static('uploads'));

app.use('/api/logs', logRoutes);
app.use('/api/threats', threatRoutes);
app.use('/api/reports', reportRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB error:', err));

io.on('connection', (socket) => {
    console.log('Real-time alert client connected');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));