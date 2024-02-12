import './App.css'
import CApp from "./api1/c.jsx";
import {AApp} from "./api1/a.jsx";
import {BApp} from "./api1/b.jsx";
import DApp from "./api1/d.jsx";
import ImageCarousel from "./api1/e.jsx";
import {F} from "./api1/BuildASimpleCarouselLib.jsx";
import Api1App from "./api1/Api1.jsx";
import Api2AApp from "./api2/Api2A.jsx";
import {Api3AApp} from "./api3/Api3A.jsx";

function App() {
  return (
    <>
        {/*<AApp />*/}
        {/*tampil semua*/}
        {/*<BApp />*/}
        {/*tampil 3*/}
        {/*<CApp />*/}
        {/*<DApp />*/}
        {/*<ImageCarousel />*/}
        {/*<F />*/}
        <div>
            <Api1App />
            <Api2AApp />
            <Api3AApp/>
        </div>
    </>
  )
}

export default App
