# Request Submit Form

An Angular-based request submission application with multi-section forms, auto-save functionality, and modern UI components.

## 🚀 Live Demo

Check out the live demo: [https://edan-daynmic-form.netlify.app/](https://edan-daynmic-form.netlify.app/)

## Features

- **Multi-Section Request Flow**: Navigate through multiple sections of questions with progress tracking
- **Auto-Save with Retry Logic**: Automatic form saving with intelligent retry mechanism (up to 2 retries)
- **Real-time Save Status**: Inline status indicator showing save progress, errors, and success states
- **Custom Form Components**: Reusable form fields including text, number, radio, and toggle inputs
- **Responsive Design**: Modern UI built with Tailwind CSS
- **Type-Safe**: Built with TypeScript for robust type checking

## Tech Stack

- **Framework**: Angular 18+ (Standalone Components)
- **Styling**: Tailwind CSS
- **Font**: Gilroy
- **State Management**: Angular Signals
- **HTTP**: RxJS Observables
- **Testing**: Jasmine & Karma

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install Tailwind CSS (if not already installed)
npm install -D tailwindcss postcss autoprefixer
```

### Development Server

```bash
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

```bash
# Development build
npm run build

# Production build
npm run build --configuration production
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage
```

## Key Components

### Request Flow

1. **Request Start**: User selects a request schema
2. **Request Question**: User answers questions across multiple sections
   - Auto-save on field changes (500ms debounce)
   - Retry mechanism on failures
   - Real-time save status
3. **Request Complete**: Summary of answers and completion confirmation

## Auto-Save Features

- **Debouncing**: 500ms delay before saving
- **Retry Logic**: Automatic retry up to 2 times on failure
- **Status Indicators**:
  - 🔄 "Saving..." - Initial save attempt
  - ⚠️ "Error" - Save failed
  - 🔄 "Retrying..." - Preparing to retry
  - ✅ "Saved" - Successfully saved

## Fonts

The application uses **Gilroy** as the primary font family. Font files should be placed in `/public/fonts/` directory:

- Gilroy-Light.ttf/woff/woff2
- Gilroy-Regular.ttf/woff/woff2
- Gilroy-Medium.ttf/woff/woff2
- Gilroy-SemiBold.ttf/woff/woff2
- Gilroy-Bold.ttf/woff/woff2

## Configuration

### Tailwind Configuration

Custom configuration is available in `tailwind.config.js` for colors, fonts, and other design tokens.

### Angular Configuration

Main configuration file: `angular.json`
