import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  FileText, 
  BookOpen,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Clock3
} from 'lucide-react';

// Sample course data
const courseData = {
  1: {
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    credits: 3,
    semester: 1,
    academicYear: '2024-25',
    students: [
      { id: 1, name: 'John Doe', initials: 'JD' },
      { id: 2, name: 'Alice Smith', initials: 'AS' },
      { id: 3, name: 'Mike Johnson', initials: 'MJ' },
      { id: 4, name: 'Sarah Wilson', initials: 'SW' },
      { id: 5, name: 'David Brown', initials: 'DB' }
    ],
    timetable: [
      { time: '10:00 AM', type: 'Lecture', topic: 'Programming Fundamentals', room: 'Room 204' },
      { time: '2:00 PM', type: 'Lab', topic: 'Practical Session', room: 'Lab 301' },
      { time: '4:00 PM', type: 'Tutorial', topic: 'Problem Solving', room: 'Room 105' }
    ],
    assignments: [
      { id: 1, title: 'Basic Programming Concepts', status: 'Pending', dueDate: '2024-09-20' },
      { id: 2, title: 'Data Types and Variables', status: 'Submitted', dueDate: '2024-09-15' },
      { id: 3, title: 'Control Structures', status: 'Graded', dueDate: '2024-09-10' }
    ],
    exams: [
      { id: 1, type: 'Midterm', date: '2024-10-15', time: '10:00 AM' },
      { id: 2, type: 'Final', date: '2024-12-10', time: '2:00 PM' }
    ]
  }
};

const CourseDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('students');
  
  const course = courseData[id] || courseData[1];
  const totalStudents = course.students.length;
  const displayStudents = course.students.slice(0, 4);
  const extraStudents = totalStudents - 4;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Submitted': return 'bg-blue-100 text-blue-800';
      case 'Graded': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending': return <Clock3 className="h-4 w-4" />;
      case 'Submitted': return <CheckCircle className="h-4 w-4" />;
      case 'Graded': return <CheckCircle className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/courses')}
            className="mb-4 rounded-xl"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <Badge variant="secondary">{course.courseCode}</Badge>
                <span className="text-sm text-muted-foreground">
                  {course.credits} Credits • Semester {course.semester}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {course.courseName}
              </h1>
              <p className="text-muted-foreground">Academic Year {course.academicYear}</p>
            </div>
          </div>
        </motion.div>

        {/* Floating Tab Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm shadow-sm rounded-2xl mb-8"
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-2">
            <TabsList className="grid w-full grid-cols-4 rounded-xl">
              <TabsTrigger value="students" className="rounded-lg">
                <Users className="h-4 w-4 mr-2" />
                Students
              </TabsTrigger>
              <TabsTrigger value="timetable" className="rounded-lg">
                <Clock className="h-4 w-4 mr-2" />
                Timetable
              </TabsTrigger>
              <TabsTrigger value="assignments" className="rounded-lg">
                <FileText className="h-4 w-4 mr-2" />
                Assignments
              </TabsTrigger>
              <TabsTrigger value="exams" className="rounded-lg">
                <BookOpen className="h-4 w-4 mr-2" />
                Exams
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'students' && (
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Enrolled Students ({totalStudents})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3">
                    {displayStudents.map((student) => (
                      <motion.div
                        key={student.id}
                        whileHover={{ scale: 1.1 }}
                        className="relative group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium cursor-pointer">
                          {student.initials}
                        </div>
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {student.name}
                        </div>
                      </motion.div>
                    ))}
                    {extraStudents > 0 && (
                      <div className="w-10 h-10 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">
                        +{extraStudents}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === 'timetable' && (
              <div className="space-y-4">
                {course.timetable.map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-medium text-foreground">{entry.time}</span>
                              <Badge variant="outline">{entry.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{entry.topic}</p>
                          </div>
                          <div className="flex items-center space-x-1 text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span className="text-sm">{entry.room}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'assignments' && (
              <div className="space-y-4">
                {course.assignments.map((assignment, index) => (
                  <motion.div
                    key={assignment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-foreground mb-1">
                              {assignment.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Due: {assignment.dueDate}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                              {getStatusIcon(assignment.status)}
                              <span>{assignment.status}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'exams' && (
              <div className="space-y-4">
                {course.exams.map((exam, index) => (
                  <motion.div
                    key={exam.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl">
                      <CardContent className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 rounded-full bg-primary/10">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-foreground">{exam.type} Exam</h3>
                              <Badge variant="outline">{exam.time}</Badge>
                            </div>
                            <div className="flex items-center space-x-1 text-muted-foreground">
                              <Calendar className="h-4 w-4" />
                              <span className="text-sm">{exam.date}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseDetailsPage;