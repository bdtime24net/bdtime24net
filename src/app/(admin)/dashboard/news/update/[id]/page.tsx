// /src/app/dashboard/news/update/[id].tsx

import UpdateNewsForm from '@/components/molecules/v2/UpdateNewsForm';

export async function generateStaticParams() {
  // Fetch all the articles to generate static paths
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
  const articles = await response.json();

  // Generate the params for each article, assuming `articles` is an array of objects with `id` as a string
  return articles.map((article: { id: string }) => ({
    id: article.id, // This is the dynamic parameter `id`
  }));
}

interface UpdateArticlePageProps {
  params: {
    id: string; // Dynamic parameter for article ID
  };
}

const UpdateArticlePage: React.FC<UpdateArticlePageProps> = ({ params }) => {
  const { id } = params; // Get the article ID from the URL params

  return (
    <div className="container mx-auto p-4">
      <UpdateNewsForm articleId={id} />
    </div>
  );
};

export default UpdateArticlePage;
