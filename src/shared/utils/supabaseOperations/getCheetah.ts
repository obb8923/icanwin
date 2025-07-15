import supabase from '../supabase';

// cheetah 테이블의 데이터를 win_rate, dominance_score 기준으로 정렬하여 최대 10개만 가져오는 함수
export async function getCheetah() {
  const { data, error } = await supabase
    .from('cheetah')
    .select('*')
    .order('win_rate', { ascending: false })
    .order('dominance_score', { ascending: false })
    .limit(10);

  if (error) {
    throw error;
  }
  return data;
}

