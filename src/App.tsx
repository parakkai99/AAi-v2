/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import PreviewPage from '@/app/preview/page';
import { ArchitectAnyProvider } from '@/src/context/ArchitectAnyContext';
import { CinematicNavigationProvider } from '@/src/context/CinematicNavigationContext';
import { UniversalNavigationProvider } from '@/src/context/UniversalNavigationContext';

export default function App() {
  return (
    <ArchitectAnyProvider>
      <CinematicNavigationProvider>
        <UniversalNavigationProvider>
          <PreviewPage />
        </UniversalNavigationProvider>
      </CinematicNavigationProvider>
    </ArchitectAnyProvider>
  );
}
