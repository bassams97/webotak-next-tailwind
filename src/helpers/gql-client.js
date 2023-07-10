import { GraphQLClient } from 'graphql-request';

const client = new GraphQLClient(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, { headers: {} })

export function gqlClient({query, variables}) {
  return client.request(query, variables);
}

export default gqlClient
