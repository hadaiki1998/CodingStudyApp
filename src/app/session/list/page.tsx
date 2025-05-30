import { Suspense } from "react";
import List from "./studyList";

export default async function ListPage() {
  return (
    <div>
      <div className="max-w-2xl mx-auto mt-8 border-2 border-gray-400 p-3">
        <h1 className="text-3xl font-bold mb-6">学習セッション一覧</h1>
        <Suspense fallback={<p className="text-3xl">読み込み中...</p>}>
          <List />
        </Suspense>
      </div>
    </div>
  );
}
