import { Router } from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const DISEASES = [
  {
    disease: 'Wheat Leaf Rust (Puccinia triticina)',
    confidence: 96.8,
    severity: 'High',
    affectedArea: '30–40%',
    treatments: [
      { name: 'Propiconazole 25% EC', dosage: '0.1% solution', method: 'Foliar spray immediately', type: 'Chemical' },
      { name: 'Tebuconazole 25.9% EC', dosage: '0.1% solution', method: 'Alternate spray', type: 'Chemical' },
      { name: 'Pseudomonas fluorescens', dosage: '10g/liter', method: 'For mild early stages', type: 'Biological' },
    ],
    preventive: [
      'Use resistant varieties (HD-2967, PBW-550) next season',
      'Avoid excessive nitrogen application',
      'Ensure proper spacing for aeration',
    ],
  },
  {
    disease: 'Yellow Rust (Puccinia striiformis)',
    confidence: 94.2,
    severity: 'Medium',
    affectedArea: '15–25%',
    treatments: [
      { name: 'Tebuconazole 25.9% EC', dosage: '0.1% solution', method: 'Foliar spray', type: 'Chemical' },
      { name: 'Mancozeb 75% WP', dosage: '2g/liter', method: 'Preventive spray', type: 'Chemical' },
    ],
    preventive: ['Monitor field weekly', 'Avoid late sowing', 'Use yellow-rust resistant varieties'],
  },
];

const SOIL_REPORTS = [
  {
    healthScore: 74,
    nitrogen: 65, phosphorus: 42, potassium: 78,
    pH: 6.8, organicMatter: 2.1, texture: 'Loamy Sand',
    suitableCrops: ['Wheat', 'Mustard', 'Gram', 'Sunflower'],
    nutrients: [
      { name: 'Nitrogen (N)', value: 65, status: 'Medium', color: '#4ADE80', msg: 'Apply Urea @ 45 kg/acre before sowing' },
      { name: 'Phosphorus (P)', value: 42, status: 'Low', color: '#C4A35A', msg: 'Apply DAP @ 2 bags/acre as basal dose' },
      { name: 'Potassium (K)', value: 78, status: 'Good', color: '#60A5FA', msg: 'Current levels sufficient' },
      { name: 'Zinc (Zn)', value: 28, status: 'Very Low', color: '#F87171', msg: 'Apply Zinc Sulphate @ 10 kg/acre' },
    ],
    recommendations: [
      'Apply 5 tons/acre Farm Yard Manure to improve organic carbon',
      'Green manuring with Dhaincha before next Kharif crop',
      'Soil pH 6.8 is optimal — no liming required',
      'Apply micronutrients (Zinc, Boron) as soil test recommends',
    ],
  },
  {
    healthScore: 82,
    nitrogen: 72, phosphorus: 58, potassium: 81,
    pH: 7.1, organicMatter: 2.8, texture: 'Clay Loam',
    suitableCrops: ['Rice', 'Cotton', 'Sugarcane', 'Maize'],
    nutrients: [
      { name: 'Nitrogen (N)', value: 72, status: 'Good', color: '#4ADE80', msg: 'Levels adequate for Kharif crops' },
      { name: 'Phosphorus (P)', value: 58, status: 'Medium', color: '#C4A35A', msg: 'Apply DAP @ 1 bag/acre' },
      { name: 'Potassium (K)', value: 81, status: 'Good', color: '#60A5FA', msg: 'Excellent potassium reserves' },
      { name: 'Zinc (Zn)', value: 45, status: 'Medium', color: '#C4A35A', msg: 'Monitor zinc levels next season' },
    ],
    recommendations: [
      'Soil health is good — maintain organic matter with crop residue',
      'Consider legume rotation to fix nitrogen naturally',
      'pH 7.1 is slightly alkaline — suitable for most crops',
    ],
  },
];

function pickVariant(items, seed = 0) {
  return items[seed % items.length];
}

router.post('/disease', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file && !req.body?.image) {
    return res.status(400).json({ error: 'Image is required' });
  }
  const seed = req.file?.size || req.body?.image?.length || Date.now();
  res.json(pickVariant(DISEASES, seed));
});

router.post('/soil', requireAuth, upload.single('image'), (req, res) => {
  if (!req.file && !req.body?.image) {
    return res.status(400).json({ error: 'Soil image or report is required' });
  }
  const seed = req.file?.size || req.body?.image?.length || Date.now();
  res.json(pickVariant(SOIL_REPORTS, seed));
});

export default router;
