import { getArticleById } from "@/hooks/article/getById";
import { getAllArticle } from "@/hooks/article/getAllArticle";
import { formatDistanceToNow } from "date-fns";
import { notFound } from "next/navigation";
import { Button } from "antd"; // Importing Ant Design Button
import Link from "next/link";

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
      <header className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">{articleData.headline}</h1>
      </header>

      <section className="text-xl text-gray-600 mb-6">
        <span className="text-gray-500">
          {formatDistanceToNow(new Date(articleData.publishedAt), { addSuffix: true })}
        </span>
      </section>

      <section className="mt-6">
        <picture>
          <img
            src={articleData.urlToImage?.[0] || "/default-image.jpg"}
            alt={articleData.headline}
            width={1200}
            height={600}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </picture>
      </section>

      <section className="mt-6 text-lg text-gray-700">
        <p>{articleData.description}</p>
      </section>

      <section className="text-sm px-3 py-1 rounded-full mt-6">
        <p>{articleData.keywords}</p>
      </section>

      <footer className="mt-8">
        <Link href={`/`} >
        <Button type="primary" className="mr-4">
          Read More
        </Button>
        </Link>
        <Button type="default">
          Share
        </Button>
      </footer>
    </article>
  );
}

export async function generateStaticParams() {
  const newsData = await getAllArticle(0, 7);
  return newsData.articles.map((article) => ({
    id: article.id,
  }));
}
