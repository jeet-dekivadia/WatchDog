# WatchDog - Content Verification Platform

WatchDog is a modern web application designed to verify the truthfulness of online content. It provides users with tools to analyze posts, report misinformation, and view verified content through an intuitive interface.

## Features

- User authentication and profile management
- Content verification using AI
- Misinformation reporting system
- Interactive dashboard
- Real-time analysis results
- Mobile responsive design

## Tech Stack

- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- AI Integration: OpenAI API
- Authentication: JWT
- Deployment: Vercel

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/watchdog.git
   cd watchdog
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both client and server directories
   - Fill in required environment variables

4. Start development servers:
   ```bash
   npm run dev
   ```

## Project Structure

The project follows a monorepo structure with separate client and server packages:

- `client/`: React frontend application
- `server/`: Node.js backend API
- `.github/`: GitHub Actions workflows
- `docs/`: Project documentation

## Deployment

The application is automatically deployed to Vercel through GitHub Actions. Any push to the main branch triggers a new deployment.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request
