import { InputForm } from '../components/InputForm';
import { analyzeFightChance } from '../api/gemini';
import {useState} from 'react'
import type { GeminiResponse } from '../types';
import type { UserInfo } from '../types';
import { Background } from '../../../shared/components/Background';

export const FightPage = () => {
  const [AIResult,setAIResult] = useState<GeminiResponse|null>(null);
  const [userNickname, setUserNickname] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Background>
    <div className="flex justify-center items-center min-h-screen">
        {/* 카드 */}
        <div
          className="w-full max-w-lg md:max-w-2xl lg:max-w-xl
          bg-white/30 backdrop-blur-md
          rounded-2xl shadow-2xl border border-white/40
          p-4 sm:p-6 md:p-12 flex flex-col items-center
          mx-1 sm:mx-4 md:mx-0"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
        >
          {!AIResult && <>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-tight drop-shadow">
            🐆 치타와의 싸움
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-8 text-center">
            자신을 설명하면 AI가 치타와의 싸움에서 승률을 계산해드립니다
          </p>

            {/* 입력 폼 */}
            <InputForm 
              onSubmit={async (userInfo) => {
                setIsLoading(true);
                try {
                  const result = await analyzeFightChance(userInfo);
                  setAIResult(result);
                  setUserNickname(userInfo.nickname);
                } finally {
                  setIsLoading(false);
                }
              }} 
              isLoading={isLoading}
            />
            </>
          }
          {AIResult && (
            <div className="w-full max-h-80 overflow-y-auto p-4 bg-white/60 rounded-lg mb-4 flex flex-col gap-4">
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
          {AIResult && (
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => { setAIResult(null); setUserNickname(''); }}
            >
              다시하기
            </button>
          )}
           
        </div>
    </div>
    </Background>
  );
}; 