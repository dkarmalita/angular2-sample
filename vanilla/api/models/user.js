/*
export interface User {
  id?: number;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAt?: string;
  createdBy?: string;
}
 */

let mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    UserSchema   = new Schema({
//        _id: Schema.Types.ObjectId,
        username: String,
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String, default: '' }
    })

  UserSchema.index({username: 'text', email: 'text'});    // list of fields can be used to find user
  //UserSchema.index({'$**': 'text'});                    // All string fields

module.exports = mongoose.model('User', UserSchema);
