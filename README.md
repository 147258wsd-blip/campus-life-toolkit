# Campus Life Toolkit

A full-stack English-language portfolio and blog by Fu Zhenyu (Student ID: 24998018), focused on student-life projects. Visitors can browse projects and posts, register, comment, and send contact messages. An administrator can manage portfolio projects and blog posts.

## Technology

- Client: React, React Router, Context API, Vite, responsive CSS
- Server: Node.js, Express, Mongoose, MongoDB Atlas, JWT, bcrypt, Helmet
- Server structure: `models/`, `controllers/`, `routes/`, `middleware/`

## Live URLs

- Front end: **Pending deployment**
- Back end: **Pending deployment**

Replace both entries with actual public URLs before submitting this project.

## Run locally

1. Install Node.js and create an active MongoDB Atlas cluster.
2. Create an Atlas database user and add your current public IP to the project's Network Access list.
3. Copy `server/.env.example` to `server/.env`. Set `MONGODB_URI` to the Atlas driver URI, `JWT_SECRET` to a long random value, `CLIENT_ORIGIN=http://localhost:5173`, and `PORT=5000`. Do not commit `.env`.
4. In `server/`, run `npm install` and `npm run dev`. Wait for `API ready`.
5. Copy `client/.env.example` to `client/.env`; set `VITE_API_URL=http://localhost:5000`.
6. In `client/`, run `npm install` and `npm run dev`; open the displayed URL.
7. For an administrator account, set `ADMIN_USERNAME`, `ADMIN_EMAIL`, and a unique 12+ character `ADMIN_PASSWORD` in `server/.env`. In `server/`, run `node create-admin.js` once, then log in with those credentials. Public registration creates regular users who can comment but cannot manage projects.

## Environment variables

| Variable | Location | Meaning |
|---|---|---|
| `MONGODB_URI` | Server | Atlas connection URI with database name |
| `JWT_SECRET` | Server | Secret used to sign authentication tokens |
| `CLIENT_ORIGIN` | Server | Allowed browser origin for CORS |
| `PORT` | Server | API port; defaults to 5000 |
| `MONGODB_PROXY_HOST` | Server | Optional SOCKS5 proxy host for local Atlas connection |
| `MONGODB_PROXY_PORT` | Server | Optional SOCKS5 proxy port |
| `ADMIN_USERNAME` | Server | Initial administrator username |
| `ADMIN_EMAIL` | Server | Initial administrator email |
| `ADMIN_PASSWORD` | Server | Initial administrator password; 12+ characters |
| `VITE_API_URL` | Client | Full API origin, without `/api` |

## Prepared portfolio content

The English drafts for three project concepts and three blog posts are in `content/portfolio-content.md`. Structured versions are in `content/seed-content.json`. Repository and demo URLs are blank until real standalone tools exist. Once Atlas is reachable and the admin account exists, run `node seed-content.js` from `server/` to insert or update these six items.

## API

JSON request bodies are shown below. Protected requests require the header `Authorization: Bearer <token>`. Path parameters such as `:id` are MongoDB document IDs.

| Method | Endpoint | Purpose | Body / params | Access |
|---|---|---|---|---|
| POST | `/api/users/register` | Register a regular user | Body: `username`, `email`, `password` (6+ characters) | Public |
| POST | `/api/users/login` | Return JWT and user profile | Body: `email`, `password` | Public |
| GET | `/api/projects` | List all projects | None | Public |
| GET | `/api/projects/:id` | Get one project | Path: `id` | Public |
| POST | `/api/projects` | Create a project | Body: `title`, `description`; optional `imageUrl`, `repoUrl`, `liveUrl` | Admin |
| PUT | `/api/projects/:id` | Update a project | Path: `id`; body: project fields | Admin |
| DELETE | `/api/projects/:id` | Delete a project | Path: `id` | Admin |
| POST | `/api/contact` | Save a contact message | Body: `name`, `email`, `message` | Public |
| GET | `/api/blog` | List posts with author usernames | None | Public |
| GET | `/api/blog/:id` | Get a post and its comments | Path: `id` | Public |
| POST | `/api/blog` | Create a post | Body: `title`, `content` | Authenticated |
| PUT | `/api/blog/:id` | Update a post | Path: `id`; body: `title`, `content` | Author |
| DELETE | `/api/blog/:id` | Delete a post and comments | Path: `id` | Author |
| GET | `/api/blog/:postId/comments` | List post comments | Path: `postId` | Public |
| POST | `/api/blog/:postId/comments` | Add a comment | Path: `postId`; body: `body` | Authenticated |

## Deployment

Deploy `server/` to a Node.js host. Set the server environment variables there, and include the host's outbound IP in Atlas Network Access when possible. Deploy `client/` to a static host with `VITE_API_URL` set to the deployed API origin. Build the client with `npm run build`, publish `dist/`, and configure SPA fallback to `index.html`. Set `CLIENT_ORIGIN` to the exact deployed front-end origin. Check registration, login, projects, blog, comments, contact, and admin CRUD on the public URLs.

## Submission

Zip `server/`, `client/`, and this README as `24998018_FuZhenyu_CapstoneProject.zip`, substituting your actual ID and name. Exclude all `node_modules/`, `.env`, `.git/`, and build outputs. Submit the ZIP and both live URLs on Chaoxing.
