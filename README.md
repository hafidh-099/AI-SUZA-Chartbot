```markdown
# 🩺 AI Health Chatbot 🇹🇿 (Swahili + English)  
> Powered by [PAWA AI](https://pawa-ai.com) | Flask + React + TTS  

A simple, modern AI chatbot that helps users ask health-related questions in Swahili or English. Built with Flask, React (Vite), and PAWA AI. It can also read out responses using text-to-speech (TTS)

---

## 🚀 Features

- 💬 Chat with an AI assistant about health topics
- 🌍 Supports both **Swahili** and **English**
- 🧠 PAWA AI-powered responses
- 🔊 Text-to-speech for audio replies
- 🖥️ Clean chat UI with scrolling history
- ⛔ Ignores off-topic questions (health only)

---

## 📁 Project Structure

```ai-health-bot/
├── backend/                  # Flask API
│   ├── app.py                # Main server code (chat + TTS)
│   └── .env                  # Contains your PAWA\_API\_KEY
├── frontend/                 # Vite + React frontend
│   ├── index.html
│   └── src/
│       ├── App.jsx           # Main chat component
│       ├── main.jsx          # App entry point
│       └── index.css         # Styles for the chat UI
└── README.md                 # This file
````

---
## ⚙️ Backend Setup (Flask + PAWA AI)

### ✅ Prerequisites

- Python 3.8+
- [PAWA AI API Key](https://pawa-ai.com)
- `pip` installed

### 📦 Installation
---
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install flask flask-cors requests python-dotenv
````

### 🔐 Add Your API Key in `.env`

```env
PAWA_API_KEY=your_real_pawa_api_key
```

### ▶️ Run Flask Server

```bash
python app.py
```

> Backend runs at `http://localhost:5000`

---

## 🌐 Frontend Setup (React + Vite)

### ✅ Prerequisites

* Node.js v18+
* npm

### 📦 Installation

```bash
cd frontend
npm install
```

### ▶️ Start the Dev Server

```bash
npm run dev
```

> Frontend opens at `http://localhost:5173`

---

## 🧠 API Routes Summary

| Method | Endpoint    | Description                       |
| ------ | ----------- | --------------------------------- |
| POST   | `/api/chat` | Ask a health-related question     |
| POST   | `/api/tts`  | Convert a response to audio (MP3) |

---

## 💡 How It Works

1. User enters a health question.
2. It is sent to Flask → PAWA AI API → processed.
3. AI responds → displayed in chat + optionally spoken aloud via TTS.

---

## 🛠️ Possible Enhancements

* [ ] Save chat history to local storage or DB
* [ ] Add voice input (speech-to-text)
* [ ] Deploy backend to **Render**, frontend to **Netlify**
* [ ] Mobile-first design + PWA support

---

## 👏 Credits

* 🧠 [PAWA AI](https://pawa-ai.com) – African-built AI platform
* 🐍 Flask – Backend
* ⚛️ React + Vite – Frontend
* 🎧 PAWA TTS – Audio response

---

## 📄 License

**MIT** — Free to use and modify.

```

---

Let me know if you'd like me to:
- Save this as a `.md` file for download
- Add badges (e.g. license, version, etc.)
- Prepare it for GitHub Pages or deployment instructions

Just say the word!
```
