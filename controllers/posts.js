const { successHandle, errorHandle } = require('../service')
const Post = require('../models/postsModel')
const posts = {
  async getPosts (req, res) {
    const allPosts = await Post.find()
    successHandle(res, allPosts)
  },
  async createPost (req, res) {
    // console.log(req.body)  express 下不用解析 body 
    try {
      const { body } = req
      if (body.name && body.content) {
        const newPost = await Post.create({
          name: body.name,
          image: body.image,
          content: body.content,
          likes: body.likes
        })
        successHandle(res, newPost)
      } else {
        errorHandle(res)
      }
    } catch (err) {
      errorHandle(res, err)
    }
  },
  async deletePosts (req, res) {
    const posts = await Post.deleteMany({})
    successHandle(res, posts)
  },
  async deletePost (req, res) {
    try {
      const { id } = req.params
      const deletePost = await Post.findById(id)
      const result = await Post.findByIdAndDelete(id)
      result ? console.log('yes', result) : console.log('no')
      result ? successHandle(res, deletePost) : errorHandle(res)
    } catch (err) {
      errorHandle(res, err)
    }
  },
  async patchPost (req, res) {
    try {
      const { id } = req.params
      const { body } = req
      const requiredFields = ['name', 'content']
      const updateFields = Object.keys(body)
      let hasValueAmount = 0
      let hasFieldAmount = 0
      updateFields.forEach(updateField => {
        requiredFields.forEach(requiredField => {
          if (updateField === requiredField) {
            hasFieldAmount++
            if (body[requiredField]) {
              hasValueAmount++
            }
          }
        })
      })
      if (hasFieldAmount === hasValueAmount) {
        const result = await Post.findByIdAndUpdate(id, body)
        const updatePost = await Post.findById(id)
        result ? successHandle(res, updatePost) : errorHandle(res)
      } else {
        errorHandle(res)
      }
    } catch (err) {
      errorHandle(res, err)
    }
  }
}

module.exports = posts
