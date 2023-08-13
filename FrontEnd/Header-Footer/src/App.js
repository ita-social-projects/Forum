import './App.css';
import Header from "./components/UI/header/Header.js";
import Footer from "./components/UI/footer/Footer.js";

function App() {
  return (
    <div className="app">
      <Header isAuthorized={false} ></Header>
      <Footer page=""></Footer>
    </div>
  );
}

export default App;
