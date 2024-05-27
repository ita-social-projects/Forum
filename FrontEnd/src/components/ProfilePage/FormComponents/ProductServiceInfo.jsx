import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
import checkFormIsDirty from '../../../utils/checkFormIsDirty';
import { useAuth, useProfile } from '../../../hooks';
import TextField from './FormFields/TextField';
import Loader from '../../loader/Loader';
import css from './FormComponents.module.css';

const LABELS = {
  product_info: 'Товари',
  service_info: 'Послуги',
};

const TEXT_AREA_MAX_LENGTH = 1000;

const ProductServiceInfo = (props) => {
  const { user } = useAuth();
  const { profile: mainProfile, mutate: profileMutate } = useProfile();
  const [profile, setProfile] = useState(props.profile);
  const { setFormIsDirty } = useContext(DirtyFormContext);

  // TODO: update default values as new fields added

  const fields = {
    product_info: { defaultValue: mainProfile?.product_info ?? null },
    service_info: { defaultValue: mainProfile?.service_info ?? null },
  };

  useEffect(() => {
    const isDirty = checkFormIsDirty(fields, null, profile);
    setFormIsDirty(isDirty);
  }, [mainProfile, profile]);

  useEffect(() => {
    props.currentFormNameHandler(props.curForm);
  }, []);

  const onUpdateTextAreaField = (e) => {
    if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
      setProfile((prevState) => {
        return { ...prevState, [e.target.name]: e.target.value };
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`,
        {
          product_info: profile.product_info,
          service_info: profile.service_info,
        }
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
      {user && profile && mainProfile ? (
        <form
          id="ProductServiceInfo"
          onSubmit={handleSubmit}
          autoComplete="off"
          noValidate
        >
          <div className={css['fields']}>
            <TextField
              name="product_info"
              label={LABELS.product_info}
              updateHandler={onUpdateTextAreaField}
              requredField={false}
              value={profile.product_info ?? ''}
              maxLength={TEXT_AREA_MAX_LENGTH}
            />
            <TextField
              name="service_info"
              label={LABELS.service_info}
              updateHandler={onUpdateTextAreaField}
              requredField={false}
              value={profile.service_info ?? ''}
              maxLength={TEXT_AREA_MAX_LENGTH}
            />
          </div>
        </form>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default ProductServiceInfo;
