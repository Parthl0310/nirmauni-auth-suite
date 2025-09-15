import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock } from 'lucide-react';

const exams = [
  {
    id: 1,
    name: 'Mathematics Final Exam',
    date: 'Dec 28, 2024',
    time: '10:00 AM',
    status: 'Scheduled'
  },
  {
    id: 2,
    name: 'Physics Midterm',
    date: 'Dec 22, 2024',
    time: '2:00 PM',
    status: 'Completed'
  },
  {
    id: 3,
    name: 'Chemistry Lab Test',
    date: 'Dec 30, 2024',
    time: '9:00 AM',
    status: 'Scheduled'
  },
  {
    id: 4,
    name: 'Computer Science Project',
    date: 'Jan 2, 2025',
    time: '11:00 AM',
    status: 'Scheduled'
  }
];

export const UpcomingExam = () => {
  const getStatusBadge = (status) => {
    return status === 'Scheduled' ? (
      <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
        Scheduled
      </Badge>
    ) : (
      <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
        Completed
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="bg-background rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 h-full">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
            <FileText className="h-5 w-5 text-primary" />
            Upcoming Exam
          </h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {exams.map((exam) => (
              <div 
                key={exam.id}
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground text-sm">{exam.name}</h4>
                  {getStatusBadge(exam.status)}
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{exam.date}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{exam.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};