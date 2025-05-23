// Script to download Buzzy animations from Supabase
// Run this script with: node scripts/download-buzzy-animations.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
const https = require('https');

// Replace with your Supabase URL and anon key
const supabaseUrl = process.env.SUPABASE_URL || 'https://jjshsfsmgbrhypotcwvx.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

// Initialize Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Animation states to download
const states = ['default', 'thinking', 'excited', 'teaching', 'encouraging'];

// Output directory
const outputDir = path.join(__dirname, '..', 'public', 'buzzy-animations');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
  console.log(`Created directory: ${outputDir}`);
}

// Function to download a file
const downloadFile = (url, outputPath) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(outputPath);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${outputPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(outputPath, () => {}); // Delete the file if there's an error
      console.error(`Error downloading ${outputPath}:`, err.message);
      reject(err);
    });
  });
};

// Main function to download all animations
const downloadAnimations = async () => {
  console.log('Starting download of Buzzy animations...');
  
  for (const state of states) {
    try {
      const fileName = `buzzy_${state}.mp4`;
      const filePath = path.join(outputDir, fileName);
      
      // Try different possible paths in Supabase
      const paths = [
        fileName,
        `buzzy-animations/${fileName}`
      ];
      
      let downloadSuccessful = false;
      
      for (const storagePath of paths) {
        console.log(`Trying to get signed URL for: ${storagePath}`);
        
        const { data, error } = await supabase
          .storage
          .from('documents')
          .createSignedUrl(storagePath, 60 * 60);
          
        if (error) {
          console.log(`Error getting signed URL for ${storagePath}:`, error.message);
          continue;
        }
        
        if (data?.signedUrl) {
          console.log(`Got signed URL for ${storagePath}`);
          await downloadFile(data.signedUrl, filePath);
          downloadSuccessful = true;
          break;
        }
      }
      
      if (!downloadSuccessful) {
        console.error(`Failed to download ${fileName} from any path`);
      }
    } catch (err) {
      console.error(`Error processing ${state}:`, err.message);
    }
  }
  
  console.log('Download process completed!');
};

// Run the download
downloadAnimations().catch(err => {
  console.error('Error in download process:', err.message);
});
