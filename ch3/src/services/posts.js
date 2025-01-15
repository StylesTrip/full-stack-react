import { Post } from '../db/models/post'

export async function createPost({title, author, contents, tags}) {
    const post = new Post({title, author, contents, tags})
    return await post.save()
}
