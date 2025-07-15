import { useEffect, useState } from 'react';
import { getCheetah } from '../../../shared/utils/supabaseOperations/getCheetah';
import { Background } from '../../../shared/components/Background';

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
      <div className="flex flex-col items-center w-full max-w-xl mx-auto p-4 bg-white/60 rounded-lg shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-4">치타 싸움 랭킹</h2>
        {loading && <div>불러오는 중...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {!loading && !error && (
          <ul className="w-full divide-y divide-gray-300">
            {results.map((row, idx) => (
              <li key={row.id} className="flex justify-between items-center py-2 px-2">
                <span className="font-semibold">{idx + 1}위. {row.nickname}</span>
                <span>승률: {row.win_rate}%</span>
                <span>압도점수: {row.dominance_score}</span>
              </li>
            ))}
            {results.length === 0 && <li>아직 랭킹 데이터가 없습니다.</li>}
          </ul>
        )}
      </div>
    </Background>
  );
};