import ClientList from "./clientList";
import { createClientServer } from "@/app/utils/server";

export default async function List() {
  const supabase = await createClientServer();

  const { data: studyLogs, error } = await supabase
    .from("study_logs")
    .select("*");

  if (error) {
    return <p>エラー：{error.message}</p>;
  }
  console.log("正常に取得！");
  console.log(studyLogs);

  return <ClientList studyLogs={studyLogs} />;
}
