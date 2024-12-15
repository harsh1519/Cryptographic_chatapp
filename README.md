# Cryptographic Chat App
A real-time chat application where users can join rooms and send encrypted messages. All messages are encrypted using AES encryption to ensure privacy. The app uses **Socket.IO** for real-time communication and **CryptoJS** for encryption and decryption of messages.

## Features

- Real-time messaging between users in the same room.
- AES encryption for secure message transmission.
- User can join a chat room and send/receive encrypted messages.
- Encrypted messages are automatically decrypted upon receiving.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express
- **Real-time Communication**: Socket.IO
- **Encryption**: CryptoJS (AES Encryption)

## Installation

1. Clone the repository: `git clone https://github.com/harsh1519/Cryptographic_chatapp.git` and navigate to the project folder using `cd Cryptographic_chatapp`.
2. Install dependencies for the backend by navigating to the `server` directory with `cd server` and running `npm install`.
3. Install dependencies for the frontend by navigating to the `client` directory with `cd client` and running `npm install`.
4. Start the backend server by running `nodemon index.js` in the `server` directory, which will start the server on `http://localhost:3001`.
5. Start the frontend application by running `npm start` in the `client` directory, which will start the frontend app on `http://localhost:3000`.


