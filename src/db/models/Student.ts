import {
  Document, Model, model, Schema
} from 'mongoose'

interface StudentAttributes extends Document {
  id?: string
  name?: string
  email?: string
  created_at?: string
  updated_at?: string
}

export interface StudentInput extends StudentAttributes {}
export interface StudentOuput extends StudentAttributes {}

const Studentschema: Schema = new Schema({
  name: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    index: true
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true
  }
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });

const Student: Model<StudentAttributes> = model('Student', Studentschema);

export default Student;
