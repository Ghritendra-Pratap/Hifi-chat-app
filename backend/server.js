const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectingDB = require('./config/connectDB');
const authRoute = require('./routes/authRoute');
const messageRoute = require('./routes/messageRoute');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    credentials: true,
}));

const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoute);
app.use("/api/chat", messageRoute);
app.use("/api/user", userRoute);

// Serve static files with the correct MIME type
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

app.listen(PORT, () => {
    connectingDB();
    console.log(`Server is running at port ${PORT}`);
});
