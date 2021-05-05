// Out of the box imports
import { useState } from 'react';
// Custom imports
import Page from '@/components/page';
import { signIn } from '@/services/login';
import styles from '@/styles/modules/Login.module.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        className={styles.login__input}
                        placeholder='Password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type='button' className={styles.login__button} onClick={() => signIn(email, password)}>
                        Login
                    </button>
                </div>
            </section>
        </Page>
    );
};

export default Login;
