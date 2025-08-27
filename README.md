# Zylo Trading Dashboard

A modern, responsive trading dashboard application built with React and TypeScript. This application provides comprehensive portfolio management, market analysis, and real-time trading alerts for professional traders and investors.

## Features

### 🎯 **Core Functionality**
- **Portfolio Management**: Track holdings, performance, and real-time valuations
- **Market Analysis**: Real-time market data, indices, and sector performance
- **Trading Alerts**: IPO alerts, dividend notifications, and price targets
- **Market Timing**: Pre-market, regular hours, and after-hours session tracking
- **Multi-Currency Support**: Display values in USD, EUR, GBP, JPY, CAD, AUD, CHF
- **Global Timezone Support**: Including EST, IST, GMT, CET, JST, CST, and more

### 🔐 **Security & Authentication**
- Secure authentication with Supabase
- Password management and account security
- Session timeout controls
- Two-factor authentication support

### 🎨 **User Experience**
- Light/Dark theme support with full color inversion
- Responsive glass-morphism UI design
- Real-time notifications and alerts
- Comprehensive settings management
- PDF export for account data and reports

### 📊 **Analytics & Reporting**
- Portfolio performance tracking
- Market trend analysis
- Account data export (PDF format)
- Trading history and transaction logs

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui
- **Backend**: Supabase for authentication and data management
- **State Management**: React Context for global settings
- **Charts**: Recharts for data visualization
- **PDF Generation**: jsPDF for report exports
- **Date Handling**: date-fns with timezone support

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```sh
   git clone <your-repository-url>
   cd zylo-trading-dashboard
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Environment Setup**
   ```sh
   # Copy the example environment file
   cp .env.example .env
   
   # Configure your environment variables
   # Add your Supabase URL and API keys
   ```

4. **Start development server**
   ```sh
   npm run dev
   ```

5. **Open your browser**
   ```
   Navigate to http://localhost:5173
   ```

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── hooks/              # Custom React hooks
├── integrations/       # Third-party service integrations
├── lib/                # Utility functions and helpers
├── pages/              # Application pages/routes
├── utils/              # Helper utilities
└── ...
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Deployment

### Production Build
```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory, ready for deployment to any static hosting service.

### Deployment Options
- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **AWS S3**: Upload the build files to an S3 bucket with static hosting
- **GitHub Pages**: Use GitHub Actions for automated deployment

## API Integration

The application is designed to work with RESTful APIs and includes:

- Authentication endpoints integration
- Real-time market data connections
- Portfolio data synchronization
- Alert management systems

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

---

**Zylo Trading Dashboard** - Professional trading tools for modern investors.