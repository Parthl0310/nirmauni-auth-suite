import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Medal, CheckCircle } from 'lucide-react';

const awards = [
  {
    id: 1,
    title: 'Mathematics Excellence',
    type: 'gold',
    icon: '🥇',
    date: 'Nov 2024'
  },
  {
    id: 2,
    title: 'Science Fair Winner',
    type: 'silver',
    icon: '🥈',
    date: 'Oct 2024'
  },
  {
    id: 3,
    title: 'Programming Contest',
    type: 'bronze',
    icon: '🥉',
    date: 'Sep 2024'
  }
];

const certifications = [
  {
    id: 1,
    name: 'Python Programming',
    provider: 'Coursera',
    verified: true
  },
  {
    id: 2,
    name: 'Web Development',
    provider: 'freeCodeCamp',
    verified: true
  },
  {
    id: 3,
    name: 'Data Analysis',
    provider: 'edX',
    verified: true
  }
];

export const AwardsSection = () => {
  return (
    <div className="space-y-6">
      {/* Awards & Achievements */}
      <Card className="bg-background rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
            <Trophy className="h-5 w-5 text-primary" />
            Awards & Achievements
          </h3>
          <p className="text-sm text-muted-foreground">Recent accomplishments</p>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            {awards.map((award) => (
              <div 
                key={award.id}
                className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="text-2xl">{award.icon}</div>
                
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{award.title}</h4>
                  <p className="text-xs text-muted-foreground">{award.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card className="bg-background rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 text-foreground">
            <Award className="h-5 w-5 text-primary" />
            Certifications
          </h3>
          <p className="text-sm text-muted-foreground">Verified credentials</p>
        </CardHeader>
        
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            {certifications.map((cert) => (
              <div 
                key={cert.id}
                className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{cert.name}</h4>
                    <p className="text-sm text-muted-foreground">{cert.provider}</p>
                  </div>
                  
                  {cert.verified && (
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100 ml-2">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};