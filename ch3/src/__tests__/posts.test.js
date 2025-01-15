import mongoose from 'mongoose'
import { describe, expect, test } from '@jest/globals'
import { createPost } from '../services/posts'
import { Post } from '../db/models/post'

describe('creating posts', () => {
  test('with all parameters should succeed', async () => {
    const post = await createPost({
      title: 'Hello Mongoose!',
      author: 'Daniel Bug1',
      contents: 'This post is stored in a MongoDB database using Mongoose.',
      tags: ['mongoose', 'mongodb'],
    })
    expect(post._id).toBeInstanceOf(mongoose.Types.ObjectId)

    const foundPost = await Post.findById(post._id)
    expect(foundPost).not.toBeNull()
    expect(foundPost.createdAt).toBeInstanceOf(Date)
    expect(foundPost.updatedAt).toBeInstanceOf(Date)
  })

  test('creating posts without title should fail', async () => {
    try {
      const post = await createPost({
        author: 'Daniel Bug1',
        contents: 'This post is stored in a MongoDB database using Mongoose.',
        tags: ['mongoose', 'mongodb'],
      })
    } catch (err) {
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
      expect(err.message).toContain('`title` is required')
    }
  })

  test('creating posts with minimal parameters should succeed', async () => {
    const post = await createPost({
      title: 'Hello Mongoose!',
    })
    expect(post._id).toBeInstanceOf(mongoose.Types.ObjectId)
  })
})
