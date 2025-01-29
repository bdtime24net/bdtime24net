
// app/news/page.tsx
import { getAllPosts } from "@/hooks/news/useNews";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from 'date-fns';

export default async function NewsPage() {
  const newsData = await getAllPosts();

  if (!newsData.articles.length) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">News</h1>
        <p className="text-red-500">No articles available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">News</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {newsData.articles.map((article) => (
          <article key={article._id} className="border rounded-lg overflow-hidden shadow-lg">
            <div className="relative h-48">
              <picture>
              <img
                src={article.imageUrl}
                alt={article.title}
                className="object-cover"
              />
              </picture>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  {article.category}
                </span>
                <span className="text-gray-500 text-sm">
                  {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}
                </span>
              </div>
              <Link href={`/news/${article._id}`}>
                <h2 className="text-xl font-bold mb-2 hover:text-blue-600">
                  {article.title}
                </h2>
              </Link>
              <p className="text-gray-600 text-sm mb-4">
                {article.subtitle}
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>👁 {article.views}</span>
                  <span>❤️ {article.likes}</span>
                  <span>💬 {article.commentsCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>{article.location}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        {newsData.prevPage && (
          <Link 
            href={`/news?page=${newsData.prevPage}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Previous
          </Link>
        )}
        {newsData.nextPage && (
          <Link 
            href={`/news?page=${newsData.nextPage}`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
}