import mongoose from 'mongoose';

const lawyerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: false },
  speciality: { type: String, required: false },
  degree: { type: String, required: false },
  experience: { type: Number, required: false },
  about: { type: String, required: false },
  fees: { type: Number, required: false },
  address: { type: Object, required: false }, // Address as an object
  date: { type: Date, default: Date.now },
});

const Lawyer = mongoose.model('Lawyer', lawyerSchema);

export default Lawyer;
