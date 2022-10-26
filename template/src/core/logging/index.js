import { logger } from 'react-native-logs';
import settings from '../conf';

const Logger = logger.createLogger(settings.LOGGING);

const AxiosLogger = Logger.extend('AXIOS');
const RootLogger = Logger.extend('ROOT');

export default Logger;
export { AxiosLogger, RootLogger };
