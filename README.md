# FitMonolith 🏋️

### Track Smarter. Train Better. Evolve Stronger.

**FitMonolith** is an AI-powered fitness tracking platform designed to help users monitor their physical activities, manage their fitness journey, and receive intelligent workout recommendations.

Built with **Next.js and Java Spring Boot**, the application combines modern frontend development, secure authentication, REST API integration, and locally hosted AI to deliver a personalized fitness experience.

---

## ✨ Features

- **User Authentication:** Secure user registration and login with JWT-based authentication.
- **Activity Tracking:** Log and manage activities such as running, walking, cycling, swimming, yoga, HIIT, and weight training.
- **Activity History:** View individual activity details, including duration, calories burned, timestamps, and activity-specific metrics.
- **AI-Powered Recommendations:** Generate personalized, activity-based fitness recommendations.
- **Recommendation Management:** Explore recommendations covering performance, form improvement, recovery, endurance, and safety.
- **User Profile:** View and manage personal profile information.
- **Responsive UI:** Modern, responsive interface designed for desktop, tablet, and mobile devices.

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 16 | React framework |
| React 19 | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| Ant Design | UI components |
| Redux Toolkit | Global state management |
| TanStack Query | Server-state management |
| Axios | HTTP requests |
| React Hook Form | Form management |
| Lucide React | Icons |

### Backend
| Technology | Purpose |
|---|---|
| Java | Backend programming |
| Spring Boot | REST API development |
| Spring Security | Application security |
| JWT | Authentication and authorization |
| Spring Data JPA / Hibernate | Database interaction |
| MySQL | Relational database |

### AI Integration
| Technology | Purpose |
|---|---|
| Ollama | Local AI model runtime |
| Qwen3 (1.7B) | AI-powered recommendation generation |

---

## 🏗️ Architecture

FitMonolith follows a **monolithic backend architecture**, with a separately developed Next.js frontend communicating with the Spring Boot backend through REST APIs.

```text
                 ┌──────────────────────┐
                 │      Next.js         │
                 │      Frontend        │
                 └──────────┬───────────┘
                            │
                       REST APIs
                            │
                 ┌──────────▼───────────┐
                 │    Spring Boot       │
                 │      Backend        │
                 └──────┬────────┬─────┘
                        │        │
                 ┌──────▼───┐ ┌──▼──────────┐
                 │  MySQL   │ │   Ollama    │
                 │ Database │ │  Qwen3 1.7B │
                 └──────────┘ └─────────────┘
```

---

## 📸 Screenshots

Screenshots of the application will be added here.

| Dashboard | Activities |
|---|---|
| Coming soon | Coming soon |

| Recommendations | User Profile |
|---|---|
| Coming soon | Coming soon |

---

## 🚀 Getting Started

Follow these instructions to run the frontend locally.

### Prerequisites

Make sure you have the following installed:

- Node.js 20 or later
- npm
- Git

The Spring Boot backend, MySQL database, and Ollama are required for full application functionality.

### 1. Clone the repository

```bash
git clone https://github.com/D-a-k-s-h/Fitness-Monolith.git
```

### 2. Navigate to the frontend directory

```bash
cd Fitness-Monolith
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the frontend root directory and configure the backend API base URL using the environment variable expected by your Axios configuration.

Do not commit environment files containing credentials or secrets.

### 5. Start the development server

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

### 6. Production build

To create and run a production build:

```bash
npm run build
npm run start
```

---

## 🤖 AI Recommendation Engine

FitMonolith integrates a locally hosted AI model through Ollama to generate activity-based fitness recommendations.

The recommendation engine is designed to provide insights such as:

- Performance improvement suggestions.
- Workout and form improvement guidance.
- Recovery recommendations.
- Endurance development suggestions.
- Fitness and workout safety considerations.

The backend communicates with the locally hosted Ollama model and processes the generated recommendations for the frontend.

---

## 🔐 Security

- JWT-based authentication.
- Protected application routes.
- Authorization through authenticated API requests.
- Backend-side request validation.
- User-specific activity and recommendation access.

---

## 🗺️ Future Improvements

- Advanced fitness analytics and activity trends.
- Improved application performance and loading experience.
- Enhanced recommendation quality.
- Additional fitness tracking capabilities.
- Expanded testing and deployment automation.

---

## 👨‍💻 Author

**Daksh K.**

- GitHub: [@D-a-k-s-h](https://github.com/D-a-k-s-h)
- Project Repository: [Fitness-Monolith](https://github.com/D-a-k-s-h/Fitness-Monolith)

---

## 📄 License

This project is currently developed as a personal learning and portfolio project.

A formal open-source license can be added when the project is ready for distribution.

---

⭐ If you find this project interesting, consider giving the repository a star!
