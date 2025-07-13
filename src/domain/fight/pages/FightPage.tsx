import { InputForm } from '../components/InputForm';

export const FightPage = () => {
  return (
    <div className="flex justify-center items-center">
        {/* 카드 */}
        <div className="w-full bg-red-500
         rounded-2xl shadow-2xl border border-gray-200 p-8 md:p-12 flex flex-col items-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center tracking-tight">
            🐆 치타와의 싸움
          </h1>
          <p className="text-base md:text-lg text-gray-500 mb-8 text-center">
            자신을 설명하면 AI가 치타와의 싸움에서 승률을 계산해드립니다
          </p>

            {/* 입력 폼 */}
            <InputForm />
        </div>
    </div>
  );
}; 