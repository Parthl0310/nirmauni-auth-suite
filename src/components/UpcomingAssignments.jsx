import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock } from 'lucide-react';

const assignments = [
  {
    id: 1,
    subject: 'Mathematics',
    title: 'Calculus Assignment',
    dueDate: 'Dec 25, 2024',
    status: 'pending'
  },
  {
    id: 2,
    subject: 'Physics',
    title: 'Lab Report',
    dueDate: 'Dec 22, 2024',
    status: 'submitted'
  },
  {
    id: 3,
    subject: 'Chemistry',
    title: 'Organic Chemistry Quiz',
    dueDate: 'Dec 28, 2024',
    status: 'pending'
  },
  {
    id: 4,
    subject: 'Computer Science',
    title: 'Programming Project',
    dueDate: 'Dec 30, 2024',
    status: 'pending'
  }
];

export const UpcomingAssignments = () => {
  const getStatusBadge = (status) => {
    return status === 'pending' ? (
      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
        Pending
      </Badge>
    ) : (
      <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
        Submitted
      </Badge>
    );
  };

  return (
    <Card className="bg-background rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-primary" />
          Upcoming Assignments
        </h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div 
              key={assignment.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{assignment.title}</h4>
                <p className="text-sm text-muted-foreground">{assignment.subject}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{assignment.dueDate}</span>
                </div>
              </div>
              
              <div className="ml-4">
                {getStatusBadge(assignment.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};