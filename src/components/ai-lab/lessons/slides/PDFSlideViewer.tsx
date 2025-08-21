import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface PDFSlideViewerProps {
  pdfUrl: string;
  title: string;
  className?: string;
}

export const PDFSlideViewer: React.FC<PDFSlideViewerProps> = ({ 
  pdfUrl, 
  title, 
  className = '' 
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div 
      className={`${className} ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full">
        <CardContent className="p-4 h-full flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleFullscreen}
                className="flex items-center gap-2"
              >
                <Maximize2 className="h-4 w-4" />
                {isFullscreen ? 'Exit' : 'Fullscreen'}
              </Button>
              {isFullscreen && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFullscreen(false)}
                >
                  ✕
                </Button>
              )}
            </div>
          </div>

          {/* PDF Viewer */}
          <div className="flex-1 border rounded-lg overflow-hidden bg-muted/30">
            <iframe
              src={`${pdfUrl}#view=FitH`}
              className="w-full h-full min-h-[600px]"
              title={title}
              loading="lazy"
            />
          </div>

          {/* Instructions */}
          <div className="mt-4 text-sm text-muted-foreground text-center">
            <p>Use your browser's PDF controls to navigate through slides</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};