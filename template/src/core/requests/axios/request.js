import { objectToFormData } from '../../forms/utils';
import Logger, { AxiosLogger } from '../../logging';

Logger.disable('AXIOS');

export default function performAxiosRequest({
  url = '',
  method = 'GET',
  payload = null,
  multipart = false,
  headers = {},
  options = {},
  client = null,
  serializer = objectToFormData,
}) {
  let jsonOrFormData = payload;
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  // Multipart
  if (multipart) {
    if (!(payload instanceof FormData)) {
      jsonOrFormData = serializer(payload);
    }
    client.defaults.headers.common['Content-Type'] = 'multipart/form-data';
  } else {
    client.defaults.headers.common['Content-Type'] = 'application/json';
  }

  const requestOptions = {
    url,
    method,
    headers,
    [dataOrParams]: jsonOrFormData,
    ...options,
  };

  return new Promise((resolve, reject) => {
    client
      .request(requestOptions)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        AxiosLogger.debug('[Error]', error?.message || 'No Error Message');
        AxiosLogger.debug('[Request] ', requestOptions || 'No response options');
        AxiosLogger.debug('[Response] ', error?.response?.data || 'No response data');
        reject(error);
      });
  });
}
