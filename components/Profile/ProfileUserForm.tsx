// Out of the box imports
import { useContext, useState, useEffect } from 'react';
// Custom imports
import styles from '@/styles/modules/pages/Profile.module.scss';
import { strings } from '@/helpers/pages/profileHelper';
import { updateUser } from '@/services/profile';
import { createToast } from '@/utils/utils';
import { mapProfileAttributes } from '@/utils/pages/profileUtils';
import { AuthPageContext } from '@/components/Placeholder/AuthPage';
import Loader from '@/components/Generic/Loader';
import Input from '@/components/Generic/Input';

const ProfileUserForm = () => {
    const { user, setUser, loaded } = useContext(AuthPageContext);
    // User editable attributes
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    // Handler to submit the profile form
    const profileSubmitHandler = () => {
        const params = mapProfileAttributes({ name, nickname, email, phone });

        updateUser(user.token, params)
            .then((token) => {
                setUser({ ...params, token });
                createToast({ text: strings.user_updated_successfully, type: 'success', duration: 3500 });
            })
            .catch((error) => {
                console.error(error);
                createToast({ text: error.message, type: 'error', duration: 3500 });
            });
    };

    useEffect(() => {
        if (!user) return;

        setName(user.name ?? '');
        setNickname(user.nickname ?? '');
        setEmail(user.email ?? '');
        setPhone(user.phone_number ?? '');
    }, [user]);

    if (!loaded) {
        return <Loader />;
    }

    return (
        <section className={styles.profile__container}>
            <Input placeholder={strings.name_placeholder} label={strings.name_label} value={name} setter={setName} />
            <Input
                placeholder={strings.nick_placeholder}
                label={strings.nick_label}
                value={nickname}
                setter={setNickname}
            />
            <Input
                placeholder={strings.email_placeholder}
                label={strings.email_label}
                value={email}
                setter={setEmail}
            />
            <Input
                placeholder={strings.phone_placeholder}
                label={strings.phone_label}
                value={phone}
                setter={setPhone}
            />

            <button type='button' onClick={() => profileSubmitHandler()} className={styles.profile__button}>
                Update
            </button>
        </section>
    );
};

export default ProfileUserForm;
