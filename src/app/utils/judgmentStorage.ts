// Simple localStorage-based state management for judgments
export interface StoredJudgment {
  id: string;
  caseTitle: string;
  caseNumber: string;
  citation: string;
  court: 'Supreme Court' | 'High Court';
  division: string;
  judges: string[];
  documentType: 'Judgement' | 'Court Roll';
  category?: 'Civil' | 'Criminal' | 'Labour' | 'Tax';
  caseType: string;
  tags: string[];
  date: string;
  month: string;
  year: string;
  summary: string;
  outcome: 'Allowed' | 'Dismissed' | 'Partially Allowed';
  legalArea: string;
  fileName?: string;
  uploadedAt: string;
}

const STORAGE_KEY = 'namibia-courts-judgments';

export function saveJudgment(judgment: StoredJudgment): void {
  const existing = getJudgments();
  existing.push(judgment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
}

export function getJudgments(): StoredJudgment[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function getJudgmentsByCourtType(courtType: 'Supreme Court' | 'High Court'): StoredJudgment[] {
  return getJudgments().filter(j => j.court === courtType && j.documentType === 'Judgement');
}

export function getCourtRollsByCourtType(courtType: 'Supreme Court' | 'High Court'): StoredJudgment[] {
  return getJudgments().filter(j => j.court === courtType && j.documentType === 'Court Roll');
}

export function deleteJudgment(id: string): void {
  const existing = getJudgments();
  const filtered = existing.filter(j => j.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function clearAllJudgments(): void {
  localStorage.removeItem(STORAGE_KEY);
}
