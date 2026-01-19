import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { PortfolioProvider } from './contexts/PortfolioContext';
import { PublicLayout, AdminLayout } from './components/layout';
import ProtectedRoute from './components/ProtectedRoute';
import { HomePage, AboutPage, ExperiencePage, ProjectsPage, SkillsPage, CertificationsPage, ContactPage, ResumePage } from './pages/public';
import { AdminLogin, AdminDashboard, AdminProfile, AdminAbout, AdminExperience, AdminProjects, AdminSkills, AdminCertifications, AdminContact, AdminSettings } from './pages/admin';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <PortfolioProvider>
            <Toaster position="top-right" toastOptions={{ duration: 3000, style: { background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-default)', borderRadius: '12px', padding: '16px' } }} />
            <Routes>
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/skills" element={<SkillsPage />} />
                <Route path="/certifications" element={<CertificationsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/resume" element={<ResumePage />} />
              </Route>
              <Route path="/admin" element={<AdminLogin />} />
              <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/profile" element={<AdminProfile />} />
                <Route path="/admin/about" element={<AdminAbout />} />
                <Route path="/admin/experience" element={<AdminExperience />} />
                <Route path="/admin/projects" element={<AdminProjects />} />
                <Route path="/admin/skills" element={<AdminSkills />} />
                <Route path="/admin/certifications" element={<AdminCertifications />} />
                <Route path="/admin/contact" element={<AdminContact />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PortfolioProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
