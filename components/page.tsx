// Out of the box imports
import { FunctionComponent, ReactNode } from 'react';
import Head from 'next/head';

// Page utils
import { getFormattedTitle } from '@/utils/components/page';

type Props = {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
};

const Page: FunctionComponent<Props> = ({ children, title, description, keywords }) => {
    const formattedTitle = getFormattedTitle(title);

    return (
        <>
            <Head>
                <title>{formattedTitle}</title>

                {description && <meta content={description} name='description' />}
                {keywords && <meta content={keywords} name='keywords' />}
                <meta content='IE=edge' httpEquiv='X-UA-Compatible' />
                <meta content='Next Typescript Boilerplate' name='author'></meta>
                <meta content='follow, index' name='robots' />
                <meta content='#ffffff' name='theme-color' />
                <meta content='#ffffff' name='msapplication-TileColor' />
                <meta content='/favicons/browserconfig.xml' name='msapplication-config' />

                <link href='/favicons/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
                <link href='/favicons/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
                <link href='/favicons/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
                <link href='/favicons/site.webmanifest' rel='manifest' />
                <link color='#5bbad5' href='/favicons/safari-pinned-tab.svg' rel='mask-icon' />
                <link href='/favicons/favicon.ico' rel='shortcut icon' />

                <meta content={formattedTitle} property='og:title' />
                {description && <meta content={description} property='og:description' />}
                <meta content='es_ES' property='og:locale' />
                {/* <meta content='https://' property='og:url' /> */}
                <meta content='website' property='og:type' />
            </Head>

            {children}
        </>
    );
};

export default Page;
