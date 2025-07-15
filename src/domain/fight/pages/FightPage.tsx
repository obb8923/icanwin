import { InputForm } from '../components/InputForm';
import { analyzeFightChance } from '../api/gemini';
import { useState } from 'react';
import type { GeminiResponse } from '../types';
import { Background } from '../../../shared/components/Background';
import { insertCheetah } from '../../../shared/utils/supabaseOperations/insertCheetah';

export const FightPage = () => {
  const [AIResult,setAIResult] = useState<GeminiResponse|null>(null);
  const [userNickname, setUserNickname] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Background>
    <div className="flex flex-1 flex-col justify-center items-center ">
        {/* 카드 */}
        <div
          className="w-full max-w-lg md:max-w-2xl lg:max-w-xl
          bg-white/30 backdrop-blur-md
          rounded-2xl shadow-2xl border border-white/40
          flex flex-col items-center
          mx-1 sm:mx-4 md:mx-0"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
        >
          {!AIResult && 
          <div className="w-full p-4 sm:p-6 md:p-12">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-tight drop-shadow">
            🐆 치타와의 싸움
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-8 text-center">
            치타와의 싸움을 시뮬레이션 해보세요
          </p>

            {/* 입력 폼 */}
            <InputForm 
              onSubmit={async (userInfo) => {
                setIsLoading(true);
                try {
                  const result = await analyzeFightChance(userInfo);
                  setAIResult(result);
                  setUserNickname(userInfo.nickname);
                  if(!result.error){
                  // DB 저장
                  await insertCheetah({
                    nickname: userInfo.nickname,
                    win_rate: result.winRate,
                    dominance_score: result.dominanceScore,
                    explanation: result.explanation,
                  });
                }
                } finally {
                  setIsLoading(false);
                }
              }} 
              isLoading={isLoading}
            />
            </div>
          }
          {AIResult && (
            <div className="w-full h-full overflow-y-auto p-4 bg-white/60 rounded-lg  flex flex-col gap-4">
              <div className="text-2xl font-extrabold text-center mb-2">
                {userNickname} vs 치타
              </div>
              <div className="text-xl font-bold text-center">
                🏆 예상 승률: <span className="text-blue-700">{AIResult.winRate}%</span>
              </div>
              {AIResult.winRate === 100 && (
                <div className="text-lg text-green-700 font-semibold text-center">
                  압도점수: {AIResult.dominanceScore}
                </div>
              )}
              <div className="text-base text-gray-800 whitespace-pre-line">
                {AIResult.explanation}
              </div>
            </div>
          )}
         
           
        </div>
        {/* 버튼 영역 */}
        {AIResult && (
          <div className="w-full max-w-lg md:max-w-2xl lg:max-w-xl flex justify-between items-center gap-4">
            <button
              className="flex-1  mt-2 px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-300 transition-colors"
              onClick={() => {}}
            >
              공유하기
            </button>
            <button
              className="flex-1 mt-2 px-4 py-2 bg-white text-gray-900 rounded hover:bg-gray-300 transition-colors"
              onClick={() => { setAIResult(null); setUserNickname(''); }}
            >
              다시하기
            </button>
            </div>
          )}
    </div>
    </Background>
  );
}; 