import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import ListPosts, {LIST_POSTS_QUERY} from '../components/ListPosts'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const SSRPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>
    <Submit />
    <ListPosts />
  </App>
)

export async function getServerSideProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: LIST_POSTS_QUERY,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default SSRPage
