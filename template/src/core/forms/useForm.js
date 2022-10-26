import { useCallback } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';
import { useForm as useFormBase } from 'react-hook-form';

const API_ERROR_KEY = 'api';

function useForm({ schema, defaultValues, ...rest }) {
  const { setError, ...form } = useFormBase({
    ...rest,
    defaultValues,
    resolver: yupResolver(schema, { form: { defaultValues } }),
  });

  const setErrors = useCallback(
    (errorsData, nonFieldError) => {
      const parseErrors = (s, d, p = '') => {
        for (const pair of Object.entries(d)) {
          const [key, value] = pair;

          if (isArray(value)) {
            if (key in s.fields) {
              setError(p ? `${p}.${key}` : key, {
                key,
                type: API_ERROR_KEY,
                message: value,
              });
            } else {
              nonFieldError({ key, type: API_ERROR_KEY, message: value });
              break;
            }
          }

          if (isObject(value)) {
            parseErrors(s.fields[key], value, key);
          }
        }
      };

      parseErrors(schema, errorsData);
    },
    [schema, setError],
  );

  return {
    setError,
    setErrors,
    ...form,
  };
}

export default useForm;
