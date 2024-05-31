const express = require('express');
const dotenv = require('dotenv');
const connectingDB = require('./config/connectDB');
const authRoute = require('./routes/authRoute');
const messageRoute = require('./routes/messageRoute');
const userRoute = require('./routes/userRoute');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { app, server } = require('./socket/socket');

app.use(bodyParser.json({limit: '50mb'}));
dotenv.config({ path: path.resolve(__dirname, './.env') });
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


app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

server.listen(PORT, () => {
    connectingDB();
    console.log(`Server is running at port ${PORT}`);
});
