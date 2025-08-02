
```markdown
# 🩺 AI Health Chatbot – Swahili & English (Powered by PAWA AI)

A simple and effective AI chatbot that provides **health-related advice** in **Swahili and English** using the **PAWA AI API**. It features a modern React chat interface and uses **text-to-speech** to speak out answers.

---

## 📁 Project Structure

```

ai-health-bot/
├── backend/       # Flask API for PAWA chat + text-to-speech
│   ├── app.py
│   └── .env
├── frontend/      # Vite + React chat interface
│   ├── index.html
│   └── src/
│       ├── App.jsx
│       ├── main.jsx
│       └── index.css
└── README.md

````

---

## ⚙️ Backend Setup (Flask + PAWA AI)

### ✅ Requirements

- Python 3.8+
- pip
- A PAWA AI API key

### 📦 Installation

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install flask flask-cors requests python-dotenv
````

### 🔐 Environment Variables

Create a file named `.env` inside the `backend/` folder:

```
PAWA_API_KEY=your_actual_pawa_api_key_here
```

### 🚀 Run the Flask Server

```bash
python app.py
```

Flask server will start at `http://localhost:5000`.

---

## 🌐 Frontend Setup (Vite + React)

### ✅ Requirements

* Node.js v18+
* npm

### 📦 Installation

```bash
cd frontend
npm install
```

### ▶️ Start the Frontend

```bash
npm run dev
```

Frontend runs at `http://localhost:5173`.

---

## 🔁 Features

* ✅ Ask health-related questions in **Swahili** or **English**
* ✅ Clean chat interface with scrollable history
* ✅ Text-to-speech: Bot reads answers aloud using PAWA AI
* ❌ No support for off-topic queries — answers are restricted to health only
* ❌ No user login or storage (lightweight & local)

---

## 🧪 API Endpoints

| Method | Endpoint    | Description                         |
| ------ | ----------- | ----------------------------------- |
| POST   | `/api/chat` | Sends a health question to PAWA AI  |
| POST   | `/api/tts`  | Converts text to speech (MP3 audio) |

---

## ✨ Future Enhancements

* Add local storage or backend chat logging
* Add microphone (speech-to-text)
* Deploy with Netlify (frontend) + Render (backend)
* Use custom PAWA knowledge base
* Mobile-friendly voice mode for rural use

---

## 👏 Credits

* 🤖 AI Engine: [PAWA AI](https://pawa.ai)
* 🧠 Backend: Flask
* 💻 Frontend: React + Vite
* 🇹🇿 Language: Swahili + English

---

## 📄 License

This project is open-sourced under the **MIT License**.

```

---

Let me know if you want me to export it to a file (`README.md`) you can download directly.
```
