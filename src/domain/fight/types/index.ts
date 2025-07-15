export interface UserInfo {
  nickname: string; // 닉네임
  description: string; // 기타 설명 
}

export interface GeminiResponse {
  winRate: number;
  dominanceScore: number;
  explanation: string;
  error:boolean
} 