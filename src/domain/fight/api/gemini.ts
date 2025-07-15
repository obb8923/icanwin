import { GoogleGenerativeAI } from '@google/generative-ai';
import type { UserInfo, GeminiResponse } from '../types';
import { GEMINI_PROMPT } from '../../../shared/constants';
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const analyzeFightChance = async (userInfo: UserInfo): Promise<GeminiResponse> => {
  try {
    const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });
    const prompt = `${GEMINI_PROMPT}

사용자 설명:
${userInfo.description}
${GEMINI_PROMPT}
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log('text: ',text);
    // JSON 파싱 시도
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        return {
          winRate: Math.min(100, Math.max(0, parsed.winRate || 0)),
          dominanceScore: parsed.winRate === 100 ? Math.min(50, Math.max(0, parsed.dominanceScore || 0)) : 0,
          explanation: parsed.explanation || '평가 완료',
        };
      }
    } catch (parseError) {
      console.error('JSON 파싱 실패:', parseError);
    }

    // JSON 파싱 실패시 기본 응답
    return {
      winRate: 50,
      dominanceScore: 0,
      explanation: 'AI 평가 중 오류가 발생했습니다.',
    };
  } catch (error) {
    console.error('Gemini API 호출 실패:', error);
    return {
      winRate: 50,
      dominanceScore: 0,
      explanation: 'AI 서비스 연결에 실패했습니다.',
    };
  }
}; 