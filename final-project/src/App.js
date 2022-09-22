// import logo from './logo.svg';
import './App.css';
import Bar from './components/Layout/Bar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Student from './components/Student/Student';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import AuthContext from './store/auth-context';
import { useContext } from 'react';
import { GlobalProvider } from './context/GlobalState';
import AddStudent from './components/Student/AddStudent';
import ListStudent from './components/Student/ListStudent';
import EditStudent from './components/Student/EditStudent';

function App() {

  const authCtx = useContext(AuthContext);
  return (
    <div>
      <GlobalProvider>
      <Bar />
      <Routes>
        <Route path='/' exact element={<HomePage />} />
          {
            !authCtx.isLoggedIn &&
            (
              <Route path='auth' element={<AuthPage />} />
            )
          }
          <Route path="student" element={!authCtx.isLoggedIn ? <Navigate to="/auth" /> : <Student />}>
            <Route path='add' element={<AddStudent />} />
            <Route path='list' element={<ListStudent />} />
            <Route path="edit/:id" element={<EditStudent />} />
          </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </GlobalProvider>
    </div>
  );
}

export default App;
