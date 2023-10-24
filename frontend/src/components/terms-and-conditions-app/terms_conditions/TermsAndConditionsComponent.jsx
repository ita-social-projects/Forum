import './Text.css';
import { termsConditions } from './Text';
export function TermsAndConditions() {
  return (
    <div>
      <div className="root-container">
        <div className="divider" />
        <div className="terms-conditions-main">
          <div className="title-container">
            <h1 className="title">Terms & Conditions</h1>
            <p className="description">{termsConditions.intro}</p>
          </div>
        </div>
      </div>
      <div className="terms-conditions-text">
        <ul>
          <p>Updated: {termsConditions.info.updated}</p>
          <p>{termsConditions.info.intro}</p>
          {termsConditions.sections.map((section, index) => (
            <p key={index}>
              <h2>{section.title}</h2>
              <p>{section.content}</p>
            </p>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default TermsAndConditions;
