import React, { useState } from 'react';
import type { UserInfo } from '../types';

interface InputFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  isLoading?: boolean;
}

export const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading = false }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      const userInfo: UserInfo = {
        height: 170,
        weight: 70,
        age: 25,
        gender: 'male',
        description: description.trim(),
      };
      onSubmit(userInfo);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">   
        <form onSubmit={handleSubmit} className="flex items-center max-w-sm mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
              placeholder="키, 몸무게, 나이, 성별, 운동경력 등 자유롭게 작성해주세요"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !description.trim()}
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
          </button>
        </form>

        {isLoading && (
          <div className="flex items-center justify-center mt-4">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-700 mr-2"></div>
            AI 분석 중...
          </div>
        )}
      </div>
    </div>
  );
}; 