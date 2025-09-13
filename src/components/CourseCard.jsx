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
      <Card className="h-full flex flex-col rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 bg-white">
        
        {/* Card Content */}
        <CardContent className="p-5 flex-1 flex flex-col justify-between">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <Badge variant="secondary" className="px-3 py-1 text-xs font-medium">
              {course.courseCode}
            </Badge>
            <div className="p-2 rounded-full bg-indigo-50">
              <BookOpen className="h-5 w-5 text-indigo-500" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 leading-snug mb-4 line-clamp-2">
            {course.courseName}
          </h3>

          {/* Meta Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-indigo-400" />
              <span>{course.credits} Credits</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-indigo-400" />
              <span>Semester {course.semester}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-indigo-400" />
              <span>{course.academicYear}</span>
            </div>
          </div>
        </CardContent>

        {/* Footer */}
        <CardFooter className="p-5 pt-0">
          <Button 
            onClick={handleViewDetails}
            className="w-full rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-medium"
          >
            View Details →
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CourseCard;