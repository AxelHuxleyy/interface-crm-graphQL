import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import fetch from "node-fetch";
import { setContext } from 'apollo-link-context'

const HttpLink = createHttpLink({
    uri: 'https://hidden-shore-22759.herokuapp.com/',
    fetch
})

/*https://hidden-shore-22759.herokuapp.com/*/
const authLink = setContext((_, {headers}) =>{

    const token = localStorage.getItem('token');
    return{
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
})

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat(HttpLink)
});

export default client;