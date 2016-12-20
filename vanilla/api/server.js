const
  express    = require('express'),        // call express
  app        = express(),                 // define our app using express
  bodyParser = require('body-parser'),
  router     = express.Router(),

  mongoose   = require('mongoose'),       // MongoDB ORM

  port = process.env.PORT || 3000,        //8080,
  MDB_URL = 'mongodb://user:password@ds119548.mlab.com:19548/express4-sample',

  log$ = true


// == PARSER SETUP
// ================================================================================

app.use(bodyParser.urlencoded({ extended: true }))
// parse application/x-www-form-urlencoded

app.use(bodyParser.json())
// parse application/json
// about postman test: http://stackoverflow.com/a/25904070

// == DATA TOOLSET

const
  auth = new (require('./auth'))(),  // User data type
  posts = new (require('./posts'))() // Post data type


// == MIDDLEWARE
// ================================================================================

  router.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", /* 'http://localhost:3030' */ "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.header("Access-Control-Allow-Headers", "Content-Type" /*"Origin, X-Requested-With, Content-Type, Accept"*/);
    // CORS filtering

    console.log(req.method, req.url);
    // Job login

    next();
  })

// == ROUTES
// ================================================================================

  router.get('/', (req, res) => {
      res.json({ message: 'Howdy! Welcome to DinoAPI! :)' })
  })

  router.route('/posts')
  // on routes that end with /dinos

    .post((req, res) => posts.createPost(req.body.title, req.body.body)
      .then(() => res.json({ message: 'Post created!' }), err => res.send(err))
    )

    .get((req, res) => posts.findPosts(req.query['q'])
      .then(posts => res.json(posts), err => res.send(err))
      //res.json(require("./data/posts.json"))
    )

  router.route('/posts/:post_id')
  // on routes that end in /dinos/:dino_id

    .get((req, res) => posts.getPost(req.params.post_id)
      .then(post => res.json(post), err => res.send(err))
    )

    .put((req, res) => posts.updatePost(req.params.post_id, req.body.title, req.body.body)
      .then(() => res.json({ message: 'Post updated!' }), err => res.send(err))
    )

  router.route('/auth/login')
  // on routes that end with /dinos

      .post((req, res) => {

        //auth.loginWithId(req.body) // email has to be placed in username field
        auth.loginWithEmail(req.body) // email has to be placed in username field
          .then(usr => res.json({ message: 'login succeed', user: usr, token: usr._id }), err=>res.send(err))
      })

  router.route('/auth/signup')
  // on routes that end with /dinos

      .post((req, res) => {

        //auth.createUserById(req.body)
        auth.createUserByEmail(req.body)
          .then(usr => res.json({ message: 'user created', user: usr, token: usr._id }), err=>res.send(err))
      })

  app.use('/api', router)

// == MANGOOSE SETUP
// ================================================================================

  console.log("Mongoose version:", mongoose.version);
  // Pront the mongoose version

  mongoose.Promise = Promise;
  // Attach ES6 promises to mongoose

  mongoose.connect(MDB_URL) // connect to our database
  // I've used [Mongolab](https://mlab.com) free account within 500MB of sandbox.

  mongoose.connection
  // With DB connection...

    .on('error', console.error.bind(console, 'connection error:'))
    // Notify about DB errors is any.

    .once('open', () => {
    // Start the app when (if) DB is ready.

      console.log('Database Connected')

// == API START
// ================================================================================

      app.listen(port)
      console.log('🌍 \x1b[36m API run on port ' + port+'\x1b[39m')


  });
