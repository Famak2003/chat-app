import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3001;

const app = express()
app.use(cors()); // Middleware to allow cross-origin requests
const server = http.createServer(app); // Generates a server

const io = new Server(server, { // Setup socket sever, and allow cors. Also setting some cors rules.
    cors: {
        origin: "http://localhost:3000", // Allows requests feom only this port
        methods: ["GET", "POST"] // Allows only these methods
    }
})

io.on("connection", (socket) => {
    console.log("User connected",socket.id);

    
    socket.on("join-room", (roomId) => {
        socket.join(roomId)
        console.log(` User with id: ${socket.id} has joined with key: ${roomId} `);
    });
    
    socket.on("send_message", (messageBody) => {
        socket.to(messageBody.roomId).emit("recieve_message", messageBody);
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})  


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
