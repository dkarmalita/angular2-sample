let mongoose     = require('mongoose'),
    Schema       = mongoose.Schema,
    PostSchema   = new Schema({
//        _id: Schema.Types.ObjectId,
        title: String,
        body: String,
        createdAt: { type: Date, default: Date.now },
        createdBy: { type: String, default: '' }
    })

  PostSchema.index({'$**': 'text'});                  // All string fields
  //PostSchema.index({title: 'text', body: 'text'});    // Several string fields
  // Enabling full text search
  // More info at: http://stackoverflow.com/a/28775709

module.exports = mongoose.model('Posts', PostSchema);
