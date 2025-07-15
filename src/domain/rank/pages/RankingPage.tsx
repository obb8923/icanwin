import { useEffect, useState } from 'react';
import { getCheetah } from '../../../shared/utils/supabaseOperations/getCheetah';
import { Background } from '../../../shared/components/Background';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface CheetahRow {
  id: string;
  nickname: string;
  win_rate: number;
  dominance_score: number;
  explanation?: string;
}

export const RankPage = () => {
  const [results, setResults] = useState<CheetahRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getCheetah();
        setResults(data || []);
      } catch (err: any) {
        setError('랭킹 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Background>
      <div className="flex flex-col items-center w-full max-w-xl mx-auto p-4 bg-white/70 rounded-lg shadow-lg mt-8 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">치타 싸움 랭킹</h2>
        {loading && <div>불러오는 중...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <ul className="w-full divide-y divide-gray-300">
            {results.map((row, idx) => (
              <li key={row.id} className="flex flex-col py-2 px-2">
                <div className="flex justify-between items-center w-full">
                  <span className="font-semibold">{idx + 1}위. {row.nickname}</span>
                  <span>승률: {row.win_rate}%</span>
                  <span>압도점수: {row.dominance_score}</span>
                  <button
                    className="ml-2 focus:outline-none"
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                    aria-label={openIdx === idx ? '설명 닫기' : '설명 펼치기'}
                  >
                    {openIdx === idx ? <FaChevronUp /> : <FaChevronDown />}
                  </button>
                </div>
                
                {/* 설명 아코디언 영역 */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    openIdx === idx ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden bg-gray-100 rounded text-gray-700 text-sm p-2">
                    {row.explanation}
                  </div>
                </div>
              </li>
            ))}
            {results.length === 0 && <li>아직 랭킹 데이터가 없습니다.</li>}
          </ul>
        )}
      </div>
    </Background>
  );
};
