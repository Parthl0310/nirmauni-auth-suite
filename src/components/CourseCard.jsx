import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, Calendar, CreditCard, GraduationCap } from 'lucide-react';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/courses/${course.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="h-full"
    >
      <Card className="h-full flex flex-col rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border-0 bg-card">
        <CardContent className="p-6 flex-1">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">
                {course.courseCode}
              </Badge>
            </div>
            <div className="flex items-center space-x-1 text-muted-foreground">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm font-medium">{course.credits}</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-foreground mb-3 line-clamp-2">
            {course.courseName}
          </h3>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-4 w-4" />
              <span>Semester {course.semester}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>{course.academicYear}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={handleViewDetails}
            className="w-full rounded-xl"
            variant="default"
          >
            View Details →
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;