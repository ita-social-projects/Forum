import './Text.css';
import {privacyPolicy} from "./Text";
export function PrivacyPolicy() {
  return (
    <div>
      <div className="divider"/>
      <div className="privacy-text">
        <h1>Privacy Policy</h1>
        <p>Updated: {privacyPolicy.updated}</p>
        <p>{privacyPolicy.intro}</p>
        <ul>
          {privacyPolicy.sections.map((section, index) => (
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
