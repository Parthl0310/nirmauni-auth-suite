import React from 'react';
import { motion } from 'framer-motion';
import CourseCard from '../components/CourseCard';

// Sample course data
const sampleCourses = [
  {
    id: 1,
    courseCode: 'CS101',
    courseName: 'Introduction to Computer Science',
    credits: 3,
    semester: 1,
    academicYear: '2024-25'
  },
  {
    id: 2,
    courseCode: 'CS201',
    courseName: 'Data Structures and Algorithms',
    credits: 4,
    semester: 2,
    academicYear: '2024-25'
  },
  {
    id: 3,
    courseCode: 'CS301',
    courseName: 'Database Management Systems',
    credits: 3,
    semester: 3,
    academicYear: '2024-25'
  },
  {
    id: 4,
    courseCode: 'CS302',
    courseName: 'Web Development',
    credits: 3,
    semester: 3,
    academicYear: '2024-25'
  },
  {
    id: 5,
    courseCode: 'CS401',
    courseName: 'Machine Learning',
    credits: 4,
    semester: 4,
    academicYear: '2024-25'
  },
  {
    id: 6,
    courseCode: 'CS402',
    courseName: 'Software Engineering',
    credits: 3,
    semester: 4,
    academicYear: '2024-25'
  }
];

const CoursesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">My Courses</h1>
          <p className="text-muted-foreground">
            Manage and view details of your assigned courses
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {sampleCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CoursesPage;