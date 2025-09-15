import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Newspaper, Calendar } from 'lucide-react';

const news = [
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

export const LatestNews = () => {
  const getCategoryBadge = (category) => {
    return category === 'important' ? (
      <Badge className="bg-red-100 text-red-600 hover:bg-red-100">
        Important
      </Badge>
    ) : (
      <Badge className="bg-blue-100 text-blue-600 hover:bg-blue-100">
        General
      </Badge>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-background rounded-2xl shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
            <Newspaper className="h-5 w-5 text-primary" />
            Latest News
          </h3>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            {news.map((item) => (
              <motion.div 
                key={item.id}
                className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-foreground pr-2">{item.title}</h4>
                  {getCategoryBadge(item.category)}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{item.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};