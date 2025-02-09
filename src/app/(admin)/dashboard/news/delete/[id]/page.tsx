// /src/app/delete/[id].tsx

import React from 'react';
import DeleteArticle from '@/components/molecules/v2/DeleteArticle';

interface DeleteArticlePageProps {
  params: {
    id: string; // Define the type of the id parameter
  };
}

const DeleteArticlePage: React.FC<DeleteArticlePageProps> = ({ params }) => {
  const { id } = params; // Get the article ID from the URL parameters

  return (
    <div className="container mx-auto p-4">
      <h1>Update Article</h1>
      {/* Render the delete button component */}
      <DeleteArticle articleId={id} />
      {/* Here, you would also render the form to update the article */}
    </div>
  );
};

export default DeleteArticlePage;
