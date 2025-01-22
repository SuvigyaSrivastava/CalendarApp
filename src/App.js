import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

function App() {
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const session = useSession();
  const supabase = useSupabaseClient();
  const { isLoading } = useSessionContext();

  useEffect(() => {
    if (session && !isLoading) {
      fetchEvents();
    }
  }, [session, isLoading]);

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
        redirectTo: 'https://calendar-app-eta-nine.vercel.app',
      },
    });
    if (error) {
      alert('Error logging in to Google provider with Supabase');
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function createCalendarEvent() {
    const event = {
      summary: eventName,
      description: eventDescription,
      start: {
        dateTime: start.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
    };
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    })
      .then((data) => data.json())
      .then(() => {
        alert('Event created successfully!');
        fetchEvents();
        setIsModalOpen(false); // Close the modal
      });
  }

  async function fetchEvents() {
    await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + session.provider_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          const sortedEvents = data.items.sort(
            (a, b) => new Date(b.start.dateTime || b.start.date) - new Date(a.start.dateTime || a.start.date)
          );
          setEvents(sortedEvents);
          setFilteredEvents(sortedEvents);
        } else {
          console.log('No events found');
        }
      })
      .catch((error) => {
        console.log('Error fetching events:', error);
      });
  }

  // Filter Events by Date
  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
    if (e.target.value) {
      const filtered = events.filter((event) =>
        new Date(event.start.dateTime || event.start.date).toISOString().startsWith(e.target.value)
      );
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  };

  // Export Events to CSV
  function exportToCSV() {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Event Name,Date,Time,Description']
        .concat(
          filteredEvents.map((event) =>
            [
              event.summary,
              new Date(event.start.dateTime || event.start.date).toLocaleDateString(),
              new Date(event.start.dateTime || event.start.date).toLocaleTimeString(),
              event.description || '',
            ].join(',')
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'google_calendar_events.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6">
        {session ? (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Welcome, {session.user.email}
            </h2>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Your Events</h3>
              <div className="flex space-x-4">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  onClick={() => setIsModalOpen(true)}
                >
                  Add Event
                </button>
                <button
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                  onClick={exportToCSV}
                >
                  Export CSV
                </button>
              </div>
            </div>
            <div className="mb-4">
              <input
                type="date"
                value={filterDate}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded-md p-2 w-full"
                placeholder="Filter by date"
              />
            </div>
            <ul className="space-y-4">
              {filteredEvents.map((event) => (
                <li key={event.id} className="bg-gray-100 p-3 rounded-md shadow-sm">
                  <p className="font-medium text-gray-800">{event.summary || 'No Title'}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
            <button
              className="mt-6 w-full bg-red-600 text-white font-medium py-2 rounded-md hover:bg-red-700"
              onClick={signOut}
            >
              Sign Out
            </button>
          </>
        ) : (
          <div className="text-center">
            <button
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700"
              onClick={googleSignIn}
            >
              Sign In With Google
            </button>
          </div>
        )}
      </div>

      {/* Modal for Adding Event */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Add New Event</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Event Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Event Description</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) => setEventDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Start Time</label>
                <input
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) => setStart(new Date(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">End Time</label>
                <input
                  type="datetime-local"
                  className="w-full border border-gray-300 rounded-md p-2"
                  onChange={(e) => setEnd(new Date(e.target.value))}
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={createCalendarEvent}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
