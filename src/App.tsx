import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import NewQR from "./pages/NewQR";
import BulkQR from "./pages/BulkQR";
import MyQRCodes from "./pages/MyQRCodes";
import Stats from "./pages/Stats";
import Templates from "./pages/Templates";
import MyDomains from "./pages/MyDomains";
import Plans from "./pages/Plans";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";
import Developers from "./pages/Developers";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home"

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-qr" element={<NewQR />} />
            <Route path="/bulk-qr" element={<BulkQR />} />
            <Route path="/my-qr-codes" element={<MyQRCodes />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/my-domains" element={<MyDomains />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/users" element={<Users />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
