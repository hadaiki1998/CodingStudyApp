// auth/action.ts
"use server";

import { createServerClient } from "@/app/utils/server";
// import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = createServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log(data);

  if (error) {
    console.error("サインアップ失敗:", error.message);
    return { success: false, message: error.message };
  }

  return { success: true, message: "確認メールを送信しました" };
}

// const { user, session, error } = await supabase.auth.signIn({
//   email: "example@email.com",
//   password: "example-password",
// });
