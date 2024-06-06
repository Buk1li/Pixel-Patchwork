
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import Header from './components/Header';
import Footer from './components/Footer';

import {useEffect} from 'react';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const font =  "'Pixelify Sans', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Pixelify Sans',
      'normal'
    ].join(',')
  }
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
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

//MUI dark mode base line 
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  useEffect(() =>{

  },[])

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={darkTheme}>

      <CssBaseline/>
      <div className="">
        <Header />
        <div className="">
          <Outlet />
        </div>
      </div>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;