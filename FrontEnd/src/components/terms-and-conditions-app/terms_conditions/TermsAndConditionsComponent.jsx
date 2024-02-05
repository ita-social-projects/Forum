import './Text.css';
import './TermsAndConditionsComponent.css';
import { useEffect } from 'react';
import { termsConditions } from './Text';

export function TermsAndConditions() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="block-terms_and_conditions block-size">
      <div className="root-container">
        <div className="divider" />
        <div className="terms-conditions-main">
          <div className="title-container">
            <h2 className="title-terms_and_conditions">Terms & Conditions</h2>
            <p className="description">{termsConditions.intro}</p>
          </div>
        </div>
      </div>
      <div className="terms-conditions-text">
        <ul>
          <p>Updated: {termsConditions.info.updated}</p>
          <p>{termsConditions.info.intro}</p>
          {termsConditions.sections.map((section, index) => (
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

export default TermsAndConditions;
