import { NoteDefinition, KeyName } from './types';

interface SchematicKey {
  x: number;
  y: number;
  r: number;
  label: string;
}

// Data for Transposition Tool
export const CHROMATIC_SCALE = [
  { name: 'Do', ids: ['c'] },
  { name: 'Do♯ / Ré♭', ids: ['c_sharp', 'db'] },
  { name: 'Ré', ids: ['d'] },
  { name: 'Mi♭ / Ré♯', ids: ['eb', 'd_sharp'] },
  { name: 'Mi', ids: ['e'] },
  { name: 'Fa', ids: ['f'] },
  { name: 'Fa♯ / Sol♭', ids: ['f_sharp', 'gb'] },
  { name: 'Sol', ids: ['g'] },
  { name: 'Sol♯ / La♭', ids: ['g_sharp', 'ab'] },
  { name: 'La', ids: ['a'] },
  { name: 'Si♭ / La♯', ids: ['bb', 'a_sharp'] },
  { name: 'Si', ids: ['b'] },
];

export const INSTRUMENTS = [
  { name: 'Piano / Flûte / Ut', offset: 0 },
  { name: 'Saxophone Alto / Baryton (Mi♭)', offset: 9 }, // Concert C -> plays A (+9 or -3)
  { name: 'Saxophone Ténor / Soprano (Si♭)', offset: 2 }, // Concert C -> plays D (+2)
  { name: 'Trompette / Clarinette (Si♭)', offset: 2 },
  { name: 'Cor en Fa', offset: 7 },
];

// Flat Schematic Diagram Coordinates
export const KEY_COORDINATES: Record<KeyName, SchematicKey> = {
  // --- TOP SECTION (MAIN GAUCHE) ---
  octave: { x: 280, y: 80, r: 12, label: 'Oct' },
  frontF: { x: 240, y: 90, r: 14, label: 'X' },

  // Main Stack (Center Column Top)
  l1: { x: 240, y: 130, r: 20, label: '1' },
  bis: { x: 240, y: 155, r: 10, label: 'P' }, // The "P" / Bis key, accessible by index
  l2: { x: 240, y: 190, r: 20, label: '2' }, // Moved down slightly to fit Bis
  l3: { x: 240, y: 230, r: 20, label: '3' },

  // Palm Keys (Top Left)
  palmF: { x: 150, y: 90, r: 16, label: 'C4' }, 
  palmEb: { x: 140, y: 130, r: 16, label: 'C2' },
  palmD: { x: 150, y: 170, r: 16, label: 'C1' }, 

  // Left Pinky Table
  lPinkyGsharp: { x: 290, y: 190, r: 18, label: 'G#' },
  lPinkyLowCsharp: { x: 300, y: 220, r: 18, label: 'C#' },
  lPinkyLowB: { x: 290, y: 250, r: 18, label: 'B' },
  lPinkyLowBb: { x: 280, y: 280, r: 18, label: 'Bb' },

  // --- BOTTOM SECTION (MAIN DROITE) ---
  
  // Main Stack (Center Column Bottom)
  r1: { x: 240, y: 330, r: 20, label: '4' },
  r2: { x: 240, y: 370, r: 20, label: '5' },
  r3: { x: 240, y: 410, r: 20, label: '6' },

  // Side Keys
  sideHighE: { x: 130, y: 330, r: 16, label: 'C3' },
  sideC: { x: 130, y: 370, r: 16, label: 'TC' },
  sideBb: { x: 130, y: 410, r: 16, label: 'TA' },

  // Intermediate Keys
  sideFsharp: { x: 185, y: 350, r: 14, label: 'TF' },
  highFsharp: { x: 185, y: 390, r: 14, label: 'C5' },

  // Right Pinky (Bottom)
  rPinkyEb: { x: 220, y: 460, r: 18, label: 'Eb' },
  rPinkyLowC: { x: 260, y: 460, r: 18, label: '7' },
};

export const NOTES: NoteDefinition[] = [
  // GRAVE (Low)
  { 
    id: 'low_bb', name: 'Si♭ Grave', scientificName: 'Bb3', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1', 'r2', 'r3', 'lPinkyLowBb', 'rPinkyLowC'] }],
    description: 'Doigtez le Do grave (7) et ajoutez la clé de Sib (Bb).' 
  },
  { 
    id: 'low_b', name: 'Si Grave', scientificName: 'B3', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1', 'r2', 'r3', 'lPinkyLowB', 'rPinkyLowC'] }],
    description: 'Doigtez le Do grave (7) et ajoutez la clé de Si (B).' 
  },
  { 
    id: 'low_c', name: 'Do Grave', scientificName: 'C4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1', 'r2', 'r3', 'rPinkyLowC'] }],
    description: 'Tous les doigts principaux + la clé 7.' 
  },
  { 
    id: 'low_c_sharp', name: 'Do# Grave', scientificName: 'C#4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1', 'r2', 'r3', 'lPinkyLowCsharp'] }],
    description: 'Tous les doigts principaux + la clé C# (auriculaire gauche).' 
  },
  { 
    id: 'low_d', name: 'Ré Grave', scientificName: 'D4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1', 'r2', 'r3'] }],
    description: 'Les 6 doigts principaux fermés.' 
  },
  { 
    id: 'low_eb', name: 'Mi♭ Grave', scientificName: 'Eb4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1', 'r2', 'r3', 'rPinkyEb'] }],
    description: 'Les 6 doigts + la clé Eb.' 
  },
  { 
    id: 'low_e', name: 'Mi Grave', scientificName: 'E4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1', 'r2'] }],
    description: '5 doigts fermés.' 
  },
  { 
    id: 'low_f', name: 'Fa Grave', scientificName: 'F4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'r1'] }],
    description: '4 doigts fermés.' 
  },
  { 
    id: 'low_f_sharp', name: 'Fa# Grave', scientificName: 'F#4', group: 'Grave', 
    variants: [
      { label: 'Standard', keys: ['l1', 'l2', 'l3', 'r2'], description: 'Doigté classique 123 + 5' },
      { label: 'Chromatique', keys: ['l1', 'l2', 'l3', 'r1', 'sideFsharp'], description: 'Utilise la clé de côté TF' }
    ],
    description: 'Deux options principales pour le Fa#.' 
  },
  { 
    id: 'low_g', name: 'Sol Grave', scientificName: 'G4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3'] }],
    description: 'Main gauche fermée.' 
  },
  { 
    id: 'low_g_sharp', name: 'Sol# Grave', scientificName: 'G#4', group: 'Grave', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2', 'l3', 'lPinkyGsharp'] }],
    description: '1, 2, 3 + clé G#.' 
  },

  // MEDIUM
  { 
    id: 'mid_a', name: 'La', scientificName: 'A4', group: 'Médium', 
    variants: [{ label: 'Standard', keys: ['l1', 'l2'] }],
    description: '1 et 2.' 
  },
  { 
    id: 'mid_bb', name: 'Si♭ / La#', scientificName: 'Bb4', group: 'Médium', 
    variants: [
      { label: 'Côté', keys: ['l1', 'l2', 'sideBb'], description: '1 + 2 + Clé de côté TA' },
      { label: 'Bis (P)', keys: ['l1', 'bis'], description: 'Index MG roule sur la clé P' },
      { label: 'Fourchette', keys: ['l1', 'r1'], description: '1 + 4 (Doigté "1 et 1")' }
    ],
    description: 'Trois façons principales de jouer le Si bémol.' 
  },
  { 
    id: 'mid_b', name: 'Si', scientificName: 'B4', group: 'Médium', 
    variants: [{ label: 'Standard', keys: ['l1'] }],
    description: 'Doigt 1 uniquement.' 
  },
  { 
    id: 'mid_c', name: 'Do', scientificName: 'C5', group: 'Médium', 
    variants: [
      { label: 'Standard', keys: ['l2'], description: 'Majeur MG uniquement' },
      { label: 'Côté', keys: ['l1', 'sideC'], description: 'Index MG + Clé de côté TC' }
    ],
    description: 'Le Do central.' 
  },
  { 
    id: 'mid_c_sharp', name: 'Do#', scientificName: 'C#5', group: 'Médium', 
    variants: [{ label: 'Standard', keys: [] }],
    description: 'Aucun doigt (ouvert).' 
  },
  
  // AIGU (High)
  { 
    id: 'high_d', name: 'Ré Aigu', scientificName: 'D5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1', 'l2', 'l3', 'r1', 'r2', 'r3'] }],
    description: 'Comme le Ré grave + Octave.' 
  },
  { 
    id: 'high_eb', name: 'Mi♭ Aigu', scientificName: 'Eb5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1', 'l2', 'l3', 'r1', 'r2', 'r3', 'rPinkyEb'] }],
    description: 'Comme le Mib grave + Octave.' 
  },
  { 
    id: 'high_e', name: 'Mi Aigu', scientificName: 'E5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1', 'l2', 'l3', 'r1', 'r2'] }],
    description: 'Comme le Mi grave + Octave.' 
  },
  { 
    id: 'high_f', name: 'Fa Aigu', scientificName: 'F5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1', 'l2', 'l3', 'r1'] }],
    description: 'Comme le Fa grave + Octave.' 
  },
  { 
    id: 'high_f_sharp', name: 'Fa# Aigu', scientificName: 'F#5', group: 'Aigu', 
    variants: [
      { label: 'Standard', keys: ['octave', 'l1', 'l2', 'l3', 'r2'], description: 'Classique' },
      { label: 'Chromatique', keys: ['octave', 'l1', 'l2', 'l3', 'r1', 'sideFsharp'], description: 'Avec clé de côté' }
    ],
    description: 'Comme le Fa# grave + Octave.' 
  },
  { 
    id: 'high_g', name: 'Sol Aigu', scientificName: 'G5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1', 'l2', 'l3'] }],
    description: 'Comme le Sol grave + Octave.' 
  },
  { 
    id: 'high_g_sharp', name: 'Sol# Aigu', scientificName: 'G#5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1', 'l2', 'l3', 'lPinkyGsharp'] }],
    description: 'Comme le Sol# grave + Octave.' 
  },
  { 
    id: 'high_a', name: 'La Aigu', scientificName: 'A5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1', 'l2'] }],
    description: '1, 2 + Octave.' 
  },
  { 
    id: 'high_bb', name: 'Si♭ Aigu', scientificName: 'Bb5', group: 'Aigu', 
    variants: [
      { label: 'Côté', keys: ['octave', 'l1', 'l2', 'sideBb'] },
      { label: 'Bis', keys: ['octave', 'l1', 'bis'] },
      { label: 'Fourchette', keys: ['octave', 'l1', 'r1'] }
    ],
    description: 'Les mêmes variantes qu\'au médium + Octave.' 
  },
  { 
    id: 'high_b', name: 'Si Aigu', scientificName: 'B5', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'l1'] }],
    description: '1 + Octave.' 
  },
  { 
    id: 'high_c', name: 'Do Aigu', scientificName: 'C6', group: 'Aigu', 
    variants: [
      { label: 'Standard', keys: ['octave', 'l2'] },
      { label: 'Côté', keys: ['octave', 'l1', 'sideC'] }
    ],
    description: '2 + Octave.' 
  },
  { 
    id: 'high_c_sharp', name: 'Do# Aigu', scientificName: 'C#6', group: 'Aigu', 
    variants: [{ label: 'Standard', keys: ['octave'] }],
    description: 'Octave seule.' 
  },

  // SUR-AIGU
  { 
    id: 'palm_d', name: 'Ré Sur-aigu', scientificName: 'D6', group: 'Sur-aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'palmD'] }],
    description: 'Octave + C1.' 
  },
  { 
    id: 'palm_eb', name: 'Mi♭ Sur-aigu', scientificName: 'Eb6', group: 'Sur-aigu', 
    variants: [{ label: 'Standard', keys: ['octave', 'palmD', 'palmEb'] }],
    description: 'Octave + C1, C2.' 
  },
  { 
    id: 'palm_e', name: 'Mi Sur-aigu', scientificName: 'E6', group: 'Sur-aigu', 
    variants: [
        { label: 'Standard', keys: ['octave', 'palmD', 'palmEb', 'sideHighE'], description: 'Octave + C1, C2 + C3 (Clé de côté).' },
        { label: 'Front F', keys: ['octave', 'frontF', 'l2', 'l3'], description: 'Doigté harmonique : Octave + X + 2 + 3.' }
    ],
    description: 'Le Mi sur-aigu.' 
  }, 
  { 
    id: 'palm_f', name: 'Fa Sur-aigu', scientificName: 'F6', group: 'Sur-aigu', 
    variants: [
        { label: 'Standard', keys: ['octave', 'palmD', 'palmEb', 'palmF', 'sideHighE'], description: 'Octave + C1, C2, C3 + C4 (Clés de paume + Côté).' },
        { label: 'Front F', keys: ['octave', 'frontF', 'l2'], description: 'Doigté harmonique : Octave + X + 2 (Majeur main gauche).' }
    ],
    description: 'Le Fa sur-aigu.' 
  },
  { 
    id: 'high_fs', name: 'Fa# Sur-aigu', scientificName: 'F#6', group: 'Sur-aigu', 
    variants: [
        { label: 'Standard', keys: ['octave', 'palmD', 'palmEb', 'palmF', 'sideHighE', 'highFsharp'], description: 'Tous les palm keys + Côté C3 + C5.' },
        { label: 'Front F', keys: ['octave', 'frontF', 'l2', 'sideBb'], description: 'Octave + X + 2 + Clé de côté Ta (Bb).' }
    ],
    description: 'Le Fa# sur-aigu.' 
  },
];