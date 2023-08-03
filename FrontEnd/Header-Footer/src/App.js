import './App.css';
import Footer from "./components/UI/footer/Footer";
import Header from "./components/UI/header/Header";


function App() {
  return (
    <div className="App">

        <Header isAuthorized={true}></Header>
        <Footer></Footer>
    </div>
  );
}

export default App;
