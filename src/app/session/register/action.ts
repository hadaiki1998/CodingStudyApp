// app/session/register/action.ts
"use server";

import { createServerClient } from "@/app/utils/server";
import { FormValue } from "./page";

export async function registerStudies(_: any, formData: FormValue) {
  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const user = (await supabase.auth.getUser()).data.user;

  console.log(`cookiesのユーザー情報：`);
  console.log(user);

  if (!user) {
    return { success: false, message: "ログインしてください" };
  }
  console.log("formDataの中身");
  console.log(formData);

  const sessions = formData.sessions;

  const insertData = sessions.map((session) => ({
    user_id: user.id,
    title: session.title,
    category: session.category,
    start_time: session.start_time,
    end_time: session.end_time,
    study_duration: Number(session.study_duration),
    memo: session.memo,
  }));

  try {
    const { error } = await supabase.from("study_logs").insert(insertData);

    if (error) {
      console.error(error);
      return { success: false, message: "登録に失敗しました" };
    }
  } catch (e) {
    console.error(e);
    return { success: false, message: "良きせぬエラーが発生しました" };
  }

  return { success: true, message: "登録完了しました！" };
}
