import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar } from 'lucide-react';

const notices = [
  {
    id: 1,
    title: 'Exam Schedule Released',
    date: 'Dec 20, 2024',
    category: 'important',
    description: 'Final examination schedule for semester has been published.'
  },
  {
    id: 2,
    title: 'Library Timing Update',
    date: 'Dec 18, 2024',
    category: 'general',
    description: 'Library will remain open till 10 PM during exam period.'
  },
  {
    id: 3,
    title: 'Holiday Announcement',
    date: 'Dec 15, 2024',
    category: 'important',
    description: 'College will remain closed from Dec 24-26 for Christmas holidays.'
  },
  {
    id: 4,
    title: 'Workshop Registration',
    date: 'Dec 12, 2024',
    category: 'general',
    description: 'AI & Machine Learning workshop registration is now open.'
  }
];

export const LatestNotices = () => {
  const getCategoryBadge = (category) => {
    return category === 'important' ? (
      <Badge variant="destructive" className="bg-orange-100 text-orange-700 hover:bg-orange-100">
        Important
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
        General
      </Badge>
    );
  };

  return (
    <Card className="bg-background rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Bell className="h-5 w-5 text-primary" />
          Latest Notices
        </h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {notices.map((notice) => (
            <div 
              key={notice.id}
              className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground pr-2">{notice.title}</h4>
                {getCategoryBadge(notice.category)}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{notice.description}</p>
              
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{notice.date}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};