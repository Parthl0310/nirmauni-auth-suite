import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LectureCard from './LectureCard';
import ProfilePanel from './ProfilePanel';
import { SkeletonCard } from './Skeleton';

const DashboardHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState(0);
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const sampleLectures = [
    {
      id: 1,
      title: 'UX Research Class',
      type: 'Lecture',
      subject: 'Assignment',
      time: '10:44 am',
      students: 45,
      status: 'upcoming',
      location: 'Room 204',
      avatars: ['JD', 'AS', 'MK', 'RT', 'NG']
    },
    {
      id: 2,
      title: 'App Development Course',
      type: 'Report',
      subject: 'Classroom',
      time: '10:44 am',
      students: 32,
      status: 'ongoing',
      location: 'Lab 3',
      avatars: ['AB', 'CD', 'EF']
    },
    {
      id: 3,
      title: 'Figma UI/UX Workshop',
      type: 'Lecture',
      subject: 'Evaluation',
      time: '10:44 am',
      students: 28,
      status: 'upcoming',
      location: 'Design Studio',
      avatars: ['GH', 'IJ', 'KL', 'MN']
    }
  ];

  const weekDays = ['Sun', 'Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = ['02', '03', '04', '05', '06', '07', '08'];

  const WeekNavigation = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center text-xl">
            <Calendar className="h-6 w-6 mr-2 text-primary" />
            Today's Lectures
          </CardTitle>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              03 March
            </span>
            <div className="flex space-x-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-primary/10"
                onClick={() => setCurrentWeek(prev => prev - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 hover:bg-primary/10"
                onClick={() => setCurrentWeek(prev => prev + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <div
              key={day}
              className={`text-center p-3 rounded-lg transition-all duration-200 cursor-pointer hover:bg-primary/10 ${
                index === 2 // Wednesday is active
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <div className="text-xs font-medium mb-1">{day}</div>
              <div className="text-lg font-bold">{dates[index]}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  const YourLecturesSection = () => (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Your Lectures</CardTitle>
          <span className="text-sm text-muted-foreground">This Week</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : (
            // Actual lecture cards
            sampleLectures.map((lecture) => (
              <LectureCard 
                key={lecture.id} 
                lecture={lecture}
                className="transform transition-all duration-200 hover:scale-[1.01]"
              />
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );

  const SummitedSection = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Submitted</CardTitle>
        <div className="flex space-x-4 text-sm">
          <button className="text-primary border-b-2 border-primary pb-1 font-medium">
            Exams
          </button>
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            Assignments
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-sm">State</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-sm">Session name</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-sm">Assignment</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-sm">Exam</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-sm">Start From</th>
                  <th className="text-left py-3 px-2 font-medium text-muted-foreground text-sm">Due To</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-sm">Pending</span>
                    </div>
                  </td>
                  <td className="py-4 px-2 text-sm font-medium">Web Design</td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">Test view</td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">Test view a</td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">12 Feb 2024</td>
                  <td className="py-4 px-2 text-sm text-muted-foreground">12 Feb 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="xl:col-span-2 space-y-6">
          <WeekNavigation />
          <YourLecturesSection />
          <SummitedSection />
        </div>

        {/* Profile Panel */}
        <div className="xl:col-span-1">
          <ProfilePanel isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;