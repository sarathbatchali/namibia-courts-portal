import { useState } from 'react';
import { HomePage } from './components/home-page';
import { JudgmentsPage } from './components/judgments-page';
import { CourtRollsPage } from './components/court-rolls-page';
import { ResourcesPage } from './components/resources-page';
import { AboutPage } from './components/about-page';
import { AdminUploadPage } from './components/admin-upload-page';
import { TopBar } from './components/top-bar';
import { TopNavigation } from './components/top-navigation';
import { Footer } from './components/footer';
import { QuickLinks } from './components/quick-links';


export type PageType =
  | 'home'
  | 'judgments'
  | 'court-rolls'
  | 'mediation'
  | 'about'
  | 'legislation'
  | 'forms'
  | 'contacts'
  | 'media'
  | 'admin-upload';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [currentFilter, setCurrentFilter] = useState<any>(null); // To pass court context

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <header className="sticky top-0 z-50 shadow-md">
        <TopBar currentPage={currentPage} onNavigate={setCurrentPage} />
        <TopNavigation 
          currentPage={currentPage} 
          onNavigate={(page, filter) => {
            setCurrentPage(page);
            setCurrentFilter(filter || null);
          }} 
        />
      </header>

      <main>
        {currentPage === 'home' && <HomePage onNavigate={(page, filter) => {
          setCurrentPage(page);
          if (filter) setCurrentFilter(filter);
        }} />}
        {currentPage === 'judgments' && <JudgmentsPage filter={currentFilter} onNavigate={(page, filter) => {
          setCurrentPage(page);
          if (filter) setCurrentFilter(filter);
        }} />}
        {currentPage === 'court-rolls' && <CourtRollsPage filter={currentFilter} onNavigate={(page, filter) => {
          setCurrentPage(page);
          if (filter) setCurrentFilter(filter);
        }} />}
        {currentPage === 'mediation' && <ResourcesPage type="mediation" filter={currentFilter} onNavigate={(page, filter) => {
          setCurrentPage(page);
          if (filter) setCurrentFilter(filter);
        }} />}
        {currentPage === 'about' && <AboutPage onNavigate={(page) => {
          setCurrentPage(page);
          setCurrentFilter(null);
        }} />}
        {currentPage === 'legislation' && <ResourcesPage type="legislation" filter={currentFilter} onNavigate={(page, filter) => {
          setCurrentPage(page);
          if (filter) setCurrentFilter(filter);
        }} />}
        {currentPage === 'forms' && <ResourcesPage type="form" filter={currentFilter} onNavigate={(page, filter) => {
          setCurrentPage(page);
          if (filter) setCurrentFilter(filter);
        }} />}
        {currentPage === 'media' && <ResourcesPage type="media" filter={currentFilter} onNavigate={(page, filter) => {
          setCurrentPage(page);
          if (filter) setCurrentFilter(filter);
        }} />}
        {currentPage === 'admin-upload' && <AdminUploadPage onNavigate={(page) => {
          setCurrentPage(page);
          setCurrentFilter(null);
        }} />}
      </main>

      <QuickLinks />
      <Footer />
    </div>
  );
}