import React, { Component } from 'react';
import BookList from './components/BookList';
import ApolloClient from 'apollo-boost';
import{ApolloProvider} from 'react-apollo'
import AddBook from './components/AddBook';
import AddAuthor from './components/AddAuthor';

//apollo client setup 
const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

class App extends Component {
  render() {
    
    return (
      //wrapper to inject information from server 
      <ApolloProvider client={client}> 
        <div id="main">
          <h1>
            BOOK KEEP 
          </h1>
          <BookList />
          <AddBook />
          {/* <AddAuthor/> */}
          
        </div>
      </ApolloProvider>
    );
  }
}

export default App;