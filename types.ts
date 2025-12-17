export interface Word {
  id: string;
  term: string;
  meaningCn: string; // Chinese (Mother tongue)
  meaningEn: string; // English definition
  meaningJp: string; // Japanese
  meaningJpReading: string; // Japanese Furigana (Hiragana)
}

export interface WordGroup {
  id: string;
  title: string; // e.g., "Day 1", "Fruits"
  createdAt: number;
  imageUrl?: string; // Base64 or URL for the user's drawing
  words: Word[];
  lastScore?: number;
  passed?: boolean;
}

export type ViewState = 'HOME' | 'CREATE' | 'STUDY' | 'REVIEW';