import { CreatePost } from './components/CreatePost'
import { PostFilter } from './components/PostFilter'
import { PostList } from './components/PostList'
import { PostSorting } from './components/PostSorting'
import { useQuery } from '@tanstack/react-query'
import { getPosts } from './api/posts.js'

export function Blog() {
  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })

  const posts = postsQuery.data ?? []
  
  return (
    <div style={{ padding: 8 }}>
      <CreatePost />
      <br />
      <hr />
      Filter by:
      <PostFilter field='author' />
      <br />
      <PostSorting fields={['createdAt', 'updatedAt']} />
      <hr />
      <PostList posts={posts} />
    </div>
  )
}
