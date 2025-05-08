// lib/supabase/server.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Supabaseのサーバーサイド用クライアントを作成する関数
export const createServerClient = () => {
  return createServerComponentClient({
    cookies, // ヘッダーのクッキーから認証情報を読み取る
  });
};
