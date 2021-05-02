import { gql, useMutation } from '@apollo/client'

const CREATE_POST_MUTATION = gql`
  mutation createPost($title: String!) {
    createPost(postDetails: {title: $title}){
      id
      title
  }
  }
`

export default function Submit() {
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION)
  console.log(createPost)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    form.reset()

    createPost({
      variables: { title },
      update: (cache, { data: { createPost } }) => {
        cache.modify({
          fields: {
            posts(existingPosts = []) {
              const newPostRef = cache.writeFragment({
                data: createPost,
                fragment: gql`
                  fragment NewPost on Post {
                    id
                    title
                    type
                  }
                `
              });
              return [...existingPosts, newPostRef];
            }
          }
        })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create a post</h1>
      <input placeholder="title" name="title" type="text" required />
      <button type="submit" disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}
