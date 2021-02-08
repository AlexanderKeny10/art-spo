import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import SearchArtist from './pages/SearchArtist';
import SavedArtist from './pages/SavedArtist';
import Navbar from './components/Navbar';


const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql'
});

function App() {
  return (
    <div>
      <ApolloProvider client={client}>
        <Router>
          <>
            <Navbar />
            <Switch>
              
              <Route exact path='/' component={SearchArtist} />
              <Route exact path='/saved' component={SavedArtist} />
              <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
            </Switch>
          </>
        </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
