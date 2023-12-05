// ! configs
import configApi from './../config/configApi.json';
import configSite from './../config/configSite.json';

// ? год создания сайта
export const YEAR = 2023;

const DEFAULT_URL = configSite.default_url;

// ? все пути
export const paths = {
  main: `${DEFAULT_URL}main`,
  about: `${DEFAULT_URL}about`,
  services: `${DEFAULT_URL}services`,
  admin: {
    main: `${DEFAULT_URL}admin/main`,
    signin: `${DEFAULT_URL}admin/signin`,
    create: `${DEFAULT_URL}admin/create`,
    userProfile: `${DEFAULT_URL}admin/users/:userId`,
    users: `${DEFAULT_URL}admin/users`,
  },
  policies: {
    termsConditions: `${DEFAULT_URL}policies/terms-and-conditions`,
    privacyPolicy: `${DEFAULT_URL}policies/privacy`,
    amlPolicy: `${DEFAULT_URL}policies/aml`,
    cookiesPolicy: `${DEFAULT_URL}policies/cookies`,
  },
  company: {
    create: `${DEFAULT_URL}company/create`,
    profile: `${DEFAULT_URL}company/:companyId`,
  },
  signin: `${DEFAULT_URL}signin`,
  signup: `${DEFAULT_URL}signup`,
  support: `${DEFAULT_URL}support`,
  user: {
    profile: `${DEFAULT_URL}profile`,
  },
  verifyEmail: `${DEFAULT_URL}verifyEmail`,
};

export const LINK_REPOSITORY = 'https://github.com/chyVacheck/crypto';

export const PATTERN_PAGE_USER_ID = /^\/admin\/users(\/[a-zA-Z0-9]*)?$/;

export const activeFooterRoutes = [
  paths.admin.main,
  paths.admin.users,
  paths.main,
  paths.about,
  paths.services,
  paths.user.profile,
  paths.support,
  paths.company.create,
  paths.policies.amlPolicy,
  paths.policies.cookiesPolicy,
  paths.policies.privacyPolicy,
  paths.policies.termsConditions,
];

export const activeFormFooterRoutes = [
  paths.main,
  paths.about,
  paths.services,
  paths.policies.amlPolicy,
  paths.policies.cookiesPolicy,
  paths.policies.privacyPolicy,
  paths.policies.termsConditions,
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
  TITLE: {
    MIN: 2,
    MAX: 32,
  },
  MESSAGE: {
    MIN: 10,
    MAX: 4000,
  },
  REGISTRATION_NUMBER: {
    MIN: 1,
    MAX: 20,
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
