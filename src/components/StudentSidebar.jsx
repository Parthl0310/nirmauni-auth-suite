import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  BookOpen, 
  FileText, 
  Trophy 
} from 'lucide-react';

const menuItems = [
  { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'Teacher', label: 'Teacher', icon: Users },
  { id: 'Attendance', label: 'Attendance', icon: Calendar },
  { id: 'Courses', label: 'Courses', icon: BookOpen },
  { id: 'Exam', label: 'Exam', icon: FileText },
  { id: 'Achievement', label: 'Achievement', icon: Trophy },
];

export const StudentSidebar = ({ activeMenuItem, setActiveMenuItem, isOpen, setIsOpen }) => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-50">
        <div className="w-full p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Student Portal</h2>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenuItem === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => setActiveMenuItem(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-foreground text-background' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed left-0 top-0 h-full w-64 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="w-full p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-foreground">Student Portal</h2>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenuItem === item.id;
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => {
                    setActiveMenuItem(item.id);
                    setIsOpen(false); // Close sidebar on mobile after selection
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive 
                      ? 'bg-foreground text-background' 
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
};