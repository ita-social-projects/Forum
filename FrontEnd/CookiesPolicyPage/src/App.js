import './App.css';
import CookiesPolicyComponent from "./components/cookies/CookiesPolicyComponent";
import Footer from "./components/UI/footer/Footer";
import Header from "./components/UI/header/Header";
import ScrollButton from "./components/UI/scrollButton/ScrollButton";

function App() {
  return (
    <div className="app">
        <Header isAuthorized={true}/>
        <CookiesPolicyComponent/>
        <ScrollButton/>
        <Footer/>
    </div>
  );
}

export default App;
