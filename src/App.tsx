/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import PreviewPage from '@/app/preview/page';
import { ArchitectAnyProvider } from '@/src/context/ArchitectAnyContext';

export default function App() {
  return (
    <ArchitectAnyProvider>
      <PreviewPage />
    </ArchitectAnyProvider>
  );
}
