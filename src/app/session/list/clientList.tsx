"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useState,
  useDeferredValue,
  useOptimistic,
  useTransition,
} from "react";
import Link from "next/link";
import { createClient } from "@/app/utils/client";

export type StudyRecord = {
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
  const [studyData, setStudyData] = useState<StudyRecord[] | []>(studyLogs);
  const [optimisticData, deleteOptimisticData] = useOptimistic(
    studyData,
    (state, deletedId) => state.filter((data) => data.id !== deletedId)
  );
  const [isPending, startTransition] = useTransition();

  const deferredInput = useDeferredValue(input);

  const filteredDatas = optimisticData.filter((data) =>
    data.category.includes(deferredInput)
  );

  const handleDelete = (id: string) => {
    const backupDatas = studyData;

    //useOptimisticの第二引数が下記に当たる
    deleteOptimisticData(id);

    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.from("study_logs").delete().eq("id", id);

      if (error) {
        alert("削除に失敗しました。。。");
        //API通信が失敗したので、バックアップデータ(削除前データ)をセットする
        setStudyData(backupDatas);
        return;
      }

      //API通信が成功したので、削除後のデータをセットする
      alert("削除が成功しました！");
      setStudyData((prev) => prev.filter((data) => data.id !== id));
    });
  };

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
          <div key={index} className="mb-3 flex items-center w-full">
            <Link href={`/session/${data.id}`} className="flex-1">
              <Button className="bg-green-400 w-full h-auto text-black flex flex-col  hover:bg-green-600">
                <div>{data.title}</div>
                <div>
                  {data.date}　{data.study_duration}時間
                </div>
              </Button>
            </Link>
            <Button
              onClick={() => handleDelete(data.id)}
              className="ml-2"
              disabled={isPending}
            >
              削除
            </Button>
          </div>
        ))
      ) : (
        <p className="text-2xl text-red-500">データが見つかりません。</p>
      )}
    </div>
  );
}
