// ! configs
import configApi from './../config/configApi.json';
import configSite from './../config/configSite.json';

// ? год создания сайта
export const YEAR = 2023;

const DEFAULT_URL = configSite.default_url;

// ? все пути
export const paths = {
  main: `${DEFAULT_URL}main`,
  admin: {
    main: `${DEFAULT_URL}admin/main`,
    signin: `${DEFAULT_URL}admin/signin`,
    create: `${DEFAULT_URL}admin/create`,
  },
  signin: `${DEFAULT_URL}signin`,
  signup: `${DEFAULT_URL}signup`,
  user: {
    profile: `${DEFAULT_URL}profile`,
  },
  verifyEmail: `${DEFAULT_URL}verifyEmail`,
};

export const LINK_REPOSITORY = 'https://github.com/chyVacheck/crypto';

export const PATTERN_PAGE_USER_ID = /^\/users(\/[a-zA-Z0-9]*)?$/;

export const activeFooterRoutes = [
  paths.admin.main,
  paths.main,
  paths.user.profile,
];

export const VALIDATION = {
  NAME: {
    MIN: 2,
    MAX: 32,
  },
  PASSWORD: {
    MIN: 2,
    MAX: 32,
  },
};

export const STATUS = {
  SIMPLE: configSite.status,
  DEV: configSite.status === 'dev',
  PROD: configSite.status === 'prod',
};

export const SETTINGS_API = {
  baseURL: `${configApi.Main.BaseUrl[STATUS.SIMPLE].url}/v${
    configApi.Main.BaseUrl[STATUS.SIMPLE].version
  }`,
  credentials: configApi.Main.credentials,
  contentType: configApi.contentType,
};

export const typeOfErrorFromServer = {
  failFetch: {
    all: 'No connection with server',
  },
  login: {
    400: 'Wrong password',
    404: 'User not found',
    505: 'Server error',
  },
};
