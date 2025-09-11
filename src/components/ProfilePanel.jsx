import React from 'react';
import { Calendar, Users, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Skeleton, SkeletonProfile } from './Skeleton';

const ProfilePanel = ({ isLoading = false, className }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  // Sample data
  const groups = [
    { id: 1, name: 'Group1 Design', members: 14, time: '10:00 am', color: 'bg-blue-500' },
    { id: 2, name: 'Group2 Design', members: 22, time: '02:00 pm', color: 'bg-orange-500' },
    { id: 3, name: 'Group3 Design', members: 18, time: '05:00 pm', color: 'bg-purple-500' },
    { id: 4, name: 'Group4 Design', members: 16, time: '07:00 pm', color: 'bg-green-500' },
  ];

  const topStudents = [
    { id: 1, name: 'Mohamed Serag', score: '98%', avatar: 'MS' },
    { id: 2, name: 'Mohamed Serag', score: '96%', avatar: 'MS' },
    { id: 3, name: 'Ahmed Hamed', score: '95%', avatar: 'AH' },
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-1"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = day === currentDate.getDate();
      days.push(
        <button
          key={day}
          className={cn(
            "w-6 h-6 flex items-center justify-center text-xs rounded-full transition-all duration-200",
            "hover:bg-primary hover:text-primary-foreground",
            isToday 
              ? "bg-primary text-primary-foreground font-semibold" 
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        {/* Profile Loading */}
        <Card>
          <CardContent className="p-6">
            <SkeletonProfile />
          </CardContent>
        </Card>

        {/* Calendar Loading */}
        <Card>
          <CardHeader>
            <Skeleton height="20px" width="60%" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: 35 }).map((_, i) => (
                <Skeleton key={i} width="32px" height="32px" shape="circle" />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Groups Loading */}
        <Card>
          <CardHeader>
            <Skeleton height="20px" width="40%" />
          </CardHeader>
          <CardContent className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-3">
                <Skeleton shape="circle" width="24px" height="24px" />
                <div className="flex-1 space-y-1">
                  <Skeleton height="14px" width="70%" />
                  <Skeleton height="12px" width="50%" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Profile Section */}
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <Avatar className="w-16 h-16 border-4 border-primary/20">
                <AvatarImage src="/api/placeholder/64/64" alt="Nada Yasser" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold text-lg">
                  NY
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-card"></div>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-foreground">Nada Yasser</h3>
              <p className="text-muted-foreground text-sm">Designer Instructor</p>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-muted-foreground">Online</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calendar Widget */}
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">
              {new Date(currentYear, currentMonth).toLocaleDateString('en-US', { 
                month: 'short', 
                year: 'numeric' 
              })}
            </CardTitle>
            <div className="flex space-x-1">
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronLeft className="h-3 w-3" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6">
                <ChevronRight className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-7 gap-1 mb-1">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground p-1">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {renderCalendar()}
          </div>
        </CardContent>
      </Card>

      {/* Groups Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            Groups
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {groups.map((group) => (
            <div 
              key={group.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
            >
              <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", group.color)}>
                <Users className="h-3 w-3 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {group.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {group.members} members • {group.time}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Students Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-primary" />
            Top Students
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topStudents.map((student, index) => (
            <div 
              key={student.id}
              className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-all duration-200 cursor-pointer group"
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold text-sm">
                    {student.avatar}
                  </AvatarFallback>
                </Avatar>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Trophy className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                  {student.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  Score: {student.score}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePanel;