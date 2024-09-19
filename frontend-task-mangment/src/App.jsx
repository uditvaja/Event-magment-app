import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventDetails from './components/EventDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import EditEventForm from './components/EditEventForm';
import CreateEventForm from './components/CreateEventForm';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes> {/* Use Routes instead of Switch */}
          <Route path="/" element={<Home />} /> {/* Use element prop */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/events/create" element={<CreateEventForm />} />
          <Route path="/events/edit/:id" element={<EditEventForm />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
