import './Text.css';
import './PrivacyPolicyComponent.css';
import { privacyPolicy } from './Text';
import { useEffect } from 'react';

export function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="block-privacypolicy block-size">
      <div className="divider" />
      <div className="privacy-text">
        <h2>Privacy Policy</h2>
        <p>Updated: {privacyPolicy.updated}</p>
        <p>{privacyPolicy.intro}</p>
        <ul>
          {privacyPolicy.sections.map((section, index) => (
            <li key={index}>
              <h3>{section.title}</h3>
              <p>{section.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
