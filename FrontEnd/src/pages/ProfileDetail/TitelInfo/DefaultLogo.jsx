import classes from './DefaultLogo.module.css';

function DefaultLogo () {
    return (
        <div className={classes['default_logo_container']}>
            <svg className={classes['default_ellipse']} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="20" fill="#DEE1E8"/>
            </svg>
            <svg className={classes['default_logo']} xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
                <mask id="mask0_2511_4933" x="0" y="0" width="34" height="34">
                    <circle cx="17" cy="17" r="16.875" fill="white"/>
                </mask>
                <g mask="url(#mask0_2511_4933)">
                    <path fillRule="evenodd" clipRule="evenodd" d="M4.5 17.3125V27H17H29.5V17.3125V7.625H17H4.5V17.3125ZM25.1917 10.2048L26.8301 10.3591V17.3503V24.3413L16.9393 24.2781L7.04854 24.2148L6.98422 17.2684L6.9199 10.322L7.59102 10.2208C8.70655 10.0524 23.4335 10.0391 25.1917 10.2048ZM10.9927 12.2459C10.2786 12.661 9.80898 13.8097 10.0718 14.499C10.7061 16.164 13.1939 15.8909 13.6163 14.1096C13.7417 13.5806 13.6272 13.3043 13.0386 12.717C12.275 11.9551 11.715 11.8262 10.9927 12.2459ZM18.5136 15.4355C18.0602 16.0015 17.4447 16.8189 17.1459 17.252C16.4922 18.1994 16.1735 18.2316 15.4155 17.4266L14.8388 16.8138L12.582 19.0565C11.3408 20.29 10.3252 21.3829 10.3252 21.4854C10.3252 21.5881 13.4498 21.6719 17.2687 21.6719C23.2388 21.6719 24.1932 21.6225 24.0769 21.3202C23.9002 20.8608 19.5706 14.4062 19.4391 14.4062C19.3837 14.4062 18.9672 14.8696 18.5136 15.4355Z" fill="#BFC6CF"/>
                </g>
            </svg>
          </div>
    );

}

export default DefaultLogo;
