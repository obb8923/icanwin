import { useRef } from 'react';
import html2canvas from 'html2canvas';
import type { FightResult } from '../types';

interface ResultCardProps {
  result: FightResult;
  onExport?: (imageUrl: string) => void;
}

export const ResultCard = ({ result, onExport }:ResultCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      onExport?.(imageUrl);
    } catch (error) {
      console.error('이미지 내보내기 실패:', error);
    }
  };

  const getWinRateColor = (rate: number) => {
    if (rate >= 80) return 'text-emerald-600';
    if (rate >= 60) return 'text-amber-600';
    if (rate >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  const getWinRateEmoji = (rate: number) => {
    if (rate >= 80) return '🦁';
    if (rate >= 60) return '🐯';
    if (rate >= 40) return '🐺';
    return '🐰';
  };

  const getWinRateText = (rate: number) => {
    if (rate >= 80) return '압도적 승리';
    if (rate >= 60) return '유리한 싸움';
    if (rate >= 40) return '접전 예상';
    return '불리한 싸움';
  };

  return (
    <div className="max-w-lg mx-auto">
      <div
        ref={cardRef}
        className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {getWinRateEmoji(result.winRate)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            치타와의 싸움 결과
          </h2>
          <p className="text-gray-600">
            {getWinRateText(result.winRate)}
          </p>
        </div>

        {/* 승률 */}
        <div className="text-center mb-8">
          <div className={`text-5xl font-bold ${getWinRateColor(result.winRate)} mb-2`}>
            {result.winRate}%
          </div>
          <div className="text-lg text-gray-600 font-medium">
            승률
          </div>
        </div>

        {/* 압도 점수 (승률이 100%일 때만) */}
        {result.winRate === 100 && result.dominanceScore > 0 && (
          <div className="text-center mb-8 p-6 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
            <div className="text-3xl font-bold text-yellow-700 mb-1">
              +{result.dominanceScore}점
            </div>
            <div className="text-sm text-yellow-600 font-medium">
              압도 점수
            </div>
          </div>
        )}

        {/* 사용자 설명 */}
        <div className="mb-6 p-6 bg-gray-50 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-3">사용자 설명</h3>
          <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
            {result.userInfo.description}
          </div>
        </div>

        {/* 평가 시간 */}
        <div className="text-center text-xs text-gray-400">
          {new Date(result.timestamp).toLocaleString('ko-KR')}
        </div>
      </div>

      {/* 내보내기 버튼 */}
      <div className="mt-6 text-center">
        <button
          onClick={handleExport}
          className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-3 rounded-xl font-semibold hover:from-emerald-700 hover:to-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 transition-all duration-200 transform hover:scale-[1.02]"
        >
          📸 이미지로 저장
        </button>
      </div>
    </div>
  );
}; 