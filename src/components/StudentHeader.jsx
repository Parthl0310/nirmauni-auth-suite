import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const StudentHeader = ({ onToggleSidebar }) => {
  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 bg-background border-b border-border px-4 lg:px-6 py-4 shadow-sm z-30">
      <div className="flex items-center justify-between">
        {/* Left - Hamburger + Welcome Message */}
        <div className="flex items-center gap-4">
          {/* Mobile Hamburger Menu */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden hover:bg-muted"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div>
            <h1 className="text-lg lg:text-2xl font-semibold text-foreground">
              👋 Hii Alex Johnson, Welcome Back!
            </h1>
          </div>
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