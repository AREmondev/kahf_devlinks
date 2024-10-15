# kahf_devlinks

## Project Description

Kahf DevLinks is a project that allows developers to create and manage their personal link-sharing pages, similar to Linktree but tailored for developers.

## Technologies and Dependencies

This project uses the following main technologies and npm packages:

- Next.js: React framework for building the frontend
- React: JavaScript library for building user interfaces
- TypeScript: Typed superset of JavaScript
- Tailwind CSS: Utility-first CSS framework
- React DnD: Drag and drop for React
- Axios: Promise-based HTTP client for making API requests
- [Add any other major dependencies you're using]

## Setup Instructions

### Prerequisites

- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/kahf_devlinks.git
   cd kahf_devlinks
   ```

2. Install dependencies:

   You have several options for installing dependencies:

   a. Install dependencies for both frontend and backend:

   ```
   npm run install-all
   ```

   This command will install dependencies for the main project, frontend, and backend.

   b. Install dependencies for frontend only:

   ```
   npm run install-frontend
   ```

   c. Install dependencies for backend only:

   ```
   npm run install-backend
   ```

   d. Install dependencies separately:

   For frontend:

   ```
   cd dev-links_front
   npm install
   ```

   For backend:

   ```
   cd dev-links_back
   npm install
   ```

3. Set up environment variables:

   For Frontend:

   - Navigate to the frontend directory:
     ```
     cd dev-links_front
     ```
   - Copy the `.env.example` file to `.env.local`:
     ```
     cp .env.example .env.local
     ```
   - Open the `.env.local` file and fill in the necessary values

   For Backend:

   - Navigate to the backend directory:
     ```
     cd dev-links_back
     ```
   - Copy the `.env.example` file to `.env`:
     ```
     cp .env.example .env
     ```
   - Open the `.env` file and fill in the necessary values

## Environment Variables

### Frontend (.env.local)

```plaintext
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1/
NEXT_PUBLIC_MEDIA_URL=http://localhost:8000
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000/api/auth
```

### Backend (.env)

```plaintext
NODE_ENV=development
PORT=8000
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
MONGODB_CLUSTER=your_mongodb_cluster
MONGODB_DATABASE=your_mongodb_database
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
```

Note: Ensure that you never commit your actual .env files to version control. The .env.example files should contain placeholder values and be committed instead.

## Running the Project

You can run the frontend and backend together or separately using the following npm scripts:

### Running Both Frontend and Backend

To start both the frontend and backend concurrently:

```
npm start
```

### Running Frontend Only

To start only the frontend development server:

```
npm run start-frontend
```

### Running Backend Only

To start only the backend server:

```
npm run start-backend
```

### Additional Scripts

- `npm run install-frontend`: Install dependencies for the frontend project only
- `npm run install-backend`: Install dependencies for the backend project only

## Development Workflow

1. Start both frontend and backend:

   ```
   npm start
   ```

2. The frontend will be available at `http://localhost:3000`
3. The backend API will be available at `http://localhost:8000`

Remember to keep both the frontend and backend running while developing your application.

## Additional Information

[Add any additional information, troubleshooting tips, or useful resources here]

## Contributing

[Add instructions for how others can contribute to your project]

## License

[Specify the license for your project]
