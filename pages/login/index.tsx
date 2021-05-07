// Out of the box imports
import { useState } from 'react';
import { GetServerSideProps } from 'next';
// Custom imports
import Page from '@/components/Page';
import styles from '@/styles/modules/Login.module.scss';
import { signIn } from '@/services/login';
import { getUserCookie } from '@/services/cookies';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const userToken = getUserCookie(context);

    if (userToken) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return { props: {} };
};

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isDisabledButton = !email.length || !password.length;

    // Handler to check if the enter press should submit the form
    const keyPressHandler = (key: string) => {
        if (key !== 'Enter' || isDisabledButton) {
            return;
        }

        signIn(email, password);
    };

    return (
        <Page title='Login'>
            <section className={styles.login}>
                <img className={styles.login__logo} src='/logo.png' alt='Next Logo' />

                <div className={styles.login__container}>
                    <h1 className={styles.login__title}>Authentication</h1>

                    <input
                        className={styles.login__input}
                        placeholder='Email'
                        type='text'
                        value={email}
                        onKeyPress={(e) => keyPressHandler(e.key)}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className={styles.login__input}
                        placeholder='Password'
                        type='password'
                        value={password}
                        onKeyPress={(e) => keyPressHandler(e.key)}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type='button'
                        className={styles.login__button}
                        onClick={() => signIn(email, password)}
                        disabled={isDisabledButton}
                    >
                        Login
                    </button>
                </div>
            </section>
        </Page>
    );
};

export default Login;
