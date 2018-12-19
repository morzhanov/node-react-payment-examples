export const {
  NODE_ENV,
  API_URL,
  API_URI,
  PORT,
  SYSTEM_API_URI,
  SECRET,
  CDN_URL,
  MAILGUN_DOMAIN,
  MAILGUN_FROM,
  MAILGUN_API_KEY,
  ACCESS_TOKEN_EXPIRES
} = process.env;

export enum MeasurmentSystem {
  METRIC,
  IMPERIAL
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export enum LinkType {
  SHARE,
  GOOGLE_PLUS,
  FACEBOOK,
  TWITTER,
  LINKED_IN,
  CUSTOM,
  PHOTO_URL
}

export enum UserAccountType {
  GOOGLE_PLUS,
  FACEBOOK
}

export const MIME_TYPES = {
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  BMP: 'image/bmp'
};

export enum TokenTypes {
  BEARER_TOKEN,
  VERIFY_EMAIL_TOKEN,
  RESET_EMAIL_TOKEN,
  RESET_PASSWORD_TOKEN
}
