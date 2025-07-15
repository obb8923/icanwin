import supabase from '../supabase';

// cheetah 테이블의 모든 데이터를 가져오는 함수
export async function getCheetah() {
  const { data, error } = await supabase
    .from('cheetah')
    .select('*');

  if (error) {
    throw error;
  }
  return data;
}

