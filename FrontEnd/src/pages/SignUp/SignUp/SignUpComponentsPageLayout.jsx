import styles from './SignUpComponentsPageLayout.module.css';

const SignUpComponentsPageLayout = ({
  header,
  content,
  footer,
  signinLine,
}) => {
  return (
    <div className={styles['page-layout']}>
      <div className={styles['page-layout__body']}>
        <div className={styles['page-layout__container']}>
          <div className={styles['page-layout__header']}>
            {header}
          </div>
          <div className={styles['page-layout__content']}>
            {content}
          </div>
          <div className={styles['page-layout__footer']}>
            <div className={styles['button-container']}>
              {footer}
            </div>
          </div>
        </div>
        {signinLine}
      </div>
    </div>
  );
};

export default SignUpComponentsPageLayout;
