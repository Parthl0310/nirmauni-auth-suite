import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { BookOpen, Users, TrendingUp, Award } from 'lucide-react';

const StatsCards = () => {
  // Sample data - in real app this would come from API/state
  const stats = {
    courseCount: 12,
    studentCount: 245,
    avgAttendance: 87,
    avgMarks: 78
  };

  const cards = [
    {
      id: 'courses',
      title: 'Course Count',
      value: stats.courseCount,
      icon: BookOpen,
      type: 'number'
    },
    {
      id: 'students',
      title: 'Student Count',
      value: stats.studentCount,
      icon: Users,
      type: 'number'
    },
    {
      id: 'attendance',
      title: 'Avg Attendance',
      value: stats.avgAttendance,
      icon: TrendingUp,
      type: 'percentage',
      progressColor: 'bg-green-500'
    },
    {
      id: 'marks',
      title: 'Avg Marks',
      value: stats.avgMarks,
      icon: Award,
      type: 'percentage',
      progressColor: 'bg-blue-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <Card 
            key={card.id}
            className="bg-background rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">
                  {card.title}
                </p>
                
                <div className="flex items-baseline space-x-1">
                  <span className="text-3xl font-bold text-foreground">
                    {card.value}
                  </span>
                  {card.type === 'percentage' && (
                    <span className="text-lg text-muted-foreground">%</span>
                  )}
                </div>
                
                {card.type === 'percentage' && (
                  <div className="pt-2">
                    <Progress 
                      value={card.value}
                      className="h-2 bg-muted"
                      style={{
                        '--progress-background': card.progressColor
                      }}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StatsCards;