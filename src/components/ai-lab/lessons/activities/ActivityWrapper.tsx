import React, { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ActivityWrapperProps = {
  title: string;
  description: string;
  children: ReactNode;
  onComplete: () => void;
};

export const ActivityWrapper: React.FC<ActivityWrapperProps> = ({
  title,
  description,
  children,
  onComplete,
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {title}
          </CardTitle>
          <p className="text-center text-muted-foreground">
            {description}
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityWrapper;
