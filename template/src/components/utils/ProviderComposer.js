import React from 'react';

import isArray from 'lodash/isArray';
import reverse from 'lodash/reverse';

const parse = (p) => (isArray(p) ? [p[0], p[1]] : [p, {}]);

export default ({ providers, children }) => (
  <>
    {reverse(providers).reduce((hierarchy, provider) => {
      const [Provider, props] = parse(provider);
      return <Provider {...props}>{hierarchy}</Provider>;
    }, children)}
  </>
);
