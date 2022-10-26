/**
 * @format
 * @flow
 */

import React from 'react';
import type { Node } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Router from '@src/router';
import { ProviderComposer } from '@src/components/utils';

function Entry(): Node {
  const providers = [SafeAreaProvider];

  return (
    <ProviderComposer providers={providers}>
      <Router />
    </ProviderComposer>
  );
}

export default Entry;
