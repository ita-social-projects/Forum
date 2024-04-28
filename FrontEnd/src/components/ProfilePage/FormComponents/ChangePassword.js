import axios from 'axios';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
import PasswordField from './FormFields/PasswordField';
import Loader from '../../loader/Loader';
import css from './ChangePassword.module.css';


export default function ChangePassword(props) {
    const { setFormIsDirty } = useContext(DirtyFormContext);
    const { currentFormNameHandler, curForm } = props;
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        reset,
        formState: { errors, isDirty },
      } = useForm({
        mode: 'all',
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            reNewPassword: ''
        }
      });

    useEffect(() => {
      currentFormNameHandler(curForm);
    }, [currentFormNameHandler, curForm]);

    useEffect(() => {
        setFormIsDirty(isDirty);
    }, [isDirty, setFormIsDirty]
    );

    const handleFormSubmit = () => {
        axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/set_password/`, {
            current_password: getValues('currentPassword'),
            new_password: getValues('newPassword'),
            re_new_password: getValues('reNewPassword')
        })
            .then(() => toast.success('Пароль успішно змінено'))
            .catch(() => toast.error('Виникла помилка. Можливо, вказано невірний поточний пароль'));
            reset();
    };

    return (
        <div className={css['form__container']}>
            {props.user
                ?
                <form id="ChangePassword" onSubmit={handleSubmit(handleFormSubmit)}>
                    <PasswordField
                        inputId="currentPassword"
                        name="currentPassword"
                        label="Поточний пароль"
                        register={register}
                        error={errors}
                        showError={false}
                        watch={watch}
                        checkValid={false}
                        checkMatch={
                            {
                                isCheck: false,
                                checkWith: null
                            }
                        }
                    />
                    <PasswordField
                        inputId="newPassword"
                        name="newPassword"
                        label="Новий пароль"
                        error={errors}
                        register={register}
                        showError={true}
                        watch={watch}
                        checkValid={true}
                        checkMatch={
                            {
                                isCheck: false,
                                checkWith: null
                            }
                        }
                    />
                    <PasswordField
                        inputId="reNewPassword"
                        name="reNewPassword"
                        label="Повторіть новий пароль"
                        error={errors}
                        register={register}
                        watch={watch}
                        checkValid={false}
                        checkMatch={
                            {
                                isCheck: true,
                                checkWith: 'newPassword'
                            }
                        }
                    />
                </form>
                : <Loader />
            }
        </div>
    );
}

ChangePassword.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        profile_id: PropTypes.number.isRequired,
        is_staff: PropTypes.bool.isRequired
    }).isRequired,
    currentFormNameHandler: PropTypes.func.isRequired,
    curForm: PropTypes.string.isRequired
};


