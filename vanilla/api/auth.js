let log$$ = false

const
  User = require('./models/user'), // User data type

  findUserByEmail = (email)=>{
  // Returns the only (the first) user found by given id

    log$$ && console.info('Looking for user by email:',email)

    return User.findOne({ 'email': email }, 'username firstName lastName password email')

  },

  findUserById = (id)=>{
  // Returns user found by id (email or username)
  // rejects if several records found

    log$$ && console.info('Looking for user by id:',id)

    return new Promise((resolve, reject) => {
      User.find(
        {$text: {$search: id}}
      )
        .then(usrs => {
          if (usrs.length > 1){
            log$$ && console.info('Several records found for:',id,usrs.length)
            reject({error: 'Incorrect login'})
          } else {
            resolve(usrs[0]) // return the user's record
          }
        }, err => reject(err))
    })
  },

  createUser = (creds)=>{
  // Creates user without any checks.
  // WARNING: It's posible to get dublicates.

    log$$ && console.info('Creating user:',creds)

    let user        = new User()
    // create user record
    user.username   = creds.username
    user.firstName  = creds.firstName
    user.lastName   = creds.lastName
    user.email      = creds.email
    user.password   = creds.password

    return new Promise((resolve, reject) => {
      user.save()
      // send the record to database
      .then(()=>{

        findUserByEmail(creds.email)
        // find the created user by its email
          .then(usr => {
            log$$ && console.info('User created:',usr._id) // usr._id is using as the token

            // resolve the user creation with created token
            resolve(usr)
          }, err => {
            log$$ && console.error('Unable to create user:', creds.email) // usr._id is using as the token
            reject(err)
          })
      }, err => reject(err))
    })
  },

  resolveUser = (usr, password, id)=>{
  // Resolvs db found in depends of its status
  // usr - user data found in db
  // password - got from fe, neccesary to validate
  // id - was used to find the user in db

    return new Promise((resolve, reject) => {

      if(!usr) {
      // when user doesn't exist

        log$$ && console.info('User not found:',id)
        reject({error: 'Incorrect login'})

      } else if (password !== usr.password){
      // when password incorrect

        log$$ && console.info('Wrong password:',id)
        reject({error: 'Incorrect login'})

      } else {
      // When login succeed

        log$$ && console.info('Login succeed:',usr)
        resolve(usr)
      }
    })
  }

module.exports = class Auth {

  constructor(log$) {
    log$$ = log$ // Log is turned on while it is true
  }

  createUserByEmail(creds){
  // No email dublication is alloved
  // resolve(usr)

    log$$ && console.info('User creation:\n',creds)

    return new Promise((resolve, reject) => {

      //this.findUserByEmail(creds.email)
      findUserByEmail(creds.email)
      // check if the user exists

        .then(usr => {
        // usr === null - user doesn't exist

          if(usr) {
          // if the user (email) is alredy exist

            log$$ && console.info('Email dublication detected:',usr._id) // usr._id is using as the token
            reject({error: 'Email dublication'}) // reject dublicated emeil

          } else {
          // if new email is detected

            log$$ && console.info('Unique email detected:', creds.email) // usr._id is using as the token

            createUser(creds)
              .catch(err => reject(err))
              .then(usr => resolve(usr))

          }
        }, err => {
          log$$ && console.error('Unable to check email:', creds.email) // usr._id is using as the token
          reject(err)
        })
      })
  }

  createUserById(creds){
  // No email dublication is alloved
  // resolve(usr)

    log$$ && console.info('User creation:\n',creds)

//def = new deferred();
    return new Promise((resolve, reject) => {

      //let id = '\"'+creds.email+'\" \"'+creds.username+'\"'
      let id = '\"'+creds.email+'\" \"'+creds.username+'\"'
      //this.findUserByEmail(creds.email)
      findUserById(id)
      // check if the user exists

        .then(usr => {
        // usr === null - user doesn't exist
console.log('THEN')
          console.log(usr)
          if(usr) {
          // if the user (email) is alredy exist

console.log('OPT1')
            log$$ && console.info('Dublication of user:',usr._id) // usr._id is using as the token
            reject({error: 'User exists'}) // reject dublicated emeil

          } else {
          // if new email is detected

console.log('OPT2')
            log$$ && console.info('Unique id detected:', id) // usr._id is using as the token

            createUser(creds)
              .catch(err => reject(err))
              .then(usr => resolve(usr))
          }
        })
      }, err => {
console.log('ERROR')
          log$$ && console.error(err, id) // usr._id is using as the token
          reject(err)
          return
        })
  }

  loginWithEmail(creds){
  // resolve(usr)

    log$$ && console.info('Login attempt:\n',creds)

    let email = creds.username // convert username to email

    return new Promise((resolve, reject) => {
      findUserByEmail(email)
        .then(usr => {

          resolveUser(usr, creds.password, email)
            .catch(err => reject(err))
            .then(usr => resolve(usr))

        }, err => {
          log$$ && console.error('Login attempt error:', email)
          reject(err)
        })
    })
  }

  loginWithId(creds){
  // resolve(usr)
  // Any ID (email or username) can be used
  // Note: The ID (email or username) has to be unique,
  // othercase the login will be rejected

    log$$ && console.info('Login attempt:\n',creds)

    let id = creds.username // convert username to email

    return new Promise((resolve, reject) => {
      findUserById(id)
        .then(usr => {

          console.log("RESOLVNG USER")
          resolveUser(usr, creds.password, id)
            .catch(err => reject(err))
            .then(usr => resolve(usr))
        }, err => {
          log$$ && console.error('Login attempt error:', id)
          reject(err)
        })
    })
  }

}
