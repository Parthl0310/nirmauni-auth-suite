import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, TrendingUp } from 'lucide-react';

const marks = [
  {
    id: 1,
    subject: 'Mathematics',
    marks: 92,
    grade: 'A',
    gradeColor: 'bg-green-100 text-green-700'
  },
  {
    id: 2,
    subject: 'Physics',
    marks: 87,
    grade: 'B+',
    gradeColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 3,
    subject: 'Chemistry',
    marks: 94,
    grade: 'A',
    gradeColor: 'bg-green-100 text-green-700'
  },
  {
    id: 4,
    subject: 'Computer Science',
    marks: 89,
    grade: 'B+',
    gradeColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 5,
    subject: 'English',
    marks: 85,
    grade: 'B',
    gradeColor: 'bg-yellow-100 text-yellow-700'
  }
];

export const LatestMarks = () => {
  return (
    <Card className="bg-background rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
          <Award className="h-5 w-5 text-primary" />
          Latest Marks
        </h3>
      </CardHeader>
      
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          {marks.map((mark) => (
            <div 
              key={mark.id}
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground">{mark.subject}</h4>
                  <p className="text-sm text-muted-foreground">Score: {mark.marks}/100</p>
                </div>
              </div>
              
              <Badge variant="secondary" className={`${mark.gradeColor} hover:${mark.gradeColor} font-semibold`}>
                {mark.grade}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};