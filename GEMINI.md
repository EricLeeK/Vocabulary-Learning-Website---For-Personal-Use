# ToonVocab Project Summary

**Date:** 2025-02-21
**OS:** Windows (win32)
**Project Root:** `D:\scientific_research\SelfCode\web_Alphabet`

## 1. Overview
ToonVocab is a full-stack web application for vocabulary learning.
*   **Frontend:** React (TypeScript), Vite, Tailwind CSS-like styling (`bg-toon-blue`, etc.).
*   **Backend:** Node.js (Express) server running on port 3001.
*   **Database:** `server/data.json` (JSON-based local storage).
*   **Images:** Stored in `server/images/` and served statically.

## 2. Key Features

### 2.1 Study Modes
*   **Home:** Lists "Days" (WordGroups).
*   **Study:** View words (EN, CN, JP) + Visualizations (Images).
*   **Review:** Test mode to type English words based on definitions.
*   **Drawing/Images:** Users upload drawings or use AI-generated images. **Crucial:** Original images are *never* deleted, only unlinked from DB.

### 2.2 Tools (Toolbox)
*   **Word Factory:** Batch process raw text -> Structured Words (EN/CN/JP) using AI (Gemini/DeepSeek/SiliconFlow).
    *   Generates JSON.
    *   Can add directly to Home.
*   **Article Picker:** Paste article -> Select words/phrases -> Export JSON.

## 3. Architecture

### 3.1 Frontend (`/`)
*   **`App.tsx`**: Main router & state manager. Huge monolithic component containing sub-views (`HomeView`, `StudyView`, etc.).
*   **`types.ts`**: Core interfaces (`WordGroup`, `Word`, `AISettings`).
*   **`services/`**:
    *   `wordService.ts`: API calls to backend (`/api/groups`).
    *   `aiService.ts`: Integration with LLMs (Gemini, etc.).
    *   `imageService.ts`: Compression (AVIF) & utils.

### 3.2 Backend (`/server`)
*   **`index.js`**: Express server. Handles CRUD for Groups & Images.
    *   **Images**: Stores base64 uploads as files.
    *   **Safety**: `deleteImageFile` is effectively disabled (commented out) to prevent data loss.
*   **`db.js`**: Manages `data.json`.

## 4. Data Models (`types.ts`)

```typescript
interface Word {
  id: string;
  term: string;
  meaningCn: string;
  meaningEn: string;
  meaningJp: string;
  meaningJpReading: string;
}

interface WordGroup {
  id: string;
  title: string;
  createdAt: number;
  imageUrl?: string;      // Main visual
  imageUrls?: string[];   // Extra visuals
  words: Word[];
  passed?: boolean;
}
```

## 5. Critical Rules
*   **No Deletion:** Never delete image files from disk.
*   **Styling:** "Toon" aesthetic (bold borders, bright colors).
*   **AI:** Uses `services/aiService.ts` for text processing.

## 6. Commands
*   **Start:** `npm run dev` (Frontend), `cd server && npm run dev` (Backend).
