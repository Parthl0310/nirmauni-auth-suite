import React, { useState } from 'react';
import FacultySidebar from '@/components/FacultySidebar';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardHome from '@/components/DashboardHome';
import { cn } from '@/lib/utils';

console.log('Dashboard component loading...');

const Dashboard = () => {
  console.log('Dashboard component rendering...');
  const [activeItem, setActiveItem] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleItemClick = (itemId) => {
    setActiveItem(itemId);
    console.log(`Navigating to: ${itemId}`);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const renderContent = () => {
    switch (activeItem) {
      case 'dashboard':
        return <DashboardHome />;
      case 'profile':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Profile</h2>
            <p className="text-muted-foreground">Profile content coming soon...</p>
          </div>
        );
      case 'courses':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Courses</h2>
            <p className="text-muted-foreground">Courses content coming soon...</p>
          </div>
        );
      case 'performance':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Student Performance</h2>
            <p className="text-muted-foreground">Performance analytics coming soon...</p>
          </div>
        );
      case 'attendance':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Attendance</h2>
            <p className="text-muted-foreground">Attendance tracking coming soon...</p>
          </div>
        );
      case 'assignments':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Assignments & Exams</h2>
            <p className="text-muted-foreground">Assignment management coming soon...</p>
          </div>
        );
      case 'timetable':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Timetable</h2>
            <p className="text-muted-foreground">Schedule management coming soon...</p>
          </div>
        );
      case 'achievements':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Achievements Approval</h2>
            <p className="text-muted-foreground">Achievement approvals coming soon...</p>
          </div>
        );
      case 'reports':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Reports & Analytics</h2>
            <p className="text-muted-foreground">Detailed reports coming soon...</p>
          </div>
        );
      case 'notifications':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
            <p className="text-muted-foreground">Notification center coming soon...</p>
          </div>
        );
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <FacultySidebar
        isOpen={sidebarOpen}
        onToggle={toggleSidebar}
        activeItem={activeItem}
        onItemClick={handleItemClick}
        isMobile={isMobile}
      />
      
      {/* Main Content */}
      <div className={cn(
        "transition-all duration-300",
        isMobile ? "ml-0" : "lg:ml-64"
      )}>
        {/* Header */}
        <DashboardHeader 
          onToggleSidebar={toggleSidebar}
          isMobile={isMobile}
        />
        
        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)] bg-muted/30">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;