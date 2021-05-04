import '@/styles/globals.scss';

const MyApp: React.FC<{ Component: any; pageProps: object }> = ({ Component, pageProps }) => {
    return <Component {...pageProps} />;
};

export default MyApp;
