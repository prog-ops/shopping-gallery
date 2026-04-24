import './App.css'
// import CApp from "./api1/c.jsx";
// import {AApp} from "./api1/a.jsx";
// import {BApp} from "./api1/b.jsx";
// import DApp from "./api1/d.jsx";
// import ImageCarousel from "./api1/e.jsx";
// import {F} from "./api1/BuildASimpleCarouselLib.jsx";
import CarouselApp from "./api1/CarouselApp.jsx";
import CategoryApp from "./api2/CategoryApp.jsx";
import {CardApp} from "./api3/CardApp.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  return (
    <>
            <CarouselApp />
            <CategoryApp />
            <CardApp/>
            <Cart />
    </>
  )
}

export default App
