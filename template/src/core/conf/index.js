import { Platform } from 'react-native';
import { consoleTransport } from 'react-native-logs';
import { REACT_APP_ENV, REACT_APP_API_URL_IOS, REACT_APP_API_URL_ANDROID } from '@env';

function Settings({ DEBUG = true }) {
  // Main
  this.DEBUG = DEBUG;
  this.ENVIRONMENT = REACT_APP_ENV;

  function _getBaseURL() {
    return Platform.OS === 'ios' ? REACT_APP_API_URL_IOS : REACT_APP_API_URL_ANDROID;
  }

  this.API_CLIENT = {
    baseURL: _getBaseURL(),
    headers: {
      authorization: 'Bearer',
    },
  };

  this.LOGGING = {
    levels: {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3,
    },
    severity: this.DEBUG ? 'debug' : 'error',
    transport: consoleTransport,
    transportOptions: {
      colors: {
        info: 'blue',
        warn: 'yellow',
        error: 'red',
      },
    },
    async: true,
    dateFormat: 'time',
    printLevel: true,
    printDate: true,
    enabled: true,
    enabledExtensions: ['ROOT', 'AXIOS'],
  };
}

function getSettings() {
  if (REACT_APP_ENV === 'Local') {
    console.info('Load Settings: Development Mode. Console.log has already enabled.');
    return new Settings({ DEBUG: true });
  }

  console.info('Load Settings: Production Mode. Console.log has already disabled.');
  console.log = function () {};
  return new Settings({ DEBUG: false });
}

const settings = getSettings();

export default settings;
