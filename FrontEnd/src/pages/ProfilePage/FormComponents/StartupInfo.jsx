import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
import checkFormIsDirty from '../../../utils/checkFormIsDirty';
import defineChanges from '../../../utils/defineChanges';
import { useAuth, useProfile } from '../../../hooks';
import TextField from './FormFields/TextField';
import Loader from '../../../components/Loader/Loader';
import ProfileFormButton from '../UI/ProfileFormButton/ProfileFormButton';
import css from './FormComponents.module.css';

const LABELS = {
  startup_idea: 'Опис ідеї стартапу',
};

const TEXT_AREA_MAX_LENGTH = 1000;

const StartupInfo = (props) => {
  const { user } = useAuth();
  const { profile: mainProfile, mutate: profileMutate } = useProfile();
  const [profile, setProfile] = useState(props.profile);
  const { setFormIsDirty } = useContext(DirtyFormContext);

  const fields = {
    startup_idea: { defaultValue: mainProfile?.startup_idea ?? null },
  };

  useEffect(() => {
    const isDirty = checkFormIsDirty(fields, null, profile);
    setFormIsDirty(isDirty);
  }, [mainProfile, profile]);

  const onUpdateTextAreaField = (e) => {
    if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
      setProfile((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = defineChanges(fields, profile, null);
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
  };

  return (
    <div className={css['form__container']}>
      <h3 className={css['form__head']}>Стартап</h3>
      <div className={css['divider']}></div>
      {user && profile && mainProfile ? (
        <form
          id="StartupInfo"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className={css['fields']}>
            <TextField
              name="startup_idea"
              label={LABELS.startup_idea}
              updateHandler={onUpdateTextAreaField}
              requiredField={false}
              value={profile?.startup_idea ?? ''}
              maxLength={TEXT_AREA_MAX_LENGTH}
            />
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

export default StartupInfo;
