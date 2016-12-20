let log$$ = false

const
  Post = require('./models/post'), // User data type

  findAll = () => {
    return Post.find()
  }

  findPosts_ = (query) => {
    return Post.find({$text: {$search: query}})
  }

module.exports = class Posts {

  constructor(log$) {
    log$$ = log$ // Log is turned on while it is true
  }

  createPost(title, body){

    let post = new Post()
    post.title = title
    post.body = body
    return post.save()
  }

  findPosts(query){

    if (query == ''){
      return findAll()
    } else {
      return findPosts_(query)
    }
  }

  getPost(id){

    return Post.findById(id)
  }

  updatePost(id, title, body){

    return new Promise((resolve, reject) => {
      Post.findById(id)
        .then(post => {

          post.title = title;
          post.body = body;

          post.save()
            .then(() => resolve(), err => reject(err))

        }, err => reject(err))
    })
  }


}

