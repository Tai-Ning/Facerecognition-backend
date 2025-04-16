# Face Recognition API – Backend

This is the **backend API** for the Face Recognition Web App project.  
Built with **Node.js**, **Express**, and **PostgreSQL**, this server handles user registration, authentication, image submission, and integration with the Clarifai face detection API.

## Features

-  User registration & sign-in (with password hashing via bcrypt)
-  Face detection via Clarifai API
-  Tracks how many images each user has submitted
-  PostgreSQL database with Knex.js
-  Deployed on Render with environment variables

## Technologies Used

- Node.js
- Express
- Knex.js
- PostgreSQL
- bcrypt
- Clarifai API
- Render (deployment)

## 📦 Getting Started (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/Tai-Ning/facerecognition-backend.git
cd facerecognition-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Copy the example and fill in your secrets:

```bash
cp .env.example .env
```

Then edit `.env` and fill in:

```env
CLARIFAI_API_KEY=your_clarifai_api_key
DATABASE_URL=your_postgresql_connection_url
PORT=3000
```

### 4. Start the server

```bash
npm start
```

API should now be running on `http://localhost:3000`.



## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `CLARIFAI_API_KEY` | Your Clarifai personal access token (for face detection) |
| `DATABASE_URL` | PostgreSQL connection string (e.g. from Render) |
| `PORT` | Port number to run the server (default: 3000) |



## 📌 Notes

- This project separates frontend and backend for better scalability.
- Passwords are securely hashed using bcrypt.
- Ensure Clarifai API keys are stored safely and not exposed in frontend code.
