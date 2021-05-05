// Out of the box imports
import { GetServerSideProps } from 'next';
// Custom imports
import Page from '@/components/page';
import styles from '@/styles/modules/Home.module.scss';
import { homeTitle } from '@/helpers/pages/home';
import { getUserCookie } from '@/services/cookies';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const userToken = getUserCookie(context);

    if (!userToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { userToken },
    };
};

const Home = () => {
    return (
        <Page title={homeTitle}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <h1 className={styles.title}>
                        Welcome to <a href='https://nextjs.org'>Next.js!</a>
                    </h1>

                    <p className={styles.description}>
                        Get started by editing <code className={styles.code}>pages/index.js</code>
                    </p>

                    <div className={styles.grid}>
                        <a href='https://nextjs.org/docs' className={styles.card}>
                            <h3>Documentation &rarr;</h3>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a href='https://nextjs.org/learn' className={styles.card}>
                            <h3>Learn &rarr;</h3>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>

                        <a href='https://github.com/vercel/next.js/tree/master/examples' className={styles.card}>
                            <h3>Examples &rarr;</h3>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>

                        <a
                            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                            className={styles.card}
                        >
                            <h3>Deploy &rarr;</h3>
                            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
                        </a>
                    </div>
                </main>

                <footer className={styles.footer}>
                    <a
                        href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        Powered by <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
                    </a>
                </footer>
            </div>
        </Page>
    );
};

export default Home;
