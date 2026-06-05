# User Preferences App

A responsive React-based User Preferences application that allows users to view and update their account settings through a REST API. The application demonstrates frontend development, API integration, responsive design, state management, and integration testing.

---

## Features

* View user preferences from a REST API
* Update and save user preferences
* Light and Dark theme support
* Responsive design for mobile, tablet, and desktop screens
* Real-time theme switching
* Loading and success states
* Integration tests for API interaction and UI behavior
* Mock backend API using JSON Server

---

## Technologies Used

### Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

### Backend (Mock API)

* JSON Server

### Testing

* Vitest
* React Testing Library
* Jest DOM
* User Event

---

## Project Structure

```text
user-preferences-app/
│
├── db.json
├── package.json
├── vite.config.js
│
├── screenshots/
│   ├── desktop.png
│   ├── tablet.png
│   └── mobile.png
│
└── src/
    ├── components/
    │   ├── UserPreferences.jsx
    │   └── UserPreferences.test.jsx
    │
    ├── services/
    │   └── api.js
    │
    ├── test/
    │   └── setup.js
    │
    ├── App.jsx
    ├── App.css
    ├── index.css
    └── main.jsx
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project directory:

```bash
cd user-preferences-app
```

Install dependencies:

```bash
npm install
```

---

## Running the Mock API

Start the JSON Server:

```bash
npm run api
```

The API will be available at:

```text
http://localhost:3001/preferences
```

---

## Running the Application

Start the React application:

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

in your browser.

---

## Running Tests

Execute the integration tests:

```bash
npm test
```

Current test coverage includes:

* Loading user preferences from the API
* Editing preference values
* Saving updated preferences back to the API

---

## API Example

### GET /preferences

Response:

```json
{
  "id": 1,
  "displayName": "Asta",
  "language": "Spanish",
  "emailNotifications": false,
  "theme": "dark"
}
```

### PUT /preferences

Updates the stored preferences.

---

## Responsive Design

The application is optimized for:

* Desktop
* Tablet
* Mobile

Screenshots demonstrating responsiveness can be found in the `screenshots` folder.

---
