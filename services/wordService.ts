import { WordGroup, Word } from '../types';

const API_BASE = '/api';

// Helper to generate IDs (used for local operations)
const generateId = () => Math.random().toString(36).substr(2, 9);

// Fetch all groups from the server
export const getGroups = async (): Promise<WordGroup[]> => {
  try {
    const response = await fetch(`${API_BASE}/groups`);
    if (!response.ok) throw new Error('Failed to fetch groups');
    return await response.json();
  } catch (error) {
    console.error('Error fetching groups:', error);
    return [];
  }
};

// Save (create or update) a group
export const saveGroup = async (group: WordGroup): Promise<void> => {
  try {
    // Check if group exists by trying to update first
    const response = await fetch(`${API_BASE}/groups/${group.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(group)
    });

    if (response.status === 404) {
      // Group doesn't exist, create new
      await fetch(`${API_BASE}/groups`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
      });
    }
  } catch (error) {
    console.error('Error saving group:', error);
  }
};

// Delete a group
export const deleteGroup = async (id: string): Promise<void> => {
  try {
    await fetch(`${API_BASE}/groups/${id}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting group:', error);
  }
};

// Create an empty group (local operation, doesn't call server)
export const createEmptyGroup = (): WordGroup => {
  const emptyWords: Word[] = Array.from({ length: 10 }).map(() => ({
    id: generateId(),
    term: '',
    meaningCn: '',
    meaningEn: '',
    meaningJp: '',
    meaningJpReading: ''
  }));

  return {
    id: generateId(),
    title: `New Day`,
    createdAt: Date.now(),
    words: emptyWords,
    passed: false
  };
};

// Update group image (main/first image)
export const updateGroupImage = async (groupId: string, base64Image: string): Promise<void> => {
  try {
    await fetch(`${API_BASE}/groups/${groupId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl: base64Image })
    });
  } catch (error) {
    console.error('Error updating group image:', error);
  }
};

// Add additional image to group
export const addGroupImage = async (groupId: string, base64Image: string): Promise<void> => {
  try {
    await fetch(`${API_BASE}/groups/${groupId}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64Image })
    });
  } catch (error) {
    console.error('Error adding group image:', error);
  }
};

// Delete additional image from group
export const deleteGroupImage = async (groupId: string, imageIndex: number): Promise<void> => {
  try {
    await fetch(`${API_BASE}/groups/${groupId}/images/${imageIndex}`, {
      method: 'DELETE'
    });
  } catch (error) {
    console.error('Error deleting group image:', error);
  }
};

// Import words from JSON
export const importFromJson = async (jsonData: { title: string; words: Partial<Word>[] }): Promise<WordGroup | null> => {
  try {
    const response = await fetch(`${API_BASE}/groups/import`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jsonData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to import');
    }

    return await response.json();
  } catch (error) {
    console.error('Error importing from JSON:', error);
    return null;
  }
};