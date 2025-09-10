import unittest
from fastapi.testclient import TestClient
from main import app, messages

client = TestClient(app)

class TestChatAPI(unittest.TestCase):

    def setUp(self):
        messages.clear()

    def test_post_message(self):
        payload = {"text": "Hello bot"}
        response = client.post("/message", json=payload)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), ["message received"])
        self.assertIn("Hello bot", messages)


if __name__ == "__main__":
    unittest.main()
