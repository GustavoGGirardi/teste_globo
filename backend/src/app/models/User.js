import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    //select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 8);

  return true;
});

UserSchema.methods.compareHash = function (password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.generateToken = function ({ id }) {
  return jwt.sign({ id }, authConfig.secret, {
    expiresIn: authConfig.exIn,
  });
};

UserSchema.plugin(mongoosePaginate);

export default mongoose.model('User', UserSchema);
