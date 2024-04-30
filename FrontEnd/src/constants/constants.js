export const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const PASSWORD_PATTERN = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,20}$/;
export const NAME_SURNAME_PATTERN = /^(?=.{2,50}$)[a-zA-Zа-щюяьА-ЩЮЯЬїЇіІєЄґҐ']+(\s[a-zA-Zа-щюяьА-ЩЮЯЬїЇіІєЄґҐ']+)*$/;
export const COMPANY_NAME_PATTERN = /^.{2,100}$/;
