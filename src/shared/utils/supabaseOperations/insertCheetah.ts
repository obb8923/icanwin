import supabase from '../supabase';
// cheetah 테이블에 데이터를 저장하는 함수
export async function insertCheetah({ nickname, win_rate, dominance_score, explanation }: {
    nickname: string;
    win_rate?: number;
    dominance_score?: number;
    explanation?: string;
  }) {
    const { data, error } = await supabase
      .from('cheetah')
      .insert([
        { nickname, win_rate, dominance_score, explanation }
      ]);
  
    if (error) {
      throw error;
    }
    return data;
  }
  