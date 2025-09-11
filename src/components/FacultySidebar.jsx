import React from 'react';
import { 
  BarChart3, 
  User, 
  BookOpen, 
  TrendingUp, 
  Calendar, 
  FileText, 
  Clock, 
  Award, 
  PieChart, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'courses', label: 'Courses', icon: BookOpen },
  { id: 'performance', label: 'Student Performance', icon: TrendingUp },
  { id: 'attendance', label: 'Attendance', icon: Calendar },
  { id: 'assignments', label: 'Assignments & Exams', icon: FileText },
  { id: 'timetable', label: 'Timetable', icon: Clock },
  { id: 'achievements', label: 'Achievements Approval', icon: Award },
  { id: 'reports', label: 'Reports & Analytics', icon: PieChart },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

const SidebarItem = ({ item, isActive, onClick, isMobile = false }) => {
  const Icon = item.icon;
  
  return (
    <button
      onClick={() => onClick(item.id)}
      className={cn(
        "w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 group",
        "hover:bg-primary/10 hover:text-primary hover:translate-x-1",
        isActive 
          ? "bg-primary text-primary-foreground shadow-md" 
          : "text-muted-foreground hover:text-foreground",
        isMobile && "text-base py-4"
      )}
    >
      <Icon className={cn(
        "h-5 w-5 transition-all duration-200",
        isActive ? "text-primary-foreground" : "group-hover:text-primary group-hover:scale-110"
      )} />
      <span className={cn(
        "font-medium transition-all duration-200",
        isActive ? "text-primary-foreground" : "group-hover:text-foreground"
      )}>
        {item.label}
      </span>
    </button>
  );
};

const FacultySidebar = ({ isOpen, onToggle, activeItem, onItemClick, isMobile = false }) => {
  if (isMobile) {
    return (
      <>
        {/* Mobile Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onToggle}
          />
        )}
        
        {/* Mobile Sidebar */}
        <div className={cn(
          "fixed left-0 top-0 h-full w-80 bg-card border-r border-border z-50 transform transition-transform duration-300 lg:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-xl font-bold text-primary">Talentition</h2>
            <button 
              onClick={onToggle}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
            {menuItems.map((item) => (
              <SidebarItem
                key={item.id}
                item={item}
                isActive={activeItem === item.id}
                onClick={(id) => {
                  onItemClick(id);
                  onToggle();
                }}
                isMobile={true}
              />
            ))}
          </nav>
        </div>
      </>
    );
  }

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-card border-r border-border">
      <div className="flex items-center px-6 py-4 border-b border-border">
        <BarChart3 className="h-8 w-8 text-primary mr-3" />
        <h2 className="text-xl font-bold text-primary">Talentition</h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            item={item}
            isActive={activeItem === item.id}
            onClick={onItemClick}
          />
        ))}
      </nav>
      
      {/* Bottom section */}
      <div className="p-4 border-t border-border">
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg transition-all duration-200 hover:bg-destructive/10 hover:text-destructive group">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default FacultySidebar;