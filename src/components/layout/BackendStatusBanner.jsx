import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useLanguage } from '../../hooks/useLanguage';

const BackendStatusBanner = () => {
  const { backendOnline } = useAuth();
  const { t } = useLanguage();

  if (backendOnline !== false) return null;

  return (
    <div role="alert" className="w-full bg-error-container text-on-error-container px-4 py-2 font-label-md text-label-md">
      <div className="max-w-6xl mx-auto flex items-center gap-2">
        <span className="material-symbols-outlined text-lg">cloud_off</span>
        <span>{t('backendOffline')}</span>
      </div>
    </div>
  );
};

export default BackendStatusBanner;