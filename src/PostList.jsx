import React from 'react';

import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import LoadMoreButton from './LoadMoreButton';

// CSS for space-y-4
const styles = `
  .space-y-4 > * + * {
    margin-top: 1rem; /* This is equivalent to Tailwind's 4 spacing units */
  }
`;

// Simulated API call
const fetchPosts = async ({ pageParam = 1 }) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=10`);
  const data = await response.json();
  return { data, nextPage: pageParam + 1, totalPages: 10 };
};

const PostList = () => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
      } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        initialPageParam: 1,
        getNextPageParam: (lastPage) => 
          lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
      });
    
      if (status === 'pending') return <div>Loading...</div>;
      if (status === 'error') return <div>An error occurred</div>;


      const handleLoadMore = () => {
        if (hasNextPage) {
          fetchNextPage();
        }
      };


      return (
        <>
        <style>{styles}</style>
        <div className="space-y-4">
          {data.pages.map((page, i) => (
            <React.Fragment key={i}>
              {page.data.map(post => (
                <div key={post.id} className="border p-4 rounded">
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p>{post.body}</p>
                </div>
              ))}
            </React.Fragment>
          ))}
           <button 
          onClick={handleLoadMore} 
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'Nothing more to load'}
        </button>
        </div>
        </>
      );



};

export default PostList;
