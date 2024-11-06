import styles from './SignUpComponentsPageLayout.module.css';

const SignUpComponentsPageLayout = ({
  header,
  content,
  footer,
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
      </div>
    </div>
  );
};

export default SignUpComponentsPageLayout;
