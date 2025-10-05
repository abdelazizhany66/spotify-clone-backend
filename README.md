# Spotify Clone Project

---

## Project Overview

This project is a full-featured backend application for managing users, songs, playlists, and rankings.
It uses **PostgreSQL** for persistent storage, **Redis** for caching and ranking, and is fully containerized with **Docker & Docker Compose**.
Swagger UI is included for **interactive API documentation**. Artist accounts use **2FA authentication** to ensure secure logins.

---

## Features

### 1. Authentication & Authorization

* User registration and login with **JWT tokens** (access and refresh tokens) using **Passport JWT strategy**.
* Password hashing with **bcrypt** for security.
* Role-based access control for admin and regular users.
* **Artist accounts** with **2FA authentication**.
* Automatic token refresh mechanism with refresh tokens stored in **Redis**.

### 2. Users Module

* CRUD operations for users.
* Upload user avatar using **Multer** for file handling (multipart/form-data).
* User profile management and retrieval.

### 3. Songs & Ranking

* Add, update, and delete songs.
* Store song plays in **Redis** for fast access.
* Generate **top songs rankings** using Redis sorted sets.
* Track user playlists.
* Database migrations for schema management.

### 4. Database Integration

* **PostgreSQL** used for persistent data (users, songs, playlists).
* NestJS TypeORM for ORM and database management, including migrations.
* Easy-to-configure environment variables for DB connection.

### 5. Caching

* **Redis** for storing frequently accessed data (rankings, session info, etc.)
* Supports fast read/write operations to reduce DB load.

### 6. API Documentation

* **Swagger UI** integrated at `/api` endpoint.
* Provides interactive documentation for all endpoints.
* Supports testing endpoints directly from browser.

### 7. Docker & Docker Compose

* Project fully containerized:

  * **App container**: NestJS backend
  * **Postgres container**: Relational database
  * **Redis container**: In-memory caching
* Easy setup and deployment with one command.

---

## Technologies

* **TypeScript** – Programming language
* **Node.js** – JavaScript runtime
* **NestJS** – Backend framework
* **PostgreSQL** – Relational database
* **Redis** – In-memory caching
* **Docker & Docker Compose** – Containerization
* **Swagger** – API documentation
* **TypeORM** – ORM for database operations, including migrations
* **JWT & bcrypt** – Authentication & password security
* **Passport JWT** – Strategy for JWT authentication
* **Multer** – File uploads handling
* **2FA** – Two-factor authentication for artist accounts

---

##  API Documentation & Endpoints

We provide interactive API documentation using **Swagger UI** which allows you to test all endpoints directly from your browser.

** Access Swagger UI:** http://localhost:3000/api

###  Available Endpoints

### Authentication

* **POST /auth/signup**
  Description: Sign up a new user.
  Body: CreateUserDto
 ![Swagger UI](./docs/signup.png)

* **POST /auth/login**
  Description: Log in a user.
  Body: LoginDto
  ![Swagger UI](./docs/login.png)

* **GET /auth/enable-2fa**
  Description: Get 2FA Secret.
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/enable2fa.png)


* **POST/auth/validate-2fa**
  Description: validate 2FA Secret in Google Authentication.
  Headers: Authorization: Bearer
  Body: { "towFASecret": "string" }
  ![Swagger UI](./docs/validate2fa.png)


* **POST /auth/refreshToken**
  Description: Refresh the authentication token.
  Body: { "refreshToken": "string" }
  ![Swagger UI](./docs/refreshtoken.png)

* **POST /auth/logout**
  Description: Log out the current user.
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/logout.png) 



### User

* **GET /users/profile**
  Description: Get user Profile.
  Headers: Authorization: Bearer 
  ![Swagger UI](./docs/get-profile.png)

* **POST /user/upload-avatar/:id**
  Description: upload avatar .
  Params: id
  Body: {avatar : file }
  Headers: Authorization: Bearer 
  ![Swagger UI](./docs/upload-image.png)




### Song

* **POST /songs**
  Description: Create New Song.
  Body: CreateSongDTO
  Headers: Authorization: Bearer 
  ![Swagger UI](./docs/create-song.png)

* **GET /songs**
  Description: Get All Songs 
  Query: Paginate {limit, page}.
  Headers: Authorization: Bearer 
  ![Swagger UI](./docs/get-all-song.png)

* **GET /songs/:id**
  Descripion: Get  specific song form Songs .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/get-specific-song.png)

* **PATCH/songs/:id**
  Descripion: update specific Song  .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/update-song.png)

* **DELETE/songs/:id**
  Descripion: delete specific Song  .
  Headers: Authorization: Bearer 
  ![Swagger UI](./docs/removesong.png)

* **POST/songs/:id/play**
  Dcescripion: add score to song play  .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/add-song-score.png)

* **GET/songs/:id/limit**
  Descripion: get item within a specific range  .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/git-limit-song.png)

* **GET/songs/:id/rank**
  Descripion: get song rank in songs  .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/song-rank.png)




### PlayList

* **POST/playlist**
  Description: Create a new playlist.
  Body: CreatePlaylistDto
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/create-Playlist.png)

* **GET/playlist/my-playlist**
  Description: Get only playlist .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/my-playlist.png)

* **POST/playlist/add-song/:songId**
  Description: add song to playlist .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/add-song-to-playlist.png)

* **DELETE/playlist/remove-song/:songId**
  Description: remove song from playlist .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/remove-song-from-playlist.png)



### Artist

* **POST/playlist/remove-song/:songId**
  Description: when artist login return link 2FA validate .
  Headers: Authorization: Bearer
  ![Swagger UI](./docs/when-artist-login.png)

* **GET /artists/convert-to-artist**
  Description: Convert A Normal User To Artist  .
  Body: CreateArtistDto
  Headers: Authorization: Bearer 
  ![Swagger UI](./docs/upgrade-to-artist.png)


  Headers: Authorizatio[n: Bea](https://www.docker.com/get-started)rer[ ](https://docs.docker.com/compose/install/)


---
### Prerequisites

Make sure you have the following installed on your system:

* **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
* **Docker** - [Get Docker](https://www.docker.com/get-started)  
* **Docker Compose** - [Install guide](https://docs.docker.com/compose/install/)

### Installation

```bash
# Clone the repository
git clone https://github.com/abdelazizhany66/spotify-clone-backend
cd spotify-clone-backend
```

### Setting Up a .env File

Create a `.env` file in the root directory and add the following parameters:

```env
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_USERNAME=your_database_username
DB_PASSWORD=your_database_password
DB_DATABASE=your_database_name

JWT_SECRET=your_jwt_secret
ACCESSTOKEN_LIFETIME=access_token_lifetime_in_seconds
REFRESHTOKEN_LIFETIME=refresh_token_lifetime_in_seconds
REFRESH_TOKEN_SECRET=your_refresh_token_secret

REDIS_PASSWORD=your_redis_password
REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port
```

Replace the placeholders with your actual credentials.

### Install Dependencies

```bash
npm install
```

## Docker Commands

### Development
```bash
# Start development environment
docker-compose -f docker-compose.yml -f docker-compose-dev.yml up -d --build

# Stop development environment  
docker-compose -f docker-compose.yml -f docker-compose-dev.yml down

# View logs
docker-compose -f docker-compose.yml -f docker-compose-dev.yml logs -f app
```

### Production
```bash
# Start production environment
docker-compose -f docker-compose.yml -f docker-compose-prod.yml up -d --build

# Stop production environment
docker-compose -f docker-compose.yml -f docker-compose-prod.yml down
```

The application will run at **http://localhost:3000**.