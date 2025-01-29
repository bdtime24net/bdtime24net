import { getAllPosts } from "@/hooks/news/useNews";
import  getNews  from "@/hooks/news/useNewsDtails";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image";
import { notFound } from 'next/navigation';

interface Params {
  id: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = params;
  const article = await getNews(id);
  
  if (!article) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: article.title,
    description: article.subtitle,
    openGraph: {
      images: [article.imageUrl],
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { id } = params;
  const article = await getNews(id);

  if (!article) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <span>{article.category}</span>
          <span>•</span>
          <span>{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true })}</span>
          <span>•</span>
          <span>{article.location}</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{article.subtitle}</p>
      </div>
      
      <div className="relative h-96 mb-8">
      <picture>
      <img
          src={article.imageUrl}
          alt={article.title}
          className="object-cover rounded-lg"
        />
      </picture>
      </div>

      <div className="prose max-w-none">
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      <div className="mt-8 flex items-center justify-between border-t pt-6">
        <div className="flex items-center gap-4">
          <span>👁 {article.views} views</span>
          <span>❤️ {article.likes} likes</span>
          <span>💬 {article.commentsCount} comments</span>
        </div>
        <div className="flex gap-2">
          {article.tags.map((tag: any)  => (
            <span 
              key={tag}
              className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  const newsData = await getAllPosts();
  return newsData.articles.map((article) => ({
    id: article._id,
  }));
}