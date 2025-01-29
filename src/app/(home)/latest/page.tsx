// app/article/page.tsx
import { getAllArticle } from "@/hooks/article/useAeticle";
import Link from "next/link";

export default async function ArticlePage() {
  const newsData = await getAllArticle();

  console.log(newsData)


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mt-24">News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <h1>
          All News  Lorem ipsum dolor sit amet, consectetur adipisicing elit. A in doloribus perferendis corrupti non reprehenderit? Corporis nulla quaerat amet recusandae impedit reiciendis ad tempore enim libero distinctio aperiam, quod blanditiis!
        </h1>
      </div>
    </div>
  );
}
