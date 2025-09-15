import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StudentSidebar } from '@/components/StudentSidebar';
import { StudentHeader } from '@/components/StudentHeader';
import { StatsSection } from '@/components/StatsSection';
import { LatestNews } from '@/components/LatestNews';
import { UpcomingExam } from '@/components/UpcomingExam';
import { LatestMarks } from '@/components/LatestMarks';
import { AwardsSection } from '@/components/AwardsSection';

const StudentDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <StudentSidebar 
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header with top margin for fixed positioning */}
        <StudentHeader 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        {/* Main Dashboard Content */}
        <main className="pt-20 p-4 lg:p-6">{/* pt-20 for fixed header space */}
          {/* Desktop Layout: 2/3 + 1/3 grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column - 2/3 width on desktop */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards Row */}
              <StatsSection />
              
              {/* Latest News Section */}
              <LatestNews />
              
              {/* Exam + Marks Row - Side by side on desktop, stacked on mobile */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <UpcomingExam />
                <LatestMarks />
              </div>
            </div>
            
            {/* Right Column - 1/3 width on desktop */}
            <div className="lg:col-span-1">
              <AwardsSection />
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;