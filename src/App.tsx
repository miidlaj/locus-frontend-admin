import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import User from './routes/User';
import NotFoundPage from './pages/error/NotFoundPage';
import UnauthorizedPage from './pages/error/UnauthorizedPage';
import { AuthGuard } from './guards/AuthGuard';
import LoginPage from './pages/login/LoginPage';
import { Role } from './model/Role';

function App() {
  return (
    <BrowserRouter>
      
        <div className="">
          <Routes>

            <Route path='/'element={
              <AuthGuard roles={[Role.ADMIN]}>
                <User/>
              </AuthGuard>
            
            } />

            <Route path='/login'element={<LoginPage/>} />
            <Route path='/404'element={<NotFoundPage/>} />
            <Route path='/401'element={<UnauthorizedPage/>} />
            <Route path='/*'element={<NotFoundPage/>} />
          </Routes>

        </div>
    </BrowserRouter>
  );
}

export default App;
