import { useEffect } from 'react';

const ReCaptchaLoader = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.REACT_APP_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      const reCaptchaBadge = document.querySelector('.grecaptcha-badge');
      if (reCaptchaBadge) {
        reCaptchaBadge.style.display = 'none';
      }
    };
  }, []);

  return null;
};

export default ReCaptchaLoader;
