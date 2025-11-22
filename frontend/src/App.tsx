import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "@/components/animations";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Team = lazy(() => import("./pages/Team"));
const Career = lazy(() => import("./pages/Career"));
const Contact = lazy(() => import("./pages/Contact"));
const SendResume = lazy(() => import("./pages/SendResume"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Gallery = lazy(() => import("./pages/Gallery"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Submissions = lazy(() => import("./pages/admin/Submissions"));
const AdminLogin = lazy(() => import("./pages/admin/Login"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const ManageServices = lazy(() => import("./pages/admin/ManageServices"));
const ManagePortfolio = lazy(() => import("./pages/admin/ManagePortfolio"));
const ManageTeam = lazy(() => import("./pages/admin/ManageTeam"));
const ManageGallery = lazy(() => import("./pages/admin/ManageGallery"));
const ManageClients = lazy(() => import("./pages/admin/ManageClients"));
const ManageHomeBanners = lazy(() => import("./pages/admin/ManageHomeBanners"));

const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="h-12 w-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const RouterViews = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/portfolio" element={<PageTransition><Portfolio /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/career" element={<PageTransition><Career /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/send-resume" element={<PageTransition><SendResume /></PageTransition>} />
        <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/admin/login" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="/admin/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/admin/services" element={<PageTransition><ManageServices /></PageTransition>} />
        <Route path="/admin/portfolio" element={<PageTransition><ManagePortfolio /></PageTransition>} />
        <Route path="/admin/team" element={<PageTransition><ManageTeam /></PageTransition>} />
        <Route path="/admin/gallery" element={<PageTransition><ManageGallery /></PageTransition>} />
        <Route path="/admin/home-banners" element={<PageTransition><ManageHomeBanners /></PageTransition>} />
        <Route path="/admin/clients" element={<PageTransition><ManageClients /></PageTransition>} />
        <Route path="/admin/submissions" element={<PageTransition><Submissions /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminLogin /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Suspense fallback={<PageLoader />}>
        <RouterViews />
      </Suspense>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
