# Calendar App Assignment

This project is a web application built to demonstrate Google SSO login, Google Calendar event integration, and event filtering functionality. The application is designed with a clean, responsive user interface for an optimal user experience.

## Features

- **Google SSO Login**: Secure Single Sign-On using Google for user authentication.
- **Google Calendar Event Display**: Fetch and display user-specific Google Calendar events in a table format. Events are sorted by the most recent first.
- **Date Filter**: Users can filter events by selecting a specific date.
- **Responsive Design**: Fully optimized for both mobile and desktop devices.

## Deployment

The application has been deployed and is accessible at the following link: [Calendar App - Deployed Link](https://calendar-app-7a4n.vercel.app/)

## How to Run the Project Locally

1. **Clone the repository**: `git clone <repository-url>`
2. **Navigate to the project directory**: `cd calendar-app`
3. **Install dependencies**: `npm install`
4. **Set up environment variables**: Create a `.env` file in the root directory and add the following:  
   `REACT_APP_SUPABASE_URL=your-supabase-url`  
   `REACT_APP_SUPABASE_KEY=your-supabase-key`  
   `REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id`  
   `REACT_APP_GOOGLE_API_KEY=your-google-api-key`
5. **Start the development server**: `npm start`
6. **Access the application locally**: Open your browser and navigate to `http://localhost:3000`.

## **Important Note**

While signing in with Google, you may encounter the following warning message:  
**"Google hasn’t verified this app. The app is requesting access to sensitive info in your Google Account. Until the developer (srivastavasuvigya@gmail.com) verifies this app with Google, you shouldn't use it."**

- To proceed, click on **"Go to vuacldbohptgllwdlzuv.supabase.co (unsafe)"** under the "Advanced" options.


For any issues or further clarifications, feel free to reach out to the developer at **suvigyasrvstva@gmail.com**.

## Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Supabase for authentication
- **APIs**: Google Calendar API for fetching events
- **Deployment**: Vercel for hosting and deployment

## Folder Structure

```plaintext
src/
├── components/    # Reusable React components
├── pages/         # Main application pages
├── utils/         # Utility functions for API integration
├── App.js         # Root application component
├── index.js       # Application entry point
├── styles/        # Global and component-specific styles
