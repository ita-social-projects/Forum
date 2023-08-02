import './App.css';
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";


function App() {
  return (
    <div className="App">

        <Header isAuthorized={true}></Header>
        <Footer></Footer>
    </div>
  );
}

export default App;
