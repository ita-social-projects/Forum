import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
import { useAuth, useProfile } from '../../../hooks';
import checkFormIsDirty from '../../../utils/checkFormIsDirty';
import defineChanges from '../../../utils/defineChanges';
import FullField from './FormFields/FullField';
import HalfFormField from './FormFields/HalfFormField';
import Loader from '../../loader/Loader';
import css from './FormComponents.module.css';

const LABELS = {
  phone: 'Телефон',
  address: 'Поштова адреса',
};

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  const cleaned = phoneNumber.replace(/\s+/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('380')) {
    return `+380${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }
  return phoneNumber;
};

const ContactsInfo = (props) => {
  const { user } = useAuth();
  const { profile: mainProfile, mutate: profileMutate } = useProfile();
  const [profile, setProfile] = useState(props.profile);
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const { setFormIsDirty } = useContext(DirtyFormContext);

  const fields = {
    phone: { defaultValue: mainProfile?.phone ?? null, type: 'phone'},
    address: { defaultValue: mainProfile?.address ?? null },
  };

  useEffect(() => {
    const isDirty = checkFormIsDirty(fields, null, profile);
    setFormIsDirty(isDirty);
  }, [mainProfile, profile]);

  useEffect(() => {
    props.currentFormNameHandler(props.curForm);
  }, []);

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
                fieldPlaceholder="+380XX XXX XX XX"
                label={LABELS.phone}
                updateHandler={onUpdatePhoneNumberField}
                requredField={false}
                value={profile.phone ?? ''}
                error={phoneNumberError}
              />
            </div>
            <FullField
              name="address"
              label={LABELS.address}
              updateHandler={onUpdateField}
              requredField={false}
              value={profile.address ?? ''}
            />
          </div>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ContactsInfo;
