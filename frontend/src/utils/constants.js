// ! configs
import configTestUsers from './../config/configTestUsers.json';
import configApi from './../config/configApi.json';
import configSite from './../config/configSite.json';

// ? год создания сайта
export const YEAR = 2023;

// ? текущий год
export const CURRENT_YEAR = new Date().getFullYear();

const DEFAULT_URL = configSite.default_url;

export const TEST_USERS = configTestUsers;

// ? все пути
export const paths = {
  main: `${DEFAULT_URL}main`,
  about: `${DEFAULT_URL}about`,
  services: `${DEFAULT_URL}services`,
  contact: `${DEFAULT_URL}contact`,
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
    dashboard: `${DEFAULT_URL}dashboard`,
    exchange: `${DEFAULT_URL}exchange`,
  },
  verifyEmail: `${DEFAULT_URL}verifyEmail`,
};

export const TEMPLATE_OF_SHAREHOLDER = {
  typeOfShareholder: 'company',
  percentageOfOwnership: null,
  // ? individual
  fullName: null,
  contactEmail: null,
  jobTitle: null,
  phoneNumber: null,
  // ? company
  name: null,
  registrationNumber: null,
  legalForm: null,
  legalAddress: null,
  city: null,
  zipCode: null,
  countryOfRegistration: null,
  VAT: null,
  registrationDate: null,
};

export const TYPE_OF_USER = ['Individual', 'Legal entity'];
export const TYPE_OF_SHAREHOLDERS = ['individual', 'company'];

export const PATTERN_PAGE_USER_ID = /^\/admin\/users(\/[a-zA-Z0-9]*)?$/;

export const PATTERN_PAGE_COMPANY_ID = /^\/company(\/[a-zA-Z0-9]*)?$/;

export const activeHeaderRoutes = [
  paths.admin.main,
  paths.admin.users,
  paths.admin.create,
  paths.main,
  paths.about,
  paths.services,
  paths.contact,
  paths.user.profile,
  paths.user.dashboard,
  paths.user.exchange,
  paths.support,
  paths.company.create,
  paths.policies.amlPolicy,
  paths.policies.cookiesPolicy,
  paths.policies.privacyPolicy,
  paths.policies.termsConditions,
];

export const activeLandingHeaderRoutes = [
  paths.main,
  paths.about,
  paths.services,
  paths.contact,
  paths.policies.amlPolicy,
  paths.policies.cookiesPolicy,
  paths.policies.privacyPolicy,
  paths.policies.termsConditions,
];

export const activeFooterRoutes = [
  paths.admin.main,
  paths.admin.users,
  paths.main,
  paths.about,
  paths.services,
  paths.contact,
  paths.user.profile,
  paths.user.dashboard,
  paths.user.exchange,
  paths.support,
  paths.company.create,
  paths.company.profile,
  paths.policies.amlPolicy,
  paths.policies.cookiesPolicy,
  paths.policies.privacyPolicy,
  paths.policies.termsConditions,
];

export const activeFormFooterRoutes = [
  paths.main,
  paths.about,
  paths.services,
  paths.contact,
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
  DATE_OF_REGISTRATION: {
    YEAR: {
      MIN: 1800,
      MAX: CURRENT_YEAR,
    },
  },
  PRICE: {
    TO_PRECISION: 10,
  },
};

export const MAX_COUNT_OF_SHAREHOLDERS = 10;

export const LEGAL_FORM_VALUES = [
  'Limited Liability Company',
  'Self Employed',
  'Individual trader',
  'General Partnership',
  'Limited partnership',
  'Society',
  'Government LLC',
  'Foundation',
  'Other',
];

export const PAYMENTS = {
  CURRENCY: {
    CRYPTO: [
      'algorand',
      'avalanche-2',
      'binancecoin',
      'bitcoin',
      'cardano',
      'chainlink',
      'dogecoin',
      'ethereum',
      'polkadot',
      'ripple',
      'solana',
      'terra-luna-2',
      'tether',
      'usd-coin',
    ],
    FIAT: ['eur', 'usd'],
  },
  WALLETS: ['crypto wallet', 'fiat wallet', 'card'],
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
