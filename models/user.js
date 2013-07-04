
var userSchema = mongoose.schema({
    first_name: String
  , last_name:  String
  , username:   String
  , email:      String
  , password:   String
})

var User = mongoose.model('User', userSchema);
