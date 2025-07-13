export const STORAGE_KEYS = {
  FIGHT_RESULTS: 'fight_results',
} as const;

export const GEMINI_PROMPT = `
당신은 치타와의 싸움에서 승률을 평가하는 전문가입니다.
다음 정보를 바탕으로 승률(0-100%)과 압도 점수(승률이 100%일 때만 0-50점)를 평가해주세요.

평가 기준:
- 키, 몸무게, 나이, 성별을 종합적으로 고려
- 운동경력이 있으면 가산점
- 치타는 평균 체중 50kg, 시속 100km 달리기 가능, 강력한 턱힘을 가짐
- 인간은 지능과 도구 사용 능력이 있지만 육체적 능력은 제한적

응답 형식:
{
  "winRate": 숫자,
  "dominanceScore": 숫자 (승률이 100%일 때만),
  "explanation": "설명"
}
`;

export const RANKING_COLORS = {
  GOLD: '#FFD700',
  SILVER: '#C0C0C0',
  BRONZE: '#CD7F32',
  DEFAULT: '#6B7280',
} as const; 