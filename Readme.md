# 🎬 Project: Movie Review Platform

### 🧱 1. **Core Features**

| Feature | Description |
|--------|-------------|
| Movie Browser | Browse/filter movies by genre, year, rating, etc. |
| Reviews & Comments | Users can leave reviews, rate movies, and view others' feedback |
| Auth System | JWT-based login/signup with session tracking |
| Admin Moderation | Flag, delete, or approve comments |
| Theater Locator (Optional) | Map-based view of nearby theaters |
| Semantic Search (Stretch) | Search movies by plot using embeddings |

---

## 🧠 2. **Architecture Overview**

### 🧩 Tech Stack

| Layer | Tech |
|------|------|
| Frontend | React + TypeScript + Tailwind (or Chakra UI) |
| Backend | Node.js + Express + TypeScript |
| Database | MongoDB Atlas (`sample_mflix`) |
| Auth | JWT + bcrypt |
| Dev Tools | ESLint, Prettier, Husky, Vitest or Jest |
| Deployment | Vercel (frontend), Render or Railway (backend) |

---

## 🗂️ 3. **Data Modeling**

### MongoDB Collections

- `movies`: source of truth for movie metadata  
- `comments`: user reviews (linked via `movie_id`)  
- `users`: auth and profile data  
- `sessions`: optional JWT metadata  
- `theaters`: optional geospatial data  
- `embedded_movies`: optional for semantic search

### Example Schema: `comments`

```ts
interface Comment {
  _id: ObjectId;
  movie_id: ObjectId;
  user_id: ObjectId;
  text: string;
  rating: number; // 1–5
  flagged: boolean;
  created_at: Date;
}
```

---

## ⚙️ 4. **Backend API Design**

### RESTful Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `GET` | `/api/movies` | List/filter movies |
| `GET` | `/api/movies/:id` | Movie details + reviews |
| `POST` | `/api/comments` | Add review |
| `GET` | `/api/comments/:movieId` | Get reviews for a movie |
| `POST` | `/api/auth/login` | Login |
| `POST` | `/api/auth/signup` | Signup |
| `POST` | `/api/comments/:id/flag` | Flag a comment |
| `DELETE` | `/api/comments/:id` | Admin delete |

Use middleware for auth, rate limiting, and validation.

---

## 🖥️ 5. **Frontend UX Flow**

- **Home Page**: Movie grid with filters  
- **Movie Detail Page**: Metadata + reviews + add comment  
- **Login/Signup Modal**: Auth flow  
- **User Dashboard**: View/edit own reviews  
- **Admin Panel**: Moderate flagged comments  
- **Optional Map View**: Theaters near user (Leaflet.js or Mapbox)

---

## 🧪 6. **Testing & Validation**

- Unit tests for API routes (Vitest or Jest)  
- Integration tests for review submission and auth  
- Schema validation with Zod or Joi  
- E2E testing with Playwright or Cypress (stretch)

---

## 🚀 7. **Stretch Goals**

- **Semantic Search**: Use `embedded_movies` + vector search to find movies by plot  
- **LLM Summarizer**: Auto-summarize reviews or generate movie synopses  
- **User Roles**: Admin vs. regular users  
- **Dark Mode & Accessibility**: Tailwind plugins or Chakra UI

