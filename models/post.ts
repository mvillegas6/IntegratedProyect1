import { string } from 'joi';
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const post = new Schema({
    title: String,
    author: String,
    body: String,
    votes: Number,
    faculty: String,
    degree: {
        type: String,
        enum: [
            'Administración de Negocios',
            'Negocios Internacionales',
            'Contaduría Pública',
            'Mercadeo',
            'Música',
            'Comunicación Social',
            'Psicología',
            'Literatura',
            'Diseño Interactivo',
            'Finanzas',
            'Economía',
            'Ciencias Políticas',
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
    image: Array,
});

export const Post = mongoose.model('Post', post);
