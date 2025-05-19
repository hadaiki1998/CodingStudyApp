import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });
  const { email, password } = await req.json();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  console.log(`エラー：${error}`);

  // クッキーに自動でセットされる
  // （この helpers パッケージを使っていれば）

  return new Response(JSON.stringify(data), { status: 200 });
}
