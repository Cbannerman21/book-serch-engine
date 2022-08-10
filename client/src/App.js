import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import SearchBooks from './pages/SearchBooks';
import SavedBooks from './pages/SavedBooks';
import Navbar from './components/Navbar';

// Building our GraphQL API endpoint
const httpLink = createHttpLink({
  eri: '/graphql',
});

//Building request middleware that will attach the JWT token to every request as an 'authorization' header
const authLink = setContext((_, { headers }) => {
  // get the auth token from local storage
  const token = localStorage.getItem('id_token');
  // return the headers to the context so that httpLink can read them
  return { 
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }, 
  };
});

const client = new ApolloClient({
  // set up our client to execute `authLink` middleware prior to making a request to our GraphQL API
  link: authLink.contact(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path='/' component={SearchBooks} />
          <Route exact path='/saved' component={SavedBooks} />
          <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
        </Switch>
      </>
    </Router>
    </ApolloProvider>
  );
}

export default App;
