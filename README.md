# Todo List Application

A full-stack todo list application built with React, TypeScript, Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Register and login with JWT tokens
- **Task Management**: Create, read, update, and delete tasks
- **User-specific Tasks**: Each user can only see and manage their own tasks
- **Modern UI**: Built with React and Tailwind CSS
- **Type Safety**: Full TypeScript support for both frontend and backend

## Tech Stack

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Frontend
- **React 19** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Vite** for build tooling

## Project Structure

```
todolist-app/
├── backend/
│   ├── controllers/
│   │   ├── userController.ts
│   │   └── taskController.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   ├── models/
│   │   ├── userModel.ts
│   │   └── taskModel.ts
│   ├── routes/
│   │   ├── userRoutes.ts
│   │   └── taskRoutes.ts
│   ├── server.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   │   └── AuthContext.tsx
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── TaskPage.tsx
│   │   ├── api.tsx
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
MONGO_URI=mongodb://localhost:27017/todolist
JWT_SECRET=your_jwt_secret_key_here
PORT=5000
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user

### Tasks (Protected Routes)
- `GET /api/tasks` - Get all tasks for the authenticated user
- `POST /api/tasks` - Create a new task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Usage

1. **Register/Login**: Create an account or login with existing credentials
2. **Add Tasks**: Use the input field to add new tasks
3. **Complete Tasks**: Click on a task to mark it as completed
4. **Delete Tasks**: Click the "Hapus" button to remove tasks
5. **Logout**: Click the logout button to sign out

## Environment Variables

### Backend (.env)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `PORT`: Server port (default: 5000)

## Development

### Backend Commands
- `npm run dev` - Start development server with ts-node
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server

### Frontend Commands
- `npm run dev` - Start development server with Vite
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Protected routes with middleware
- User-specific data access
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
