// app/session/register/page.tsx
"use client";

import { useActionState, useEffect, useTransition } from "react";
import { registerStudies } from "./action";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CommonButton from "@/app/components/button/button";
import { useRouter } from "next/navigation";
import LoadingDialog from "../../components/dialog/loadingdialog";

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

  const [state, formAction] = useActionState(registerStudies, initialState);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

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

  //学習時間を計算する用にsessions 全体をwatchメソッドで管理

  const sessions = useWatch({
    control,
    name: "sessions",
  }) as Session[];

  useEffect(() => {
    sessions?.forEach((session, index) => {
      const { start_time, end_time, study_duration } = session;

      if (start_time && end_time) {
        const s = new Date(start_time);
        const e = new Date(end_time);

        const diffMs = e.getTime() - s.getTime();
        const diffHours = diffMs / (1000 * 60 * 60);

        const newDurations = diffHours.toFixed(2); // "1.25" など

        if (study_duration !== newDurations) {
          setValue(`sessions.${index}.study_duration`, newDurations);
        }
      }
    });
  }, [sessions, setValue]);

  const onSubmit = (data: FormValue) => {
    console.log(data);

    formAction(data);
  };

  const handleClick = () => {
    startTransition(() => {
      router.push("/session/list");
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">学習セッション登録</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {fields.map((field, index) => {
          const studyDuration = sessions?.[index]?.study_duration || "";
          return (
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
                  // onChange={(e) => handleStartTimeChange(index, e.target.value)}
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
                  // onChange={(e) => handleEndTimeChange(index, e.target.value)}
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
                  value={studyDuration || ""}
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
              <CommonButton type="button" onClick={() => remove(index)}>
                削除
              </CommonButton>
            </div>
          );
        })}

        <CommonButton
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
        </CommonButton>
        <CommonButton type="submit">登録する</CommonButton>
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
      <CommonButton onClick={handleClick}>
        学習セッション一覧ページへ
      </CommonButton>
      {isPending && <LoadingDialog open={isPending} />}
    </div>
  );
}
