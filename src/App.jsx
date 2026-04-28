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
import Favorites from "./components/Favorites.jsx";
import ProductModal from "./components/ProductModal.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import Navbar from "./components/Navbar.jsx";
import Transactions from "./components/Transactions.jsx";
import { useStore } from "./store/store";

function App() {
  const { activePage } = useStore();

  return (
    <>
        <Navbar />
        {activePage === 'HOME' ? (
            <>
                <CarouselApp />
                <CategoryApp />
                <CardApp/>
            </>
        ) : (
            <Transactions />
        )}
        
        {/* Drawers and Modals should always be accessible */}
        <Cart />
        <Favorites />
        <ProductModal />
        <CheckoutModal />
    </>
  )
}

export default App
