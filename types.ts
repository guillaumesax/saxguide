export type KeyName = 
  // Main Stack
  | 'octave' 
  | 'l1' | 'l2' | 'l3' 
  | 'bis' // The "P" / Bis key (small B flat)
  | 'r1' | 'r2' | 'r3'
  // Pinky Clusters
  | 'lPinkyGsharp' | 'lPinkyLowB' | 'lPinkyLowBb' | 'lPinkyLowCsharp'
  | 'rPinkyLowC' | 'rPinkyEb'
  // Palm Keys (Left Hand)
  | 'palmD' | 'palmEb' | 'palmF'
  // Side Keys (Right Hand)
  | 'sideBb' | 'sideC' | 'sideHighE' | 'sideFsharp'
  // Top/Alt
  | 'frontF' | 'highFsharp';

export interface NoteVariant {
  label: string; // e.g., "Standard", "Bis", "Côté"
  keys: KeyName[];
  description?: string; // Specific description for this variant
}

export interface NoteDefinition {
  id: string;
  name: string; // e.g., "La"
  scientificName: string; // e.g., "A4"
  group: 'Grave' | 'Médium' | 'Aigu' | 'Sur-aigu';
  variants: NoteVariant[]; // Changed from single keys array to multiple variants
  description: string; // General description
}

export enum SaxType {
  ALTO = 'Alto',
  TENOR = 'Tenor'
}