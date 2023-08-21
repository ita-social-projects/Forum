import './App.css';
import React, { useState} from 'react';
import SearchBar from './search_field/SearchBar';
import SearchResults from './search_field/SearchResults';
import axios from 'axios';

export function Search () {
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (searchTerm) => {

    // Make an AJAX request to Django API to get search results
    axios.get(`http://localhost:8000/api/search/?search_field=${searchTerm}`)      // send data to django
      .then(response => {
        setSearchResults(response.data);                                              // put getted data from Django to searchResults
      })
      .catch(error => {                                                               // if we get ay error while getting data
        console.error('Error fetching search results:', error);                       // print error in console
      });

    console.log(SearchResults)
    setSearchPerformed(true);
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <div className='main_block'>
        <h2>Пошук компанії</h2>
        <SearchBar onSearch={handleSearch} />
        <br/>
        <SearchResults results={searchResults} searchPerformed={searchPerformed} searchTerm={searchTerm} />
        <br/>
      </div>
    </div>
  )
}

















// import {SearchResults} from "./components/search_menu/main_block";

// function App() {
//   return (
//     <div className="App">
//         <Header isAuthorized={true}/>
//         <SearchResults/>
//         <Footer/>
//     </div>
//   );
// }

// export default App;



// class SearchList extends React.Component {
//   state = { details: [], }
//   componentDidMount() {
//     let data;
//     axios.get('http://localhost:8000/api/v1/search/')
//     .then(res => {
//       data = res.data;
//       this.setState({
//         details: data
//       });
//     })
//     .catch(err => { })                        // cathch errors
//   }

//   render() {
//     return (
//       <div>
//         <p>Data from django</p>
//         <hr></hr>
//         {this.state.details.map((output, id) => (
//           <div key = {id}>
//             <h3>{output.comp_name}</h3>
//             <h3>{output.comp_common_info}</h3>
//             <h3>{output.comp_product_info}</h3>
//           </div>
//         ))}
//       </div>
//     )
//   }

// }

// export default SearchList;