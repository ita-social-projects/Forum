import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import AdminSubmitButton from '../../../components/MiniComponents/AdminSubmitButton';

import classes from './AdminInfo.module.css';

const AdminInfo = ({ user, mutate }) => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: {
        'name': user.name,
        'surname': user.surname,
        },
    });

    const onSubmit = (data) => {
      axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, data)
        .then(() => {
          toast.success('Зміни успішно збережено');
          mutate();
        })
        .catch((error) => {
          console.error(
            'Помилка:',
            error.response ? error.response.data : error.message
          );
          if (!error.response || error.response.status !== 401) {
            toast.error('Не вдалося зберегти зміни, сталася помилка');
          }
        });
    };

    const errorMessageTemplates = {
        required: 'Обов’язкове поле',
        nameSurnameFieldLength: 'Введіть від 2 до 50 символів',
        notAllowedSymbols: 'Поле містить недопустимі символи та/або цифри',
        maxLength: 'Кількість символів перевищує максимально допустиму (50 символів)',
      };

    const validateNameSurname = (value) => {
        const allowedSymbolsPattern = /^[a-zA-Zа-щюяьА-ЩЮЯЬїЇіІєЄґҐ'\s]+$/;
        const letterCount = (value.match(/[a-zA-Zа-щюяьА-ЩЮЯЬїЇіІєЄґҐ]/g) || [])
          .length;
        if (!allowedSymbolsPattern.test(value)) {
          return errorMessageTemplates.notAllowedSymbols;
        }
        if (letterCount < 2) {
          return errorMessageTemplates.nameSurnameFieldLength;
        }
        return true;
      };

    const onBlurHandler = (fieldName) => {
    let fieldValue = getValues(fieldName);
    if (fieldValue !== undefined && fieldValue !== null) {
        fieldValue = fieldValue.replace(/\s{2,}/g, ' ').trim();
        setValue(fieldName, fieldValue);
    }
    };

    return (
        <div className={classes['admin-info-form']}>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={classes['admin-info-form__container']}>
                <div className={classes['admin-info-form__column']}>
                    <div className={classes['admin-info-form__label']}>
                    <label className={classes['admin-info-form__label--required']} htmlFor="name">
                        *
                    </label>
                    <label className={classes['admin-info-form__label--text']} htmlFor="name">Ім‘я</label>
                    </div>
                    <div className={classes['admin-info-form__field']}>
                        <input
                            className={classes['admin-info-form__input']}
                            id="name"
                            autoComplete="name"
                            type="text"
                            placeholder="Ім‘я"
                            {...register('name', {
                                required: errorMessageTemplates.required,
                                validate: validateNameSurname,
                                maxLength: {
                                    value: 50,
                                    message: errorMessageTemplates.maxLength
                                  },
                            })}
                            onBlur={() => onBlurHandler('name')}
                        />
                    </div>
                    <div className={classes['admin-info-form__error']}>
                    {errors.name && errors.name.message}
                    </div>
                </div>
                <div className={classes['admin-info-form__column']}>
            <div className={classes['admin-info-form__label']}>
              <label className={classes['admin-info-form__label--required']} htmlFor="surname">
                *
              </label>
              <label className={classes['admin-info-form__label--text']} htmlFor="surname">
                Прізвище
              </label>
            </div>
            <div className={classes['admin-info-form__field']}>
                <input
                  className={classes['admin-info-form__input']}
                  id="surname"
                  autoComplete="family-name"
                  type="text"
                  placeholder="Прізвище"
                  {...register('surname', {
                    required: errorMessageTemplates.required,
                    validate: validateNameSurname,
                    maxLength: {
                        value: 50,
                        message: errorMessageTemplates.maxLength
                      },
                  })}
                  onBlur={() => onBlurHandler('surname')}
                />
            </div>
            <div className={classes['admin-info-form__error']}>
              {errors.surname && errors.surname.message}
            </div>
          </div>
          <AdminSubmitButton disabled={!isDirty}/>
        </div>
    </form>
    </div>
    );
};

export default AdminInfo;