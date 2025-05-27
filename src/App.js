import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import HelpRequestsList from "./pages/HelpRequestsList";
import HelpRequestDetail from "./pages/HelpRequestDetail";
import CreateHelpRequest from "./pages/CreateHelpRequest";
import HelpMap from "./pages/HelpMap";
import DonationsList from "./pages/DonationsList";
import DonationDetail from "./pages/DonationDetail";
import CreateDonation from "./pages/CreateDonation";
import VolunteerRegister from "./pages/VolunteerRegister";
import VolunteerDashboard from "./pages/VolunteerDashboard";
import styled from "styled-components";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen>Yükleniyor...</LoadingScreen>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen>Yükleniyor...</LoadingScreen>;
  }

  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route path="/help-requests" element={<HelpRequestsList />} />
          <Route path="/help-requests/:id" element={<HelpRequestDetail />} />
          <Route
            path="/create-help-request"
            element={
              <ProtectedRoute>
                <CreateHelpRequest />
              </ProtectedRoute>
            }
          />

          <Route path="/help-map" element={<HelpMap />} />

          <Route path="/donations" element={<DonationsList />} />
          <Route path="/donations/:id" element={<DonationDetail />} />
          <Route
            path="/create-donation"
            element={
              <ProtectedRoute>
                <CreateDonation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/volunteer-register"
            element={
              <ProtectedRoute>
                <VolunteerRegister />
              </ProtectedRoute>
            }
          />

          <Route
            path="/volunteer-dashboard"
            element={
              <ProtectedRoute>
                <VolunteerDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </MainContent>
      <Footer />
    </AppContainer>
  );
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const LoadingScreen = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 1.5rem;
  color: var(--primary-color);
`;

export default App;
