// app/session/register/page.tsx
"use client";

import { useActionState, useState, useEffect } from "react";
import { registerStudies } from "./action";
import { useForm, useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export type Session = {
  title: string;
  category: string;
  start_time: string;
  end_time: string;
  study_duration: string;
  memo: string;
};

export type FormValue = {
  sessions: Session[];
};

export default function RegisterForm() {
  const initialState = { success: false, message: "" };
  const [startTimes, setStartTimes] = useState<string[]>([]);
  const [endTimes, setEndTimes] = useState<string[]>([]);
  const [studyHours, setStudyHours] = useState<string[]>([]);
  const [state, formAction] = useActionState(registerStudies, initialState);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormValue>({
    defaultValues: {
      //1行目を初期表示しておく
      sessions: [
        {
          title: "",
          category: "",
          start_time: "",
          end_time: "",
          study_duration: "",
          memo: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sessions",
  });

  useEffect(() => {
    fields.forEach((field, index) => {
      const start = startTimes[index];
      const end = endTimes[index];

      if (start && end) {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diff =
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60); // 分
        const duration = diff.toFixed(2);

        // ✅ setValue を使って登録
        setValue(`sessions.${index}.study_duration`, duration);
      }
    });
  }, [startTimes, endTimes, fields]);

  const handleStartTimeChange = (index: number, value: string) => {
    const newStartTimes = [...startTimes];
    newStartTimes[index] = value;
    setStartTimes(newStartTimes);
    calculateDuration(index, value, endTimes[index]);
  };

  const handleEndTimeChange = (index: number, value: string) => {
    const newEndTimes = [...endTimes];
    newEndTimes[index] = value;
    setEndTimes(newEndTimes);
    calculateDuration(index, startTimes[index], value);
  };

  const calculateDuration = (index: number, start?: string, end?: string) => {
    if (!start || !end) return;

    const s = new Date(start);
    const e = new Date(end);
    const diffMs = e.getTime() - s.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    const newDurations = [...studyHours];
    newDurations[index] = diffHours.toFixed(2); // "1.25" など
    setStudyHours(newDurations);
  };

  const onSubmit = (data: FormValue) => {
    console.log(data);

    formAction(data);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">学習セッション登録</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="border-2 border-gray-900 p-4">
            <div className=" mb-4">
              <Label className="block mb-1">タイトル</Label>
              <Input
                {...register(`sessions.${index}.title`, {
                  required: "タイトルは必須です",
                })}
                type="text"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.sessions?.[index]?.title && (
                <p className="text-red-400">
                  {errors.sessions?.[index]?.title?.message}
                </p>
              )}
            </div>
            <div className=" mb-4">
              <Label className="block mb-1">
                カテゴリ　※カテゴリとカテゴリの間には「,」を付けてください
              </Label>
              <Input
                {...register(`sessions.${index}.category`, {
                  required: "カテゴリは必須です",
                })}
                type="text"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.sessions?.[index]?.category && (
                <p className="text-red-400">
                  {errors.sessions?.[index]?.category.message}
                </p>
              )}
            </div>
            <div className=" mb-4">
              <Label className="block mb-1">開始時間</Label>
              <Input
                {...register(`sessions.${index}.start_time`, {
                  required: "開始時間は必須です",
                })}
                type="datetime-local"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => handleStartTimeChange(index, e.target.value)}
              />
              {errors.sessions?.[index]?.start_time && (
                <p className="text-red-400">
                  {errors.sessions?.[index]?.start_time.message}
                </p>
              )}
            </div>
            <div className=" mb-4">
              <Label className="block mb-1">終了時間</Label>
              <Input
                {...register(`sessions.${index}.end_time`, {
                  required: "終了時間は必須です",
                })}
                type="datetime-local"
                className="w-full border px-3 py-2 rounded"
                onChange={(e) => handleEndTimeChange(index, e.target.value)}
              />
              {errors.sessions?.[index]?.end_time && (
                <p className="text-red-400">
                  {errors.sessions?.[index]?.end_time.message}
                </p>
              )}
            </div>
            <div className=" mb-4">
              <Label className="block mb-1">学習時間（分）</Label>
              <Input
                type="number"
                value={studyHours[index] || ""}
                readOnly
                className="w-full border px-3 py-2 rounded"
              />
            </div>

            <div className=" mb-4">
              <Label className="block mb-1">メモ</Label>
              <Input
                {...register(`sessions.${index}.memo`, {
                  required: "メモは必須です",
                })}
                type="text"
                className="w-full border px-3 py-2 rounded"
              />
              {errors.sessions?.[index]?.memo && (
                <p className="text-red-400">
                  {errors.sessions?.[index]?.memo.message}
                </p>
              )}
            </div>
            <Button type="button" onClick={() => remove(index)}>
              削除
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            append({
              title: "",
              category: "",
              start_time: "",
              end_time: "",
              study_duration: "",
              memo: "",
            })
          }
        >
          フォーム追加
        </Button>

        <Button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          登録する
        </Button>
      </form>

      {/* メッセージ表示 */}
      {state.message && (
        <p
          className={`mt-4 ${
            state.success ? "text-green-600" : "text-red-600"
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
