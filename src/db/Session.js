import { model, Schema } from 'mongoose';

const sessionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users', //це типу з якої таблиці було взято (MongoBD)
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessTokenValidUntil: {
      type: Date,
      required: true,
    },
    refreshTokenValidUntil: {
      type: Date,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;
