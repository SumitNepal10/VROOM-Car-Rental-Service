import fs from 'fs';

const modelsDir = '/home/sumit/Desktop/VROOM-Car-Rental-Service/backend/routes';

try {
  const files = fs.readdirSync(modelsDir);
  console.log('Files in models directory:', files);
} catch (error) {
  console.error('Error reading models directory:', error);
}
