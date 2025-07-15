import { InputForm } from '../components/InputForm';
import { analyzeFightChance } from '../api/gemini';
import {useState} from 'react'
import type { GeminiResponse } from '../types';
import { Background } from '../../../shared/components/Background';

export const FightPage = () => {
  const [AIResult,setAIResult] = useState<GeminiResponse|null>(null);
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
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-tight drop-shadow">
            🐆 치타와의 싸움
          </h1>
          <p className="text-base md:text-lg text-gray-700 mb-8 text-center">
            자신을 설명하면 AI가 치타와의 싸움에서 승률을 계산해드립니다
          </p>

            {/* 입력 폼 */}
            <InputForm onSubmit={async (userInfo) => {
              console.log('ai....')
              const result = await analyzeFightChance(userInfo);
              setAIResult(result);
            }} />
            <p>{AIResult?.winRate}</p>
            <p>{AIResult?.dominanceScore}</p>
            <p>{AIResult?.explanation}</p>
        </div>
    </div>
    </Background>
  );
}; 