// Out of the box imports
import { useState } from 'react';
import { GetServerSideProps } from 'next';
// Custom imports
import styles from '@/styles/modules/pages/Login.module.scss';
import Page from '@/components/Placeholder/Page';
import { signIn } from '@/services/login';
import { getUserCookie, getProjectCookie, setClientCookie } from '@/services/cookies';
import { createToast } from '@/utils/utils';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const token = getUserCookie(context);

    if (token) {
        const projectId = getProjectCookie(context);

        if (projectId) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }

        return {
            redirect: {
                destination: '/profile',
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

        signInHandler();
    };

    // Handler to sign in given the email and password
    const signInHandler = () => {
        signIn(email, password)
            .then((data) => {
                const userData = data.getIdToken();
                // Extract the token and the project id from the user data if possible
                const jwtToken = userData.getJwtToken();
                const userProject = userData.payload['custom:projectId'];

                if (jwtToken) {
                    setClientCookie('jwtToken', jwtToken);

                    if (userProject) {
                        setClientCookie('userProject', userProject);
                        location.href = '/';
                        return;
                    }

                    location.href = '/profile';
                }
            })
            .catch((error: Error) => {
                console.error(error);
                createToast({ text: error.message, type: 'error', duration: 3500 });
            });
    };

    return (
        <Page title='Login'>
            <main className={styles.login}>
                <img className={styles.login__logo} src='/images/logo.png' alt='Next Logo' />

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
                        onClick={() => signInHandler()}
                        disabled={isDisabledButton}
                    >
                        Login
                    </button>
                </div>
            </main>
        </Page>
    );
};

export default Login;
