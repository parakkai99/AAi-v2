"use client";

import React from 'react';
import { SolutionAdmin } from '@/components/admin/SolutionAdmin';
import type { SolutionAdminConfig } from '@/src/contracts/solutionAdmin';

function readSolutionId(): string {
  if (typeof window === 'undefined') return 'parakkai';

  const segments = window.location.pathname.split('/').filter(Boolean);
  const index = segments.indexOf('solution-admin');

  return index >= 0 && segments[index + 1]
    ? decodeURIComponent(segments[index + 1]).toLowerCase()
    : 'parakkai';
}

export default function SolutionAdminDynamicPage() {
  const solutionId = readSolutionId();

  return (
    <SolutionAdmin
      solutionId={solutionId}
      onPreviewSolution={(config: SolutionAdminConfig) => {
        const query = new URLSearchParams({
          app: config.solutionId,
          preview: '1',
          theme: config.themeId,
          layout: config.layoutId,
        });

        const previewUrl = `/?${query.toString()}`;
        const previewWindow = window.open(previewUrl, '_blank', 'noopener,noreferrer');

        if (!previewWindow) {
          window.location.assign(previewUrl);
          return;
        }

        previewWindow.focus();
      }}
    />
  );
}
