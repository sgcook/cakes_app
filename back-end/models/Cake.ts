import mongoose from 'mongoose';

const cake = new mongoose.Schema({
  id: {
    type: Number  
  },
  name: {
    type: String,
    required: [true, 'A name is required.'],
    unique: true,
  },
  comment: {
    type: String,
    required: [true, 'A comment is required.'],
    minLength: 5,
    maxLength: 200,
  },
  imageUrl: {
    type: String,
    required: [true, 'An imageUrl is required.'],
  },
  yumFactor: {
    type: Number,
    required: [true, 'A yum factor is required.'],
  },
});

const Cake = mongoose.model('Cake', cake);
export default Cake;