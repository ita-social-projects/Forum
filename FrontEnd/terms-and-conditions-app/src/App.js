import './App.css';
import Footer from "./components/UI/footer/Footer";
import Header from "./components/UI/header/Header";
import {TermsAndConditions} from "./components/terms_conditions/TermsAndConditionsComponent";
import ScrollToTopButton from "./components/terms_conditions/ScrollToTopButton";


function App() {
  return (
    <div className="App">
        <Header isAuthorized={true}/>
        <TermsAndConditions/>
        <ScrollToTopButton/>
        <Footer/>
    </div>
  );
}

export default App;