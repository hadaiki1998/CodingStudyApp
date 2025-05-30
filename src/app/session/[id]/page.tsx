import { createClientServer } from "@/app/utils/server";
import { StudyRecord } from "../list/clientList";

type Props = {
  params: { id: string };
};

export default async function StudyDetailPage({ params }: Props) {
  const supabase = await createClientServer();

  const { data, error } = await supabase
    .from("study_logs")
    .select("*")
    .eq("id", params.id)
    .single<StudyRecord | null>();

  if (!data || error)
    return <p className="text-red-500">データが見つかりませんでした。</p>;

  const startTime = data.start_time.split("T")[1].slice(0, 5);
  const endTime = data.end_time.split("T")[1].slice(0, 5);
  const categoryArr = data.category.split(",");

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">学習セッション詳細</h1>
      <div className="flex flex-col">
        <div className="text-2xl font-bold mb-2">{data.title}</div>
        <div className="flex gap-4 text-gray-500 mb-4">
          <div>{data.date}</div>
          <div>
            {startTime} - {endTime} ({data.study_duration}時間)
          </div>
        </div>
        <div className="flex mb-2">
          <span className="text-gray-500 font-bold mr-4">タグ：</span>
          {categoryArr.map((category, index) => (
            <div
              key={index}
              className="mr-5 border-2 rounded-xl px-4 text-blue-600 bg-blue-300"
            >
              {category}
            </div>
          ))}
        </div>
        <div>
          <div className="text-gray-500 font-bold mb-1">メモ：</div>
          <div className="border-4 h-28 p-1">{data.memo}</div>
        </div>
      </div>
    </div>
  );
}
