import './App.css';
import Footer from "./components/UI/footer/Footer";
import Header from "./components/UI/header/Header";
import {PrivacyPolicy} from "./components/privacy/PrivacyPolicyComponent";
import ScrollToTopButton from "./components/privacy/ScrollToTopButton";


function App() {
  return (
    <div className="App">
        <Header isAuthorized={true}/>
        <PrivacyPolicy/>
        <Footer/>
        <ScrollToTopButton/>
    </div>
  );
}

export default App;
