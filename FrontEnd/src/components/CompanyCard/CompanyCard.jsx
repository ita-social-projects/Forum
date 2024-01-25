import { Link } from 'react-router-dom';
import { StarOutlined, StarFilled } from '@ant-design/icons';
// import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
// import axios from 'axios';
import styles from './CompanyCard.module.css';
// import { useUser } from '../../hooks';
// import PropTypes from 'prop-types';

// const CompanyCard = ({ companyData, isAuthorized, userData, issaved }) => {
//   CompanyCard.propTypes = {
//     companyData: PropTypes.object,
//     isAuthorized: PropTypes.any,
//     userData: PropTypes.any,
//     issaved: PropTypes.bool,
//   };

//   const company = companyData;
//   company.issaved = issaved;

//   const { mutate } = useSWRConfig();
//   const authToken = localStorage.getItem('Token');
//   const currentDate = new Date();
//   const currentYear = currentDate.getFullYear();
//   const yearsOfExperiense = company.founded ? currentYear - company.founded : 0;
//   const [isSaved, setIsSaved] = useState(company.is_saved);
//   const [star, setStar] = useState(false);
//   // const ownCompany = userData && company.personId == userData.id;
//   console.log(isSaved);
//   console.log(company.issaved);

//   async function sendRequest(url) {
//     return await axios.post(
//       url,
//       { user: userData?.id, company: company['id'] },
//       {
//         withCredentials: true,
//         headers: {
//           Authorization: `Token ${authToken}`,
//         },
//       }
//     );
//   }

//   const { trigger } = useSWRMutation(
//     `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
//     sendRequest
//   );

//   const handleClick = async () => {
//     try {
//       await trigger({ optimisticData: () => setIsSaved(!isSaved) });
//       mutate(
//         (key) => typeof key === 'string' && key.startsWith('/api/profiles/'),
//         {
//           revalidate: true,
//         }
//       );
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const getStar = () => {
//     if (userData && company.personId == userData.id) {
//       setStar(false);
//       setIsSaved(false);
//     } else {
//       if (isSaved) {
//         setStar(filledStar);
//         setIsSaved(true);
//       } else {
//         setIsSaved(false);
//         setStar(outlinedStar);
//       }
//     }
//   };
//   const filledStar = (
//     <StarFilled
//       className={styles['star']}
//       onClick={handleClick}
//       data-testid="star"
//     />
//   );
//   const outlinedStar = (
//     <StarOutlined
//       className={styles['star']}
//       onClick={handleClick}
//       data-testid="emptystar"
//     />
//   );
//   const { trigger: triggerget } = useSWRMutation(
//     `${process.env.REACT_APP_BASE_API_URL}/api/profiles`,
//     getStar
//   );
//   useEffect(() => {
//     if (isAuthorized) {
//       try {
//         triggerget();
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   }, [isAuthorized, triggerget]);

export default function CompanyCard({
  companyData,
  isAuthorized,
  userData,
  issaved,
}) {
  const profile = companyData;
  profile.issaved = issaved;
  console.log(profile.issaved);
  console.log(userData);
  const [isSaved, setIsSaved] = useState(profile.issaved);
  const { mutate } = useSWRConfig();
  // const { user } = useUser();
  // const saved = useMemo(() => {
  //   return {
  //     is_saved: issaved,
  //   };
  // }, [issaved]);
  // const saved = issaved;
  // const [isSaved, setIsSaved] = useState(saved);
  // console.log(isSaved);
  // const profile = useMemo(() => {
  //   return {
  //     id: companyData.id,
  //     personId: companyData.person,
  //     name: companyData.name,
  //     region: companyData.region,
  //     categories: companyData.categories,
  //     saved: issaved,
  //     logo: companyData.logo_image,
  //     banner: companyData.banner_image,
  //     founded: companyData.founded,
  //     issaved: companyData.issaved,
  //   };
  // }, [companyData]);
  // const company = {
  //   saved: issaved,
  // };
  // console.log(issaved);
  // console.log(companyData);
  // const profile = companyData;
  // profile.issaved = issaved;
  // console.log(profile.issaved);
  // console.log(userData);
  // const [isSaved, setIsSaved] = useState(profile.issaved);
  console.log(profile.issaved, isSaved);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearsOfExperiense = profile.founded ? currentYear - profile.founded : 0;
  const ownProfile = userData && userData.id === profile.person;

  async function sendRequest(url, { arg: data }) {
    const authToken = localStorage.getItem('Token');
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify(data),
    }).then();
  }

  const { trigger } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
    sendRequest
  );

  const handleClick = async () => {
    try {
      await trigger(
        { user: userData.id, company: profile.id },
        { optimisticData: () => setIsSaved(!isSaved) }
      );
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/profiles/'),
        {
          revalidate: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filledStar = (
    <StarFilled
      style={{ color: '#FFD800', fontSize: '24px' }}
      onClick={handleClick}
    />
  );
  const outlinedStar = (
    <StarOutlined
      style={{ color: '#FFD800', fontSize: '24px' }}
      onClick={handleClick}
    />
  );
  useEffect(() => {}, [isSaved]);

  // const CategoryBadges = ({ categories }) => {
  //   return (
  //     <>
  //       {categories
  //         ? categories.map((category) => (
  //             <Badge
  //               key={category.id}
  //               size="medium"
  //               count={category.name.toUpperCase()}
  //               style={{
  //                 backgroundColor: '#1F9A7C',
  //                 fontWeight: 600,
  //                 fontFamily: 'Inter',
  //                 fontSize: 10,
  //               }}
  //             />
  //           ))
  //         : ''}
  //     </>
  //   );
  // };

  return (
    <div className={styles['company-card']}>
      <div className={styles['company-card__block']}>
        <div className={styles['company-card__image-frame']}>
          {profile.banner ? (
            <img
              src={profile.banner}
              alt="Company Banner"
              className={styles['company-card__image']}
            />
          ) : (
            <img
              className={styles['company-card__empty-image']}
              src={`${process.env.REACT_APP_PUBLIC_URL}/svg/profile-view-image-empty.svg`}
              alt={profile.name}
            />
          )}
        </div>
        <div className={styles['company-card__text-block']}>
          <div className={styles['company-card__text-block__header']}>
            <div className={styles['company-card__category-text']}>
              {profile.categories &&
                profile.categories.map((category) => category.name).join(' ')}
            </div>
            <div className={styles['company-card__name-text']}>
              <Link
                className={styles['company-card__name-text_link']}
                to={`/profile-detail/${profile.id}`}
              >
                {profile.name}
              </Link>
              <br />
            </div>
          </div>
          <div className={styles['company-card__address-text']}>
            {profile.address}
          </div>
          <div className={styles['company-card__badges-block']}>
            <div className={styles['company-card__badges']}>
              <div className={styles['company-card__badge']}>
                <div className={styles['company-card__badge-text']}>
                  {yearsOfExperiense} років досвіду
                </div>
              </div>
            </div>
            {/* {star} */}
            {isAuthorized && !ownProfile
              ? isSaved
                ? filledStar
                : outlinedStar
              : null}
          </div>
        </div>
      </div>
      <div className={styles['company-card__logo']}>
        <div className={styles['company-card__logo-ellipse']}>
          {profile.logo ? (
            <img
              src={profile.logo}
              alt="Logo"
              className={styles['company-card__logo-image']}
            />
          ) : (
            <img
              className={styles['company-card__logo-image']}
              src={`${process.env.REACT_APP_PUBLIC_URL}/companies-logos/default_logo.png`}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}

//   return (
//     <div className={styles['company-card']}>
//       <div className={styles['company-card__block']}>
//         <div className={styles['company-card__image-frame']}>
//           {company.banner_image ? (
//             <img
//               src={company.banner_image}
//               alt="Company Banner"
//               className={styles['company-card__image']}
//             />
//           ) : (
//             <img
//               className={styles['company-card__empty-image']}
//               src={`${process.env.REACT_APP_PUBLIC_URL}/svg/profile-view-image-empty.svg`}
//               alt={company.name}
//             />
//           )}
//         </div>
//         <div className={styles['company-card__text-block']}>
//           <div className={styles['company-card__text-block__header']}>
//             <div className={styles['company-card__category-text']}>
//               {company.categories &&
//                 company.categories.map((category) => category.name).join(' ')}
//             </div>
//             <div className={styles['company-card__name-text']}>
//               <Link
//                 className={styles['company-card__name-text_link']}
//                 to={`/profile-detail/${company.id}`}
//               >
//                 {company.name}
//               </Link>
//               <br />
//             </div>
//           </div>
//           <div className={styles['company-card__address-text']}>
//             {company.address}
//           </div>
//           <div className={styles['company-card__badges-block']}>
//             <div className={styles['company-card__badges']}>
//               <div className={styles['company-card__badge']}>
//                 <div className={styles['company-card__badge-text']}>
//                   {yearsOfExperiense} років досвіду
//                 </div>
//               </div>
//             </div>
//             {star}
//             {/* {isAuthorized && !ownCompany
//               ? isSaved
//                 ? filledStar
//                 : outlinedStar
//               : null} */}
//           </div>
//         </div>
//       </div>
//       <div className={styles['company-card__logo']}>
//         <div className={styles['company-card__logo-ellipse']}>
//           {company.logo_image ? (
//             <img
//               src={company.logo_image}
//               alt="Logo"
//               className={styles['company-card__logo-image']}
//             />
//           ) : (
//             <img
//               className={styles['company-card__logo-image']}
//               src={`${process.env.REACT_APP_PUBLIC_URL}/companies-logos/default_logo.png`}
//               alt=""
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CompanyCard;
