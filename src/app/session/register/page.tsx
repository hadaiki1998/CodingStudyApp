// app/session/register/page.tsx
"use client";

import { useActionState } from "react";
import { registerStudies } from "./action";

export default function RegisterForm() {
  const initialState = { success: false, message: "" };
  const [state, formAction] = useActionState(registerStudies, initialState);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">学習セッション登録</h1>

      <form action={formAction} className="space-y-4">
        <div>
          <label className="block mb-1">学習時間（分）</label>
          <input
            type="number"
            name="duration"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">メモ</label>
          <input
            type="text"
            name="description"
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          登録する
        </button>
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
