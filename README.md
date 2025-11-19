# QRify - Advanced QR Code Generator & Manager

A modern, full-stack web application for creating, customizing, and managing QR codes with advanced tracking capabilities.

## 🚀 Features

### ✅ **Completed Features**

- **Dynamic & Static QR Codes** - Create trackable dynamic QRs or simple static ones
- **Advanced QR Customization** - Frames, shapes, logos, colors, and quality levels
- **QR Code Management** - Full CRUD operations for your QR codes
- **Analytics Dashboard** - Comprehensive stats and scan tracking
- **Template System** - Save and reuse custom QR designs
- **Multi-Format Support** - Website URLs, PDFs, Images, vCards, Videos, and more

### 🚧 **In Development**

- **Bulk QR Generation** - Upload CSV files to create multiple QR codes
- **User Management** - Admin panel for user administration
- **Enhanced Settings** - Profile management and preferences
- **Landing Page Polish** - Hero section improvements

## 🛠 Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **React Router** for navigation
- **Lucide Icons** for iconography

### Backend

- **Node.js** with TypeScript
- **Express.js** framework
- **Prisma ORM** with PostgreSQL
- **JWT** authentication
- **QR code generation** libraries

### Database

- **PostgreSQL** (Neon.tech cloud hosting)
- **Prisma** for database management

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database

### Clone Repository

```bash
git clone https://github.com/Purplemerit/qrify-app.git
cd qrify-app
```

### Backend Setup

```bash
cd server
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database URL and JWT secret

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

### Frontend Setup

```bash
cd client
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API URL

# Start development server
npm run dev
```

## 🔧 Environment Variables

### Client `.env`

```env
# API Base URL
VITE_API_URL=http://localhost:4000

# Environment
NODE_ENV=development
```

### Server `.env`

```env
PORT=4000
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=15m
CLIENT_URL=http://localhost:8080
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/qrify"
```

## 📁 Project Structure

```
qrify-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and helpers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── services/      # API service layer
│   │   └── types/         # TypeScript type definitions
│   ├── public/            # Static assets
│   └── package.json
├── server/                # Node.js backend
│   ├── src/
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Express middleware
│   │   ├── lib/           # Utilities and helpers
│   │   └── config/        # Configuration files
│   ├── prisma/            # Database schema and migrations
│   └── package.json
└── README.md
```

## 🎯 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/me` - Get current user

### QR Codes

- `GET /qr` - List user's QR codes
- `POST /qr/url` - Create website QR code
- `GET /qr/:id` - Get QR code details
- `PUT /qr/:id` - Update QR code
- `DELETE /qr/:id` - Delete QR code
- `GET /qr/:id/image` - Get QR code image

### Analytics

- `GET /scan/:slug` - Redirect and track scan
- `GET /qr/:id/stats` - Get QR code statistics

### Templates

- `GET /templates` - List templates (client-side storage)
- `POST /templates` - Create template (client-side storage)

## 🔑 Key Features Explained

### Dynamic vs Static QR Codes

- **Dynamic QRs**: Redirect through our server, allowing content updates and scan tracking
- **Static QRs**: Contain the final URL directly, no tracking but work offline

### QR Customization Options

- **Frames**: 10+ decorative frames (Card, Scooter, Juice, etc.)
- **Shapes**: Square, Rounded, Dots, Circle patterns
- **Logos**: Custom logo integration
- **Quality Levels**: Error correction levels for reliability
- **Colors**: Background and foreground color customization

### Template System

- Save frequently used design combinations
- Apply templates to new QR codes instantly
- Local storage based (no server storage required)

## 🚦 Development Status

| Feature       | Status         | Completion |
| ------------- | -------------- | ---------- |
| QR Generation | ✅ Complete    | 100%       |
| QR Management | ✅ Complete    | 100%       |
| Analytics     | ✅ Complete    | 100%       |
| Templates     | ✅ Complete    | 100%       |
| Hero Section  | 🚧 In Progress | 60%        |
| UI Polish     | 🚧 In Progress | 70%        |
| Bulk QR       | 📋 Planned     | 20%        |
| Settings      | 🚧 In Progress | 40%        |
| User Admin    | 📋 Planned     | 30%        |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Developer**: Purplemerit
- **Repository**: [qrify-client](https://github.com/Purplemerit/qrify-client)

## 🔗 Links

- **Live Demo**: [Coming Soon]
- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/Purplemerit/qrify-client/issues)

## 📞 Support

For support, email support@qrify.app or create an issue on GitHub.

---

**Built with ❤️ by Purplemerit**
