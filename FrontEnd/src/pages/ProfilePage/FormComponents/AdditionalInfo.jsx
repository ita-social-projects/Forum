import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
import checkFormIsDirty from '../../../utils/checkFormIsDirty';
import defineChanges from '../../../utils/defineChanges';
import { useAuth, useProfile } from '../../../hooks';
import HalfFormField from './FormFields/HalfFormField';
import Loader from '../../../components/Loader/Loader';
import ProfileFormButton from '../UI/ProfileFormButton/ProfileFormButton';
import css from './FormComponents.module.css';

const LABELS = {
  founded: 'Рік заснування',
};

const AdditionalInfo = (props) => {
  const { user } = useAuth();
  const { profile: mainProfile, mutate: profileMutate } = useProfile();
  const [profile, setProfile] = useState(props.profile);
  const [foundationYearError, setFoundationYearError] = useState(null);
  const { setFormIsDirty } = useContext(DirtyFormContext);

  // TODO: update default values as new fields added

  const fields = {
    founded: { defaultValue: mainProfile?.founded ?? null },
  };

  useEffect(() => {
    const isDirty = checkFormIsDirty(fields, null, profile);
    setFormIsDirty(isDirty);
  }, [mainProfile, profile]);

  const onUpdateFoundationYearField = (e) => {
    const currentYear = new Date().getFullYear();
    const year = Number(e.target.value);
    if ((1800 <= year && year <= currentYear) || !e.target.value) {
      setFoundationYearError(null);
    } else {
      setFoundationYearError(
        `Рік заснування не в діапазоні 1800-${currentYear}`
      );
    }
    setProfile((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const validateForm = () => {
    let isValid = true;
    const currentYear = new Date().getFullYear();
    const year = Number(profile.founded);
    if ((1800 > year || year > currentYear) && profile.founded) {
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
      const data  = defineChanges(fields, profile, null);
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
      <h3 className={css['form__head']}>Додаткова інформація</h3>
      <div className={css['divider']}></div>
      {user && profile && mainProfile ? (
        <form
          id="AdditionalInfo"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className={css['fields']}>
            <div className={css['fields-groups']}>
              <HalfFormField
                inputType="number"
                name="founded"
                fieldPlaceholder="Введіть рік заснування"
                label={LABELS.founded}
                updateHandler={onUpdateFoundationYearField}
                requiredField={false}
                value={profile.founded ?? ''}
                error={foundationYearError}
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

export default AdditionalInfo;
