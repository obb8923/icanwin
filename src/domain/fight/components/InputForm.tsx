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
          <span className="font-bold">이름</span>
          <input
              type="text"
              id="simple-search"
              className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 w-full"
              placeholder="김철득"
              required
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          <span className="font-bold">스펙 설명</span>
          <textarea
              id="description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full"
              placeholder="형은 키178m몸무게70g보다시피 건장한 체격이다.
나로 말하자면 검도5단 태권도 4단 합기도3단 주부9단 눈치100단 무단횡단 자진모리장단 바위처럼단단 로켓단 복싱6년 도배2년 우유배달6년 애니팡8만점 무에타이14년 포장이사5년으로 보다시피 살아있는 인간변기라 할수있지.
또한 잇몸일으키기분당300회 발굽혀펴기 분당200회를 할수있다."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
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