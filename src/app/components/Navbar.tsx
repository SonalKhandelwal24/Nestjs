'use client'; // Ensure this is the very first line

import { useRouter } from 'next/router'; // Client-side hook
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [locale, setLocale] = useState('en');
  const router = useRouter(); // Router works in client components
  const t = useTranslations('Navbar');

  useEffect(() => {
    if (router.locale) {
      setLocale(router.locale);
    }
  }, [router]);

  const handleChangeLanguage = (newLocale: string) => {
    router.push(router.asPath, router.asPath, { locale: newLocale });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">{t('home')}</Link>
        </li>
        <li>
          <Link href="/about">{t('about')}</Link>
        </li>
        <li>
          <button onClick={() => handleChangeLanguage(locale === 'en' ? 'hi' : 'en')}>
            {locale === 'en' ? 'Switch to Hindi' : 'Switch to English'}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
