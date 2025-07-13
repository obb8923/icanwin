export interface UserInfo {
  height: number; // 키 (cm)
  weight: number; // 몸무게 (kg)
  age: number; // 나이
  gender: 'male' | 'female'; // 성별
  nickname?: string; // 닉네임 (선택)
  exerciseExperience?: string; // 운동경력 (선택)
  description?: string; // 기타 설명 (선택)
}

export interface FightResult {
  id: string;
  userInfo: UserInfo;
  winRate: number; // 승률 (0-100)
  dominanceScore: number; // 압도 점수 (0-50, 승률이 100%일 때만)
  timestamp: number;
}

export interface GeminiResponse {
  winRate: number;
  dominanceScore: number;
  explanation: string;
} 