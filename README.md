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
2. **Navigate to the project directory**: `cd GoogleCalendarAPIReactSupabase`
3. **Install dependencies**: `npm install`
4. **Set up environment variables**: Create a `.env` file in the root directory and add the following:  
   `REACT_APP_SUPABASE_URL=your-supabase-url`  
   `REACT_APP_SUPABASE_KEY=your-supabase-key`  
 
5. **Start the development server**: `npm start`
6. **Access the application locally**: Open your browser and navigate to `http://localhost:3000`.

## Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Supabase for authentication
- **APIs**: Google Calendar API for fetching events
- **Deployment**: Vercel for hosting and deployment

## Folder Structure

```plaintext
src    # Reusable React components
├── pages/         # Main application pages
├── utils/         # Utility functions for API integration
├── App.js         # Root application component
├── index.js       # Application entry point
├── styles/        # Global and component-specific styles
