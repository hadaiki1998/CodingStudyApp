// auth/action.ts
"use server";

import { createClientServer } from "@/app/utils/server";
// import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClientServer();
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log(`ユーザー情報：${signUpData}`);

  if (signUpError) {
    console.error("サインアップ失敗:", signUpError.message);
    return { success: false, message: signUpError.message };
  }

  const { data: signInData, error: signInError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  console.log(signInData.user);

  if (signInError) {
    return {
      success: false,
      message: "登録成功、ログイン失敗：" + signInError.message,
    };
  }
  return { success: true, message: "確認メールを送信しました" };
}
