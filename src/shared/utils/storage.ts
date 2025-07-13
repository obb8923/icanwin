import type { FightResult } from '../../domain/fight/types';
import { STORAGE_KEYS } from '../constants';

export const saveFightResult = (result: FightResult): void => {
  const existingResults = getFightResults();
  existingResults.push(result);
  localStorage.setItem(STORAGE_KEYS.FIGHT_RESULTS, JSON.stringify(existingResults));
};

export const getFightResults = (): FightResult[] => {
  const stored = localStorage.getItem(STORAGE_KEYS.FIGHT_RESULTS);
  return stored ? JSON.parse(stored) : [];
};

export const clearFightResults = (): void => {
  localStorage.removeItem(STORAGE_KEYS.FIGHT_RESULTS);
}; 