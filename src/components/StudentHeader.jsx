import React from 'react';
import { Bell } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export const StudentHeader = () => {
  return (
    <header className="bg-background border-b border-border px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left - Welcome Message */}
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            👋 Hii Alex Johnson, Welcome Back!
          </h1>
        </div>
        
        {/* Right - Notifications & Profile */}
        <div className="flex items-center gap-4">
          {/* Notification Bell */}
          <div className="relative">
            <Bell className="h-6 w-6 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" />
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </div>
          
          {/* Profile Avatar */}
          <Avatar className="h-10 w-10 ring-2 ring-primary ring-offset-2">
            <AvatarImage src="/placeholder.svg" alt="Student" />
            <AvatarFallback className="bg-primary text-primary-foreground">AJ</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};