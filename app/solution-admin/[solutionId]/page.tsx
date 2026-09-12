"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import { SolutionAdmin } from '@/components/admin/SolutionAdmin';
import type { SolutionAdminConfig } from '@/src/contracts/solutionAdmin';

export default function SolutionAdminDynamicPage() {
  const params = useParams<{ solutionId: string }>();
  const solutionId = params?.solutionId || 'parakkai';

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
