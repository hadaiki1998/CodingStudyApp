"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useDeferredValue } from "react";

type StudyRecord = {
  id: string;
  user_id: string;
  title: string;
  memo: string;
  date: string; // 形式: 'YYYY-MM-DD'
  start_time: string; // ISO 8601 日付文字列
  end_time: string; // ISO 8601 日付文字列
  study_duration: number; // 単位: 時間（例: 1）
  created_at: string; // ISO 8601 日付文字列
  category: string;
};

type Props = {
  studyLogs: StudyRecord[];
};

export default function ClientList({ studyLogs }: Props) {
  const [input, setInput] = useState<string>("");
  const deferredInput = useDeferredValue(input);

  const filteredDatas = studyLogs.filter((data) =>
    data.category.includes(deferredInput)
  );

  return (
    <div className="flex flex-col">
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mb-4 w-2xs"
        placeholder="カテゴリでフィルター"
      />
      {filteredDatas.length !== 0 ? (
        filteredDatas?.map((data, index) => (
          <Button
            key={index}
            className="bg-green-400 text-black flex flex-col mb-3 h-auto hover:bg-green-600"
          >
            <div>{data.title}</div>
            <div>
              {data.date}　{data.study_duration}時間
            </div>
          </Button>
        ))
      ) : (
        <p className="text-2xl text-red-500">データが見つかりません。</p>
      )}
    </div>
  );
}
