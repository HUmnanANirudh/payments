import mongoose, { connect, Schema, model } from "mongoose";
import { genSalt, hash, compare } from "bcrypt";

connect(
  "mongodb+srv://tanirudhganesh:valtisbest@cluster0.gntytop.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const userSchema = Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, minLength: 6 },
  Firstname: { type: String, required: true },
  Lastname: { type: String, required: true }
});

userSchema.methods.createHash = async function (plainTextPassword) {
  // Hashing user's salt and password with 10 iterations,
  const saltRounds = 10;

  // First method to generate a salt and then create hash
  const salt = await genSalt(saltRounds);
  return await hash(plainTextPassword, salt);

  // Second mehtod - Or we can create salt and hash in a single method also
  // return await bcrypt.hash(plainTextPassword, saltRounds);
};

// Validating the candidate password with stored hash and hash function
userSchema.methods.validatePassword = async function (candidatePassword) {
  return await compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

const accountSchema = new mongoose.Schema({
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  balance: {type: Number,required: true}
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
	User,
  Account,
};