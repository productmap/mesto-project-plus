import {
  Document, Model, model, Schema,
} from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import UnauthorizedError from '../middlewares/errors/UnauthorizedError';

interface IUser {
  name: string;
  about: string;
  avatar: string;
  email: string;
  password: string;
}

interface UserModel extends Model<IUser> {
  findUserByCredentials: (
    email: string,
    password: string
  ) => Promise<Document<unknown, any, IUser>>;
}

const userSchema = new Schema<IUser, UserModel>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (link: string) => validator.isURL(link, {
        protocols: ['http', 'https'],
        require_protocol: true,
      }),
      message: 'Неправильный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: 'Неправильный формат почты',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.static(
  'findUserByCredentials',
  async function findUserByCredentials(email: string, password: string) {
    const user = await this.findOne({ email }).select('+password');
    if (!user) {
      return Promise.reject(
        new UnauthorizedError('Неправильные почта или пароль'),
      );
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return Promise.reject(
        new UnauthorizedError('Неправильные почта или пароль'),
      );
    }
    return user;
  },
);

export default model<IUser, UserModel>('User', userSchema);
