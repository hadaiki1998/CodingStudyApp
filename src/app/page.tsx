"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="p-4">
      <h1 className="text-4xl">プログラミング学習記録アプリ</h1>
      <Link href="/auth" className="text-2xl  text-red-400">
        <Button className="border-2 bg-blue-600">loginページへ</Button>
      </Link>
      <br />
      <br />
    </div>
  );
}
