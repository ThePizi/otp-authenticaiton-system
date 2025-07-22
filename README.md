# 📲 OTP Authentication Service

A simple and scalable OTP authentication service built with **Node.js**, **Express**, **MongoDB**, and **Redis**, documented using **Swagger**, and containerized with **Docker**.

---

## 🛠️ Features

- ✅ OTP generation with cooldown (anti-spam)
- ✅ OTP verification
- ✅ JWT-based login (access + refresh tokens)
- ✅ User creation and lookup
- ✅ RESTful API with Swagger docs
- ✅ MongoDB for user persistence
- ✅ Redis for temporary OTP and rate-limiting
- ✅ Easy Docker setup

---

## 🚀 Getting Started

### 1. Clone the project

```bash
git clone https://github.com/yourusername/otp-auth-service.git
cd otp-auth-service
```

### 2.Create a .Env file
```env
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
OTP_EXPIRY=300
NODE_ENV=your_preferd_env
MONGODB_URI=mongodb://mongo:27017/db_name
PORT=3000
```

### 3.Run Docker Compose
```bash
docker compose up -d --build
```

### 4.You're Ready to Go!:

api url: http://localhost:3000/api
api documentation url: http://localhost:3000/api-docs
