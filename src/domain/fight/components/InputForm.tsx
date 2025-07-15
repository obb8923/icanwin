import React, { useState } from 'react';
import type { UserInfo } from '../types';

interface InputFormProps {
  onSubmit: (userInfo: UserInfo) => void;
  isLoading?: boolean;
}

export const InputForm = ({ onSubmit, isLoading = false }:InputFormProps) => {
  const [nickname, setNickname] = useState('');

  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      const userInfo: UserInfo = {
        nickname:nickname.trim(),
        description: description.trim(),
      };
      onSubmit(userInfo);
    }
  };

  return (
    <div className="w-full flex-row justify-center items-center">
        <form onSubmit={handleSubmit} className="flex-col justify-center items-center">
          <p>닉네임</p>
          <input
              type="text"
              id="simple-search"
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2.5 w-full"
              placeholder="김철득"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
            <p>스펙설명</p>
            <input
              type="text"
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  ps-10 p-2.5 w-full"
              placeholder="키, 몸무게, 나이, 성별, 운동경력 등 자유롭게 작성해주세요"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          <button
            type="submit"
            disabled={isLoading || !description.trim()}
            className="mt-4 w-full p-2.5 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? '시뮬레이션 중..' : '결판내기'}
          </button>
        </form>
    </div>
  );
}; 