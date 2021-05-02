import { gql, useQuery, NetworkStatus } from '@apollo/client'
import ErrorMessage from './ErrorMessage'

export const LIST_POSTS_QUERY = gql`
  query allPosts {
    posts{
      id
      title
    }
  }
`

export default function ListPosts() {
  const { loading, error, data, networkStatus } = useQuery(
    LIST_POSTS_QUERY,
  )

  const loadingHello = networkStatus === NetworkStatus.fetchMore

  if (error) return <ErrorMessage message="Error loading hello." />
  if (loading && !loadingHello) return <div>Loading</div>

  const { posts } = data

  return (
    <section>
      POSTS
      <br /><br />
      {posts.map((post) => <div>{post.title}</div>)}
    </section>
  )
}
