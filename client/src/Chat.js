import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import CryptoJS from "crypto-js"; 

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const secretKey = "SecretKey"; 

  const encryptMessage = (message) => {
    return CryptoJS.AES.encrypt(message, secretKey).toString();
  };

  const decryptMessage = (encryptedMessage) => {
    return CryptoJS.AES.decrypt(encryptedMessage, secretKey).toString(CryptoJS.enc.Utf8);
  };

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const encryptedMessage = encryptMessage(currentMessage); // Encrypt the message
      const messageData = {
        room: room,
        author: username,
        encryptedMessage: encryptedMessage, // Send the encrypted message
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
       const decryptedMessage = decryptMessage(data.encryptedMessage); // Decrypt the encrypted message
       const decryptedData = { ...data, message: decryptedMessage }; // Include the decrypted message in data
      setMessageList((list) => [...list,decryptedData]);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent, index) => {
            return (
              <div
                className="message"
                key={index}
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                     <p>{username === messageContent.author ? decryptMessage(messageContent.encryptedMessage) : messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;

