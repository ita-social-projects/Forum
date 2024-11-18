import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
import { useAuth, useProfile } from '../../../hooks';
import checkFormIsDirty from '../../../utils/checkFormIsDirty';
import defineChanges from '../../../utils/defineChanges';
import { formatPhoneNumber } from '../../../utils/formatPhoneNumber';
import HalfFormField from './FormFields/HalfFormField';
import Loader from '../../../components/Loader/Loader';
import ProfileFormButton from '../UI/ProfileFormButton/ProfileFormButton';
import css from './FormComponents.module.css';
import { useMask } from '@react-input/mask';

const LABELS = {
  phone: 'Телефон',
  address: 'Поштова адреса',
};

const ContactsInfo = (props) => {
  const { user } = useAuth();
  const { profile: mainProfile, mutate: profileMutate } = useProfile();
  const [profile, setProfile] = useState(props.profile);
  const [phone, setPhone] = useState(formatPhoneNumber(profile?.phone));
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const { setFormIsDirty } = useContext(DirtyFormContext);

  const fields = {
    phone: { defaultValue: mainProfile?.phone ?? null, type: 'phone' },
    address: { defaultValue: mainProfile?.address ?? null },
  };

  useEffect(() => {
    const isDirty = checkFormIsDirty(fields, null, profile);
    setFormIsDirty(isDirty);
  }, [mainProfile, profile]);

  const inputRef = useMask({ mask: '+380XX XXX XX XX', replacement: { X: /\d/ } });

  useEffect(() => {
    if (mainProfile?.phone) {
      setProfile((prevState) => ({
        ...prevState,
        phone: formatPhoneNumber(mainProfile.phone),
      }));
    }
  }, [mainProfile]);

  const onUpdateField = (e) => {
    setProfile((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const onUpdatePhoneNumberField = (e) => {
    const receivedPhoneNumber = e.target.value;
    const cleanedNumber = receivedPhoneNumber.replace(/\s/g, '').slice(3);
    const parsedNumber = Number(cleanedNumber);
    const isInteger = Number.isInteger(parsedNumber);
    if (isInteger) {
      if (receivedPhoneNumber && cleanedNumber.length !== 10) {
        setPhoneNumberError('Номер повинен містити 9 цифр після коду країни');
      } else {
        setPhoneNumberError(null);
      }
    } else {
      setPhoneNumberError('Номер повинен містити лише цифри');
    }
    setPhone(formatPhoneNumber(e.target.value));
    setProfile((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const validateForm = () => {
    let isValid = true;
    const phoneNumber = profile.phone.replace(/\s/g, '').slice(3);
    if (profile.phone && (phoneNumber.length !== 10 || !Number.isInteger(Number(phoneNumber)))) {
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      toast.error(
        'Зміни не можуть бути збережені, перевірте правильність заповнення полів'
      );
    } else {
      const data = defineChanges(fields, profile, null);
      try {
        const response = await axios.patch(
          `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`,
          data.profileChanges
        );
        const updatedProfileData = response.data;
        profileMutate(updatedProfileData);
        setFormIsDirty(false);
        toast.success('Зміни успішно збережено');
      } catch (error) {
        console.error(
          'Помилка:',
          error.response ? error.response.data : error.message
        );
        if (!error.response || error.response.status !== 401) {
          toast.error('Не вдалося зберегти зміни, сталася помилка');
        }
      }
    }
  };

  return (
    <div className={css['form__container']}>
      <h3 className={css['form__head']}>Контакти</h3>
      <div className={css['divider']}></div>
      {user && profile && mainProfile ? (
        <form
          id="ContactsInfo"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className={css['fields']}>
            <div className={css['fields-groups']}>
              <HalfFormField
                inputType="tel"
                name="phone"
                ref={inputRef}
                fieldPlaceholder="+380XX XXX XX XX"
                label={LABELS.phone}
                updateHandler={onUpdatePhoneNumberField}
                requiredField={false}
                value={phone ?? ''}
                error={phoneNumberError}
              />
              <HalfFormField
                name="address"
                fieldPlaceholder="Введіть поштову адресу"
                label={LABELS.address}
                updateHandler={onUpdateField}
                requiredField={false}
                value={profile.address ?? ''}
              />
            </div>
          </div>
          <div className={css['bottom-divider']}></div>
          <ProfileFormButton />
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ContactsInfo;
