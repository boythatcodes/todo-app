# todo-app
### [todo.sairashgautam.com.np](https://todo.sairashgautam.com.np/)

This is the backend side of the todo app. View frontend on the frontend.


**Project Overview**

A Todo App with CRUD operations, authentication, and filtering with beautiful UI.

---
**Tech Stack:** (Typescript)

- Backend: Node.js, Express, MySQL.
- Frontend: Vue, Pania (state management), tailwind, headlessui, Vue Router.
- Tools: Axios (API calls), Drizzle (orm), Zod (Schema Validation).

---
**Features Implemented:**
CRUD operations for Todos.

- User authentication (register/login) with custom session.
- Email Verification (sends email to verify email).
- Filtering Todos by Done, Upcoming, Missed status.
- Client-side and server-side validation for Todos.
- Beautiful UI (tailwindcss).
- Database persistence (MySQL/Mariadb).

----
**Authentication Flow:**
- **Registration:** User > POST `/user/create` > hashed password stored.
- **Email Validation:** Sends Email to your account to validate email.
- **Login :** User > POST `/auth/login` > session returned > stored in pania/localStorage.
- **Authorization:** Todos linked to user ID; server checks ownership on every operations.

----
**Validation:**
- **Client side:**
    - Required fields in formas are checked before send.
    - A streamlined flow structure with 1 source of truth.
- **Server side:** 
    - Zod is used to check in the middleware then the data is send to controller which ensures no runtime error.

----
**Challenges:**
- **Streamlinening Flow:**
    - Quite hard to make the flow understandable and have no side effect.
- **State Persistence:**
    - Using Pania with localStorage proved to have 2 source of truth so if not getting user data the session in localstorage has priority.

----
**Setup Instructions:**
    To install dependencies:
- **Docker:**
    - Update Environment variables.
    - Use `docker compose up --build` to build the whole app
- **Backend:**
    - Clone Repo.
    - Install the dependencies `bun install` 
    - Update .env example is set in .env.example
    - `bun run dev`
- **Frontend:**
    - `cd ./frontend` go to the frontend folder
    - Install the dependencies `bun install` 
    - Change the server url in .env
    - `bun run dev`

----
**Code Quality & Best Practices**

- ES6: Used arrow functions, async/await, destructuring.
- Security: Password hashing with bcrypt, custom session.
- Git: Meaningful commit messages (e.g., "feat: add auth middleware").

---
**Future Improvements:**
- Add pagination for Todo lists.
- Implement password reset functionality.
- Write unit tests (e.g., Jest for backend, Vue Test Utils).

