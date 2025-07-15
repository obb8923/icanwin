import React, { useEffect, useState } from 'react';
import { RankingBoard } from '../fight/components/RankingBoard';
import { BottomNavigation } from '../../shared/components/BottomNavigation';
import { getFightResults, clearFightResults } from '../../shared/utils/storage';

// TODO: FightResult 타입은 추후 types에서 import로 대체
interface UserInfo {
  nickname: string;
  description: string;
}
interface FightResult {
  id: string;
  userInfo: UserInfo;
  winRate: number;
  dominanceScore: number;
  timestamp: number;
}

export const RankPage = () => {
  const [results, setResults] = useState<FightResult[]>([]);

  useEffect(() => {
    // 랭킹 데이터 불러오기
    const data = getFightResults();
    setResults(data);
  }, []);

  const handleClearResults = () => {
    clearFightResults();
    setResults([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-24">
      <div className="pt-8">
        <RankingBoard results={results} onClearResults={handleClearResults} />
      </div>
      <BottomNavigation />
    </div>
  );
};