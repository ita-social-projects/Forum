import axios from 'axios';
//import useSWR from 'swr';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect } from 'react';
import './Companies.css';
import { ProductCard } from './companies-product-cards/CompaniesProductCards';

const MainCompanies = () => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const [searchResults, setSearchResults] = useState([]);
  const { mutate } = useSWRConfig();
  const [newMembers, setNewMembers] = useState(true);

  const fetcher = (url) => axios.get(url).then((res) => res.data.results);
  async function useNewMembers(url) {
    const data = await fetcher(url);
    setSearchResults(data);
  }

  const { trigger } = useSWRMutation(
    `${baseUrl}/api/profiles/?new_members=-completeness,-created_at`,
    useNewMembers
  );

  mutate((key) => typeof key === 'string' && key.startsWith('/api/profiles/'), {
    revalidate: true,
  });
  useEffect(() => {
    if (newMembers) {
      try {
        trigger();
        setNewMembers(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  useNewMembers();
  const NewMembersList = searchResults;
  console.log(NewMembersList);
  const companyDataList = [
    {
      category: 'Виноробство',
      name: '«Ace&W by Stakhovsky»',
      address: 'Київ, Київська обл, Закарпатська обл.',
      badges: ['15 років досвіду', 'експорт', 'мін. опт'],
      logoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/1.png`,
      photoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-images/1.jpeg`,
    },
    {
      category: 'Імпортер',
      name: 'Regno',
      address: 'Київ',
      badges: ['13 років досвіду', 'імпорт', 'великий опт'],
      logoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/2.png`,
      photoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-images/2.jpeg`,
    },
    {
      category: 'Сироварня',
      name: 'Мукко',
      address: 'Львів, Львівська обл',
      badges: ['5 років досвіду', 'сімейне виробництво'],
      logoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/33.jpeg`,
      photoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-images/3.jpeg`,
    },
  ];
  const companyDataListSecond = [
    {
      category: 'РІТЕЙЛЕР',
      name: 'АСОЦІАЦІЯ РІТЕЙЛЕРІВ УКРАЇНИ',
      address: 'Київ, Київська обл, Закарпатська обл.',
      badges: ['15 років досвіду'],
      logoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/44.jpeg`,
      photoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-images/4.jpeg`,
    },
    {
      category: 'Виробник',
      name: 'МХП',
      address: 'Київ, Київська обл',
      badges: ['15 років досвіду'],
      logoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/5.jpeg`,
      photoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-images/5.jpeg`,
    },
    {
      category: 'Роздрібна торгівля',
      name: 'Сільпо',
      address: 'Київ, Київська обл',
      badges: ['9 років досвіду'],
      logoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/66.png`,
      photoSrc: `${process.env.REACT_APP_PUBLIC_URL}/companies-images/6.jpeg`,
    },
  ];

  return (
    <div className="new-companies-main">
      <div className="new-companies">
        <div className="new-companies-main__header">Нові учасники</div>
      </div>
      <div className="new-companies-block">
        <div className="new-companies-block__row">
          {companyDataList.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </div>
        <div className="new-companies-block__row">
          {companyDataListSecond.map((data, index) => (
            <ProductCard key={index} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCompanies;
