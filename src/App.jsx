import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import MusicPlayer from "./components/MusicPlayer/MusicPlayer";

export default function App() {
    return (
        <>
            <MusicPlayer />
            <Home />
        </>
    );
}
