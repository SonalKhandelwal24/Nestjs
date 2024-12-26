import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';  // Make sure this is the correct import path
import Navbar from '@/app/components/Navbar';

export default function AboutPage() {
  const t = useTranslations('AboutPage');

  return (
    <div>
      <Navbar />  {/* Include Navbar here if you only want it on specific pages */}
      <h1>{t('title')}</h1>
      <p>{t('about')}</p>
    </div>
  );
}
