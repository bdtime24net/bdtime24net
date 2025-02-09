// /src/app/update/[id].tsx
import React from 'react';
import UpdateNewsForm from '@/components/molecules/v2/UpdateNewsForm';

interface UpdateArticlePageProps {
  params: {
    id: string; // Define the type of the id parameter
  };
}

const UpdateArticlePage: React.FC<UpdateArticlePageProps> = ({ params }) => {
  const { id } = params; // Get the article ID from the URL parameters

  return (
    <div className="container mx-auto p-4">
      <UpdateNewsForm articleId={id} />
    </div>
  );
};

export default UpdateArticlePage;