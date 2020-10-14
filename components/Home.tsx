import Head from 'next/head'
import { Trans, useTranslation } from 'react-i18next';
import {YMInitializer} from 'react-yandex-metrika';

import styles from '../styles/Home.module.css'

const className = (...specifier: string[]) => ({
  className: specifier.join(' ')
});

export const Home = () => {
  const {t} = useTranslation();
  return (
    <>
      <Head>
        <title>{t("Name")}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div {...className(styles.hello, styles.animated)} />
        <div {...className(styles.message, styles.animated)}>
          <Trans i18nKey="Greeting.Name">
            My name is <span className={styles.bold}>Sasha</span>
            and I <a href="https://www.linkedin.com/in/underoot/" target="_blank" className={styles.bold}>
              Software engineer
            </a>!
          </Trans>
          <Trans i18nKey="Greeting.Preferences" />
          <Trans i18nKey="Greeting.Hobbies" />
        </div>
        <div {...className(styles.message, styles.animated)}>
          <Trans i18nKey="Greeting.Contacts">
            Ты можешь написать мне в <a href="mailto:alexshoronov@gmail.com">почте</a> или <a href="https://t.me/underoot">telegram</a>
          </Trans>
        </div>
      </main>
      <YMInitializer accounts={[43778634]} />
    </>
  )
}
