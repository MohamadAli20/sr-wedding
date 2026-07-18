import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';

export default function App() {
    return (
        <BrowserRouter>
            <audio
                autoPlay
                loop
                preload="metadata"
                src="/music/Westlife%20-%20%20Beautiful%20in%20white%20(Lyrics).mp3"
            />
            <Home />
        </BrowserRouter>
    );
}
