# Ahaar Setu 🍱

Aahaar Setu is a web platform that connects food donors with those in need, helping to reduce food waste and combat hunger in communities. Built with modern web technologies and a focus on user experience, it serves as a bridge between surplus food and hunger.

## Features 🌟

- **Food Donation Management**: Easy-to-use interface for donors to list available food items
- **Real-time Tracking**: Monitor donation status and pickups in real-time
- **Community Hub**: Connect with other donors, volunteers, and organizations
- **Location Services**: Find nearby donation opportunities and recipients
- **User Profiles**: Dedicated interfaces for donors, recipients, and volunteers
- **Reward System**: Gamified experience with points and rewards for active donors
- **Quality Assurance**: Food safety verification and quality control measures

## Tech Stack 💻

### Frontend 🎨
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router
- **Maps Integration**: Leaflet
- **Build Tool**: Vite

### Backend 🔧
- **Runtime**: Node.js
- **Framework**: Express.js
- **Authentication**: Firebase Auth
- **Real-time Updates**: Socket.IO
- **API Documentation**: Swagger/OpenAPI
- **Task Queue**: Bull

### Database 🗄️
- **Primary Database**: MongoDB
- **Caching**: Redis
- **Search Engine**: Elasticsearch
- **File Storage**: Firebase Storage

### DevOps & Infrastructure 🚀
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel (Frontend), Railway (Backend)
- **Monitoring**: Sentry
- **Analytics**: Firebase Analytics

## Getting Started 🚀

### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ahaar-setu.git
cd ahaar-setu
```

2. Install dependencies
```bash
npm install
# or
bun install
```

3. Set up environment variables
```bash
cp .env.example .env
# Add your Firebase and other configuration details
```

4. Start the development server
```bash
npm run dev
# or
bun dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure 📁

### Frontend Structure
```
src/
├── components/     # Reusable UI components
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── lib/            # Utility functions and configurations
├── pages/          # Page components
└── assets/         # Static assets
```

### Backend Structure
```
server/
├── api/           # API routes and controllers
├── config/        # Environment configurations
├── middleware/    # Custom middleware functions
├── models/        # Database models and schemas
├── services/      # Business logic and external services
├── utils/         # Helper functions and utilities
└── websocket/     # Real-time communication handlers
```

### Database Schema
```
Collections:
├── users/         # User profiles and preferences
├── donations/     # Food donation listings
├── claims/        # Donation claims and status
├── organizations/ # Partner organization details
├── reviews/       # Feedback and ratings
└── rewards/       # Points and rewards data
```

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Update documentation as needed
- Add tests for new features

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments 🙏

- Thanks to all contributors who have helped shape Ahaar Setu
- Special thanks to the open-source community for the amazing tools and libraries
- Inspired by the need to reduce food waste and help those in need

## Contact 📧

For questions or feedback, please reach out to our team through the [Community Hub](https://ahaar-setu.vercel.app/community) or open an issue on GitHub.

---

Made with ❤️ in India | [Website](https://ahaar-setu.vercel.app) | [Report an Issue](https://github.com/yourusername/ahaar-setu/issues)
