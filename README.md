# Thumblify

Thumblify is a full-stack web application that recreates and generates high-quality thumbnails using AI.
Users can upload an image or provide a URL, customize styles, and generate improved thumbnails instantly.

---

## 🚀 Features

* Generate thumbnails using AI
* Multiple styles (Minimalist, Bold, Photorealistic, etc.)
* Aspect ratio selection (1:1, 16:9, 9:16)
* Color scheme customization
* Real-time preview (planned)
* Store and manage generated thumbnails

---

## 🛠 Tech Stack

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express
* MongoDB (Mongoose)

### AI Integration

* Google Gemini API *(or alternative like Hugging Face)*

---

## 📁 Project Structure

```
project-root/
 ├── client/   # Next.js frontend
 ├── server/   # Express backend
```

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```
git clone <your-repo-url>
cd project-root
```

---

### 2. Setup Client

```
cd client
npm install
npm run dev
```

Client will run on:

```
http://localhost:3000
```

---

### 3. Setup Server

```
cd server
npm install
npm run dev
```

Server will run on:

```
http://localhost:5000
```

---

## 🔐 Environment Variables

Create `.env` file inside `server/`

```
PORT=5000
MONGODB_URI=your_mongodb_connection
GEMINI_API_KEY=your_api_key
```

---

## 🔄 API Connection

Frontend communicates with backend using:

```
http://localhost:5000
```

Make sure CORS is enabled on the server.

---

## 📌 Current Status

* Frontend UI in progress
* Backend setup completed
* AI integration in progress

---

## 🎯 Goal

Build a practical, production-ready AI tool for thumbnail generation that can be used in real-world applications.

---

## ⚠️ Notes

* Free AI APIs may have usage limits
* Some features may require paid API access

---

## 📄 License

This project is for learning and portfolio purposes.
