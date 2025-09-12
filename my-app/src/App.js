import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

function App() {

  const [messages, setMessages] = useState([]);

  const handleSend = async (text) => {

    const userMessage = {
      message: text,
      direction: "outgoing",
    };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:8000/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      const botMessage = {
        message: data[0],
        direction: "incoming",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <MainContainer>
        <ChatContainer>
          <MessageList>
            {messages.map((m, i) => (
              <Message key={i} model={m} />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend}/>
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default App;