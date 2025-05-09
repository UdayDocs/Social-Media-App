// main.tsx
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink, HttpOptions } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/main.scss';

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
  credentials: 'include',
  fetchOptions: {
    mode: 'cors',
  },
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);