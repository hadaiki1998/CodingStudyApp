"use client";

import { useState } from "react";
import { registerUser } from "./action"; // Server Actionをimport
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await registerUser(formData);
    setMsg(result.message);
  };

  return (
    <div>
      <h2 className="text-xl font-bold">サインアップ</h2>
      <input
        className="border p-2"
        placeholder="メール"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border p-2 mt-2"
        type="password"
        placeholder="パスワード"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        className="bg-blue-600 text-white px-4 py-2 mt-2"
        onClick={handleSubmit}
      >
        登録
      </Button>
      <p className="mt-2">{msg}</p>
    </div>
  );
}
