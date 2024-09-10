import classNames from 'classnames';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
import css from './ImageField.module.css';
import PendingStatus from '../../../MiniComponents/PendingModerationIcon/PendingStatus';

const ImageField = ({
  name,
  label,
  accept,
  inputType = 'text',
  value,
  updateHandler,
  onDeleteImage,
  profile,
  error,
}) => {

  const backgroundImage = {
    background: `url(${value}) lightgray 50% / cover no-repeat`,
  };

  const renderInput = () => (
    <input
      accept={accept}
      id={name}
      type={inputType}
      className={css['upload-file__input']}
      name={name}
      onChange={updateHandler}
      onKeyDown={preventEnterSubmit}
    />
  );

  const renderUpdateImageLabel = (text) => (
    <label className={css['update-file__label']} htmlFor={name}>
      <img
        className={css['upload-file__icon']}
        src={`${process.env.REACT_APP_PUBLIC_URL}/profilepage/camera_icon.png`}
        alt="Change icon"
      />
      <span className={css['update-file__text']}>{text}</span>
    </label>
  );

  const renderDeleteButton = (text) => (
    <button
      type="button"
      className={css['upload-file__delete--wrapper']}
      onKeyDown={preventEnterSubmit}
      onClick={() => onDeleteImage(name)}
    >
      <img
        className={css['upload-file__icon']}
        src={`${process.env.REACT_APP_PUBLIC_URL}/profilepage/Vectordelete.png`}
        alt="Delete icon"
      />
      <span className={css['upload-file__delete--text']}>{text}</span>
    </button>
  );

  return (
    <div className={classNames(css['fields__column'], {
      [css['fields__column--logo']]: name === 'logo',
    })}>
      <div className={css['fields__label']}>
        <label className={classNames(css['fields__label--text'], css['fields__field--notrequired'])}>
          {label}
        </label>
        {name === 'banner' && value && (
          <>
            {renderInput()}
            {renderUpdateImageLabel('змінити')}
            {renderDeleteButton('видалити')}
          </>
        )}
      </div>
      <div className={css['upload-file__main']}>
        {renderInput()}
        {!value && (
          <label className={css['upload-file__label']} htmlFor={name}>
            <span className={css['upload-file__text']}>Оберіть файл</span>
          </label>
        )}
        {name === 'banner' && value && (
          <>
            <div className={css['upload-file__wrapper--banner-page']}>
              <span className={css['upload-file__banner-image--title']}>
                Зображення для банера на сторінці профайлу
              </span>
              <div className={css['tooltip-container']}>
                <PendingStatus profile={profile} elementType="banner" />
                <div
                className={css['upload-file__banner-image--page']}
                style={backgroundImage}
                />
              </div>
            </div>
            <div className={css['upload-file__wrapper--banner-card']}>
              <span className={css['upload-file__banner-image--title']}>
                Зображення для карток
              </span>
              <div> <PendingStatus profile={profile} elementType="banner" />
                <div
                  className={css['upload-file__banner-image--card']}
                  style={backgroundImage}
                />
              </div>
              </div>
          </>
        )}
        {name === 'logo' && value && (
        <div> <PendingStatus profile={profile} elementType="logo" />
          <div className={css['upload-file__wrapper--logo']}>
            <div className={css['upload-file__logo']} style={backgroundImage} />
            {renderInput()}
            {renderUpdateImageLabel('змінити')}
            {renderDeleteButton('видалити')}
          </div>
          </div>
        )}
      </div>
      {error && <div className={css['error-message']}>{error}</div>}
    </div>
  );
};

export default ImageField;
