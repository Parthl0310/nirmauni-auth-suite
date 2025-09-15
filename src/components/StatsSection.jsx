import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, BookOpen, GraduationCap } from 'lucide-react';

const statsData = [
  {
    id: 'attendance',
    title: 'Attendance',
    value: '87%',
    icon: Calendar,
    gradient: 'bg-gradient-to-r from-blue-500 to-blue-600',
    textColor: 'text-white'
  },
  {
    id: 'courses',
    title: 'Courses',
    value: '6',
    icon: BookOpen,
    gradient: 'bg-gradient-to-r from-green-500 to-green-600',
    textColor: 'text-white'
  },
  {
    id: 'cgpa',
    title: 'CGPA',
    value: '8.7',
    icon: GraduationCap,
    gradient: 'bg-gradient-to-r from-purple-500 to-purple-600',
    textColor: 'text-white'
  }
];

export const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="cursor-pointer"
          >
            <Card className={`${stat.gradient} border-0 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`${stat.textColor} opacity-90 text-sm font-medium mb-1`}>
                      {stat.title}
                    </p>
                    <p className={`${stat.textColor} text-3xl font-bold`}>
                      {stat.value}
                    </p>
                  </div>
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Icon className={`h-6 w-6 ${stat.textColor}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};