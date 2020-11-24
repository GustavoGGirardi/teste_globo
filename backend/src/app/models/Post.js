import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  body: {
    type: String,
    trim: true,
    required: true,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Post', PostSchema);
