from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

messages = []

class Message(BaseModel):
    text: str

@app.post("/message")
def receive_message(msg: Message):
    messages.append(msg.text)
    return {"message received"}

@app.get("/")
def root():
    return {"messages": messages}