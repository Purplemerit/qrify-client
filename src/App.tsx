import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Index from "./pages/Index";
import NewQR from "./pages/NewQR";
import BulkQR from "./pages/BulkQR";
import MyQRCodes from "./pages/MyQRCodes";
import QRDetail from "./pages/QRDetail";
import Stats from "./pages/Stats";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Developers from "./pages/Developers";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/verify-email-change" element={<EmailVerification />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route
              element={
                <Layout>
                  <Index />
                </Layout>
              }
              path="/dashboard"
            />
            <Route
              element={
                <Layout>
                  <NewQR />
                </Layout>
              }
              path="/new-qr"
            />
            <Route
              element={
                <Layout>
                  <BulkQR />
                </Layout>
              }
              path="/bulk-qr"
            />
            <Route
              element={
                <Layout>
                  <MyQRCodes />
                </Layout>
              }
              path="/my-qr-codes"
            />
            <Route
              element={
                <Layout>
                  <QRDetail />
                </Layout>
              }
              path="/qr/:id"
            />
            <Route
              element={
                <Layout>
                  <Stats />
                </Layout>
              }
              path="/stats"
            />
            <Route
              element={
                <Layout>
                  <Templates />
                </Layout>
              }
              path="/templates"
            />
            <Route
              element={
                <Layout>
                  <Settings />
                </Layout>
              }
              path="/settings"
            />
            <Route
              element={
                <Layout>
                  <Users />
                </Layout>
              }
              path="/users"
            />
            <Route
              element={
                <Layout>
                  <Contact />
                </Layout>
              }
              path="/contact"
            />
            <Route
              element={
                <Layout>
                  <HelpCenter />
                </Layout>
              }
              path="/help"
            />
            <Route
              element={
                <Layout>
                  <Developers />
                </Layout>
              }
              path="/developers"
            />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
