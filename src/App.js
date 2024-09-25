
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostList from './PostList'

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PostList />
    </QueryClientProvider>
  );
}

export default App;
