import React from 'react';
import type { FightResult } from '../types';
import { RANKING_COLORS } from '../../../shared/constants';

interface RankingBoardProps {
  results: FightResult[];
  onClearResults?: () => void;
}

export const RankingBoard: React.FC<RankingBoardProps> = ({ results, onClearResults }) => {
  const sortedResults = [...results].sort((a, b) => {
    if (a.winRate === b.winRate) {
      return b.dominanceScore - a.dominanceScore;
    }
    return b.winRate - a.winRate;
  });

  const getRankColor = (index: number) => {
    switch (index) {
      case 0: return RANKING_COLORS.GOLD;
      case 1: return RANKING_COLORS.SILVER;
      case 2: return RANKING_COLORS.BRONZE;
      default: return RANKING_COLORS.DEFAULT;
    }
  };

  const getRankEmoji = (index: number) => {
    switch (index) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return `${index + 1}`;
    }
  };

  if (results.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              순위표
            </h2>
            <p className="text-gray-600 text-lg">
              아직 결과가 없습니다. 첫 번째로 도전해보세요!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              🏆 순위표
            </h2>
            <p className="text-gray-600">
              총 {results.length}명이 참여했습니다
            </p>
          </div>
          {onClearResults && (
            <button
              onClick={onClearResults}
              className="text-red-600 hover:text-red-800 text-sm font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              전체 삭제
            </button>
          )}
        </div>

        <div className="space-y-4">
          {sortedResults.map((result, index) => (
            <div
              key={result.id}
              className="flex items-start p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-200 border border-gray-100"
            >
              {/* 순위 */}
              <div 
                className="flex items-center justify-center w-14 h-14 rounded-full mr-6 flex-shrink-0 shadow-lg" 
                style={{ backgroundColor: getRankColor(index) }}
              >
                <span className="text-white font-bold text-xl">
                  {getRankEmoji(index)}
                </span>
              </div>

              {/* 사용자 정보 */}
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                  {result.userInfo.description}
                </div>
              </div>

              {/* 점수 */}
              <div className="text-right ml-6 flex-shrink-0">
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {result.winRate}%
                </div>
                {result.winRate === 100 && result.dominanceScore > 0 && (
                  <div className="text-sm text-yellow-600 font-semibold bg-yellow-100 px-2 py-1 rounded-full">
                    +{result.dominanceScore}점
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(result.timestamp).toLocaleDateString('ko-KR')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 통계 */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="p-4 bg-blue-50 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                {Math.round(results.reduce((sum, r) => sum + r.winRate, 0) / results.length)}%
              </div>
              <div className="text-sm text-gray-600 font-medium">평균 승률</div>
            </div>
            <div className="p-4 bg-emerald-50 rounded-xl">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                {results.filter(r => r.winRate >= 80).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">고득점자</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-xl">
              <div className="text-3xl font-bold text-yellow-600 mb-1">
                {results.filter(r => r.winRate === 100).length}
              </div>
              <div className="text-sm text-gray-600 font-medium">만점자</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 