const Account = require("../accounts/model")
const Post = require("./model")

const helpers = require("../../helpers")

module.exports = {
  // ---------------------------------------------------------------------------
  // GET /posts
  get: (req, res) => {
    // Find all resources
    Post.find({}, (err, resources) => {
      res.send({
        data: resources
      })
    })
  },

  // ---------------------------------------------------------------------------
  // GET /posts/:id
  getById: (req, res) => {
    // Find one resource
    Post.findOne({ id: Number(req.params.id) }, (err, account) => {
      res.send({
        params: req.params,
        data: account
      })
    })
  },

  // ---------------------------------------------------------------------------
  // POST /posts
  post: (req, res) => {
    try {
      // Create new resource object
      const newPost = new Post({
        author: req.body._id,
        title: req.body.title || "",
        content: req.body.content || "",
        image_name: req.body.image_name || "",
        image_url: req.body.image_url || ""
      })

      // Save the resource
      newPost.save((error) => {
        res.send({
          message: "New post has been saved",
          data: newPost
        })
      })
    } catch (error) {
      // Response an error
      res.send({
        message: "Something went wrong when posting new post"
      })
    }
  },

  // ---------------------------------------------------------------------------
  // DELETE /posts
  delete: (req, res) => {
    // Remove all resources
    Post.remove({}, (error, account) => {
      res.send({
        message: "All posts have been deleted"
      })
    })
  },

  // ---------------------------------------------------------------------------
  // DELETE /posts/:id
  deleteById: (req, res) => {
    // Remove one resource by id
    Post.remove({ id: Number(req.params.id) }, (error, account) => {
      res.send({
        message: `Post with id: ${id} has been deleted`,
        data: account
      })
    })
  },

  // ---------------------------------------------------------------------------
  // PUT /posts/:id
  putById: (req, res) => {
    // Create new resource object data
    const newPost = {
      title: req.body.title,
      content: req.body.content
    }

    // Find one resource and update with new data
    Post.findOneAndUpdate(
      {
        id: Number(req.params.id)
      },
      { $set: newPost },
      {
        new: true, // return the modified document
        upsert: false // create new resource if not exist
      },
      (error, resource) => {
        if (error) res.send({ message: "Error when updating post" })
        res.send({
          message: `Post with id: ${id} has been updated`,
          data: resource
        })
      }
    )
  }
}
