import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "./config/google-oauth";
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
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import EmailVerification from "./pages/EmailVerification";
import StaticQR from "./pages/features/static-qr";
import DynamicQR from "./pages/features/DynamicQR";
import DownloadFormats from "./pages/features/DownloadFormats";
import TeamUsers from "./pages/features/TeamUsers";
import Analytics from "./pages/features/Analytics";
import EditingManagement from "./pages/features/EditingManagement";
import BulkCreation from "./pages/features/BulkCreation";
import GooglePixel from "./pages/features/GooglePixel";
import CustomDomain from "./pages/features/CustomDomain";
import TemplatesFeature from "./pages/features/Templates";
import EventAnalytics from "./pages/features/EventAnalytics";
import PasswordProtection from "./pages/features/PasswordProtection";

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

          {/* Feature pages */}
          <Route path="/features/static-qr" element={<StaticQR />} />
          <Route path="/features/dynamic-qr" element={<DynamicQR />} />
          <Route path="/features/download-formats" element={<DownloadFormats />} />
          <Route path="/features/team-users" element={<TeamUsers />} />
          <Route path="/features/analytics" element={<Analytics />} />
          <Route path="/features/editing-management" element={<EditingManagement />} />
          <Route path="/features/bulk-creation" element={<BulkCreation />} />
          <Route path="/features/google-pixel" element={<GooglePixel />} />
          <Route path="/features/custom-domain" element={<CustomDomain />} />
          <Route path="/features/templates" element={<TemplatesFeature />} />
          <Route path="/features/event-tracking" element={<EventAnalytics />} />
          <Route path="/features/password-protection" element={<PasswordProtection />} />

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
              path="/verify-email-change"
              element={<EmailVerification />}
            />

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
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);

export default App;
