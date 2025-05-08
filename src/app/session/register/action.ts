// app/session/register/action.ts
"use server";

import { createServerClient } from "@/app/utils/server";

// type StudyInput = {
//   duration: number;
//   description: string;
// };

export async function registerStudies(_: any, formData: FormData) {
  console.log("FormDataの内容:");
  formData.forEach((value, key) => {
    console.log(`${key}: ${value}`);
  });

  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // const user = (await supabase.auth.getUser()).data.user;

  console.log(user);

  if (!user) {
    return { success: false, message: "ログインしてください" };
  }

  const duration = Number(formData.get("duration"));
  const description = formData.get("description")?.toString() || "";

  if (isNaN(duration) || !description) {
    return { success: false, message: "全ての項目を入力してください" };
  }

  const { error } = await supabase.from("study_logs").insert([
    {
      user_id: user.id,
      study_duration: duration,
      memo: description,
    },
  ]);

  if (error) {
    console.error(error);
    return { success: false, message: "登録に失敗しました" };
  }

  return { success: true, message: "登録完了しました！" };
}
