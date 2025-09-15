import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { StudentSidebar } from '@/components/StudentSidebar';
import { StudentHeader } from '@/components/StudentHeader';
import { StatsSection } from '@/components/StatsSection';
import { UpcomingAssignments } from '@/components/UpcomingAssignments';
import { LatestMarks } from '@/components/LatestMarks';
import { LatestNotices } from '@/components/LatestNotices';
import { AwardsSection } from '@/components/AwardsSection';

const StudentDashboard = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <StudentSidebar 
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <StudentHeader />
        
        {/* Main Dashboard Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Section - 2/3 */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Cards */}
              <StatsSection />
              
              {/* Upcoming Assignments */}
              <UpcomingAssignments />
              
              {/* Latest Marks */}
              <LatestMarks />
              
              {/* Latest Notices */}
              <LatestNotices />
            </div>
            
            {/* Right Section - 1/3 */}
            <div className="lg:col-span-1">
              <AwardsSection />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;