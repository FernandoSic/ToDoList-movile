import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Box, CircularProgress } from '@mui/material';
import BottomNav from './components/Navbar';
import Header from './components/Header';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import TaskDetail from './pages/TaskDetail';

const ProtectedRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  if (!isAuth) return <Navigate to="/login" />;

  return children;
};

const PublicRoute = ({ children }) => {
  const { isAuth, loading } = useAuth();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isAuth) return <Navigate to="/" />;

  return children;
};

function App() {
  const { isAuth } = useAuth();

  return (
    <BrowserRouter>
      {isAuth && <Header />}
      <Box
        sx={{
          pt: isAuth ? { xs: 2, sm: 3 } : 0,
          pb: isAuth ? { xs: 10, sm: 12 } : { xs: 0, sm: 0 },
          px: { xs: 1.5, sm: 3 },
          maxWidth: 1200,
          mx: 'auto',
          width: '100%'
        }}
      >
        <Routes>
        
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TaskList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/add"
          element={
            <ProtectedRoute>
              <AddTask />
            </ProtectedRoute>
          }
        />

        <Route
          path="/tasks/:id"
          element={
            <ProtectedRoute>
              <TaskDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
      </Box>
      {isAuth && <BottomNav />}
    </BrowserRouter>
  );
}

export default App;

