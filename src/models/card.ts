import mongoose, { Schema } from 'mongoose';
import validator from 'validator';

interface ICards {
  name: string;
  link: string;
  owner: Schema.Types.ObjectId;
  likes: [Schema.Types.ObjectId];
  createdAt: Date;
}

const cardsSchema = new mongoose.Schema<ICards>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isURL(value, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }),
      message: 'Неправильный формат ссылки',
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICards>('card', cardsSchema);
