import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";
import Form from "./Components/Form"
import BookList from './Components/BookList';
import LogIn from './Components/LogIn';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SignUp from './Components/SignUp';
import { useEffect, useState } from "react";
import { getToken } from "./Services/Configs";
import { AuthContextProvider } from "./Hooks/Contexts/authContext"
import { AuthGuard } from "./Components/Guards/AuthGuard"
import { AdminGuard } from './Components/Guards/AdminGuard';
import AppLayout from "./Layouts/AppLayout"
import BookPage from './Components/BookDetails';
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
  palette: {
    primary: {
      main: "#31c9cc",
    },
    secondary: {
      main: "#000000",
    },

  },
});
root.render(
  <AuthContextProvider>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
           <AppLayout title="Home" open={true}>
             <App />
           </AppLayout>
          } />
          <Route path="Form" element={<AdminGuard>
           <AppLayout title="Add a book" open={false}>
            <Form />
           </AppLayout>
          </AdminGuard>}
          />
          <Route path="Form/:id" element={<AdminGuard>
           <AppLayout title="Edit Book Details" open={false}>
            <Form />
           </AppLayout>
          </AdminGuard>}
          />

          <Route path="BookList" element={<AdminGuard>
            <AppLayout title="Manage Books" open={false}>
              <BookList />
            </AppLayout>
          </AdminGuard>}
          />
          <Route path="Sign-Up" element={<SignUp />} />
          <Route path="Log-In" element={<LogIn />} />


          <Route path="BookDetails/:id" element={
           <AppLayout title="Book Details" open={false}>
             <BookPage />
           </AppLayout>
          } />
          <Route path="404" element={ <div>404</div> } />
            <Route path="*" element={ <Navigate to="/404" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </AuthContextProvider>
);


