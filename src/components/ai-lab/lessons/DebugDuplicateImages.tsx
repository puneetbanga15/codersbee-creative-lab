import React, { useEffect } from 'react';

/**
 * This component doesn't render anything but will help us identify
 * where duplicate Buzzy images are coming from in the DOM.
 */
export const DebugDuplicateImages: React.FC = () => {
  useEffect(() => {
    // This will run after the component mounts and the DOM is ready
    setTimeout(() => {
      console.log('================ DEBUG: START IMAGE ANALYSIS ================');
      
      // Find all images on the page
      const allImages = document.querySelectorAll('img');
      console.log(`Total images on page: ${allImages.length}`);
      
      // Find all buzzy images specifically
      const buzzyImages = Array.from(document.querySelectorAll('img[src*="buzzy" i], img[alt*="buzzy" i]'));
      console.log(`Buzzy images found: ${buzzyImages.length}`);
      
      // Map each image to its source, alt text, and path to help identify duplicates
      buzzyImages.forEach((img, index) => {
        const htmlElement = img as HTMLImageElement;
        const path = getDomPath(img);
        console.log(`Buzzy image #${index + 1}:`);
        console.log(`  - src: ${htmlElement.src}`);
        console.log(`  - alt: ${htmlElement.alt}`);
        console.log(`  - DOM path: ${path}`);
        // Safely get a preview of the parent HTML
        const parentHTML = img.parentElement?.outerHTML || '';
        const parentPreview = parentHTML.length > 0 ? parentHTML.substring(0, Math.min(100, parentHTML.length)) : '';
        console.log(`  - parent: ${parentPreview}...`);
      });
      
      // Find all videos on the page (BuzzyAnimation uses video elements)
      const videos = document.querySelectorAll('video');
      console.log(`Total videos on page: ${videos.length}`);
      
      // Helper: Find duplicate images by src
      const srcMap = new Map<string, HTMLImageElement[]>();
      buzzyImages.forEach(img => {
        const htmlImg = img as HTMLImageElement;
        if (!srcMap.has(htmlImg.src)) {
          srcMap.set(htmlImg.src, []);
        }
        srcMap.get(htmlImg.src)?.push(htmlImg);
      });
      
      // Print duplicate groups
      console.log('Duplicate image groups:');
      srcMap.forEach((imgs, src) => {
        if (imgs.length > 1) {
          console.log(`${imgs.length} duplicates of ${src}:`);
          imgs.forEach((img, i) => {
            console.log(`  Duplicate #${i+1}: ${getDomPath(img)}`);
          });
        }
      });
      
      console.log('================ DEBUG: END IMAGE ANALYSIS ================');
    }, 1000); // Give the page time to fully render
  }, []);
  
  // Helper function: Get DOM path for an element to help identify its location
  const getDomPath = (el: Element) => {
    const stack = [];
    let currentEl = el;
    
    while (currentEl && currentEl.nodeType === Node.ELEMENT_NODE) {
      let name = currentEl.nodeName.toLowerCase();
      let sibCount = 0;
      let sibIndex = 0;
      
      // Count siblings
      for (let i = 0; i < (currentEl.parentNode?.childNodes.length || 0); i++) {
        const sibling = currentEl.parentNode?.childNodes[i];
        if (sibling) {
          if (sibling.nodeName === currentEl.nodeName) {
            if (sibling === currentEl) {
              sibIndex = sibCount;
            }
            sibCount++;
          }
        }
      }
      
      if (sibCount > 1) {
        name += `:nth-of-type(${sibIndex + 1})`;
      }
      
      stack.unshift(name);
      currentEl = currentEl.parentElement as Element;
    }
    
    return stack.join(' > ');
  };
  
  // This component doesn't render anything
  return null;
};
