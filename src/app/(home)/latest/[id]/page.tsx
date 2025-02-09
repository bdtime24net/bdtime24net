// /src/app/(home)/latest/[id]/page.tsx
import { getArticleById } from "@/hooks/article/getById";
import { getAllArticle } from "@/hooks/article/getAllArticle";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";

interface Params {
  id: string;
}

export async function generateMetadata({ params }: { params: Params }) {
  const { id } = params;
  const articleData = await getArticleById(id);

  if (!articleData) {
    return {
      title: 'Article Not Found',
      description: 'The requested article could not be found.',
    };
  }

  return {
    title: articleData.headline,
    description: articleData.description,
    openGraph: {
      images: articleData.urlToImage || [],
    },
  };
}

export default async function ArticlePage({ params }: { params: Params }) {
  const { id } = params;
  const articleData = await getArticleById(id);

  if (!articleData) {
    notFound(); // Display 404 page if article is not found
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl mt-16">
      <header>
        <h1 className="text-3xl font-semibold">{articleData.headline}</h1>
        <p className="text-sm text-gray-500">
          Published {formatDistanceToNow(new Date(articleData.publishedAt))} ago
        </p>
      </header>

      <section className="mt-6">
       <picture>
       <img
          src={articleData.urlToImage?.[0] || "/default-image.jpg"}
          alt={articleData.headline}
          width={1200}
          height={600}
          className="w-full h-auto rounded-lg"
        />
       </picture>
      </section>

      <section className="mt-6">
        <p>{articleData.description}</p>
      </section>
    </article>
  );
}

export async function generateStaticParams() {
  const newsData = await getAllArticle(1, 10);
  return newsData.articles.map((article) => {
    id: article.id;
  })
}
