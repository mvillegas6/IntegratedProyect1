import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  description: {
    type: String,
    default: '',
  },
  profilePic: {
    type: Object
  },
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  likes: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
    default: [],
  },
  degree: {
    type: String,
    enum: [
      'Administración de Negocios',
      'Negocios Internacionales',
      'Contaduría Pública',
      'Mercadeo',
      'Ciencias Políticas',
      'Comunicación Social',
      'Diseño Interactivo',
      'Música',
      'Literatura',
      'Psicología',
      'Economía',
      'Finanzas',
      'Derecho',
      'Ingeniería Mecánica',
      'Ingeniería de Procesos',
      'Ingeniería de Producción',
      'Ingeniería de Sistemas',
      'Ingeniería Agronómica',
      'Biología',
      'Geología',
      'Ingeniería Matemática',
      'Ingeniería Física',
      'Ingeniería Civil',
      'Ingeniería de Diseño de Producto',
      'Diseño urbano y gestion habitad',
    ],
  },
  faculty: {
    type: String,
  },
  password:{
    type:String,
    required:true,
  }
});


export const User = mongoose.model('User', userSchema);