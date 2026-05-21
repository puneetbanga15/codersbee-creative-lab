import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Download, Maximize2, RefreshCw, ExternalLink, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
  const [refreshKey, setRefreshKey] = useState(0);
  const [showBlockedAlert, setShowBlockedAlert] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpenInNewTab = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
    setShowBlockedAlert(false);
  };

  const handleIframeError = () => {
    console.error('PDF loading error - likely blocked by browser');
    setShowBlockedAlert(true);
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
                onClick={handleOpenInNewTab}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open in Tab
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Refresh
              </Button>
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

          {/* Browser Block Alert */}
          {showBlockedAlert && (
            <Alert className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Your browser has blocked the PDF from loading. Try these alternatives:
                <div className="flex gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenInNewTab}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Open in New Tab
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDownload}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-4 w-4" />
                    Download PDF
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {/* PDF Viewer with error handling */}
          <div className="flex-1 border rounded-lg overflow-hidden bg-muted/30">
            <iframe
              key={refreshKey}
              src={`${pdfUrl}#view=FitH&toolbar=1`}
              className="w-full h-full min-h-[600px]"
              title={title}
              loading="lazy"
              onLoad={(e) => {
                // Check if iframe content was blocked
                try {
                  const iframe = e.target as HTMLIFrameElement;
                  // If we can't access the content, it might be blocked
                  if (iframe.contentDocument === null) {
                    setTimeout(() => handleIframeError(), 1000);
                  }
                } catch (error) {
                  console.error('PDF access error:', error);
                  handleIframeError();
                }
              }}
              onError={handleIframeError}
            />
          </div>

          {/* Instructions and alternatives */}
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="text-center mb-2">
              Use your browser's PDF controls to navigate through slides
            </p>
            <p className="text-center text-xs mb-2">
              Having trouble viewing? Try the <strong>"Open in Tab"</strong> button above.
            </p>
            <details className="text-xs bg-muted/50 p-2 rounded">
              <summary className="cursor-pointer">Debug Info & Alternatives</summary>
              <div className="mt-2 space-y-2">
                <p>PDF URL: {pdfUrl}</p>
                <p>If the PDF doesn't load or is blocked by your browser:</p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Click "Open in Tab" to view in a new browser tab</li>
                  <li>Use the "Download" button to save the PDF locally</li>
                  <li>Try the "Refresh" button to reload the content</li>
                  <li>Check if your browser allows embedded PDFs</li>
                </ul>
              </div>
            </details>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};