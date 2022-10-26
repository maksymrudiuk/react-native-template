const HTTP_STATUS_CODES = {
  OK: {
    code: '200',
    reason: 'OK',
  },
  CREATED: {
    code: '201',
    reason: 'Created',
  },
  ACCEPTED: {
    code: '202',
    reason: 'Accepted',
  },
  NO_CONTENT: {
    code: '204',
    reason: 'No Content',
  },
  BAD_REQUEST: {
    code: '400',
    reason: 'Bad Request',
  },
  UNAUTHORIZED: {
    code: '401',
    reason: 'Unauthorized',
  },
  FORBIDDEN: {
    code: '403',
    reason: 'Forbidden',
  },
  NOT_FOUND: {
    code: '404',
    reason: 'Not Found',
  },
  METHOD_NOT_ALLOWED: {
    code: '405',
    reason: 'Method Not Allowed',
  },
  INTERNAL_SERVER_ERROR: {
    code: '500',
    reason: 'Internal Server Error',
  },
  BAD_GATEWAY: {
    code: '502',
    reason: 'Bad Gateway',
  },
  SERVICE_UNAVAILABLE: {
    code: '503',
    reason: 'Service Unavailable',
  },
  NETWORK_ERROR: {
    code: '600',
    reason: 'Network Error',
  },
};

function checkResponseStatusCode(response, status) {
  return response?.status?.toString() === status.code;
}

function isUnauthorized(response) {
  return checkResponseStatusCode(response, HTTP_STATUS_CODES.UNAUTHORIZED);
}

function isNetworkError(response) {
  return checkResponseStatusCode(response, HTTP_STATUS_CODES.NETWORK_ERROR);
}

function isBadRequest(response) {
  return checkResponseStatusCode(response, HTTP_STATUS_CODES.BAD_REQUEST);
}

function isNotFound(response) {
  return checkResponseStatusCode(response, HTTP_STATUS_CODES.NOT_FOUND);
}

function isInternalServerError(response) {
  return checkResponseStatusCode(response, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR);
}

function isForbidden(response) {
  return checkResponseStatusCode(response, HTTP_STATUS_CODES.FORBIDDEN);
}

export {
  HTTP_STATUS_CODES,
  checkResponseStatusCode,
  isUnauthorized,
  isNetworkError,
  isBadRequest,
  isNotFound,
  isInternalServerError,
  isForbidden,
};
