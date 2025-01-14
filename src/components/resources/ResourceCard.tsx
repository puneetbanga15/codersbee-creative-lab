import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Star } from "lucide-react";

type ResourceCardProps = {
  title: string;
  description: string;
  locked: boolean;
};

export const ResourceCard = ({ title, description, locked }: ResourceCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-codersbee-purple/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{title}</CardTitle>
          {locked ? (
            <Lock className="h-5 w-5 text-yellow-500" />
          ) : (
            <Star className="h-5 w-5 text-green-500" />
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {locked ? (
          <p className="text-sm text-yellow-600">
            This content is available for enrolled students
          </p>
        ) : (
          <p className="text-sm text-green-600">
            Free access
          </p>
        )}
      </CardContent>
    </Card>
  );
};