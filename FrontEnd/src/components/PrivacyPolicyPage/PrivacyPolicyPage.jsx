
import { useEffect } from 'react';


function PrivacyPolicy() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="block-cookies_policy block-size">
            <p>Hello world</p>
        </div>
    );
}

export default PrivacyPolicy;