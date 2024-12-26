import { GetStaticProps } from 'next';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const HomePage = ({ messages }: { messages: any }) => {
  const t = useTranslations('HomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
};

// Fetch translations server-side (only if using SSR/SSG)
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    props: {
      messages,
    },
  };
};

export default HomePage;
