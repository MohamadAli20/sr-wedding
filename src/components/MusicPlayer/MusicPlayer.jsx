import { useEffect, useRef, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa";
import "./MusicPlayer.css";

export default function MusicPlayer() {
    const audioRef = useRef(null);

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;

        const saved = localStorage.getItem("musicPlaying");

        if (saved === "true") {
            audio.play().catch(() => {});
            setPlaying(true);
        }
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            localStorage.setItem("musicPlaying", "false");
        } else {
            audioRef.current.play();
            localStorage.setItem("musicPlaying", "true");
        }

        setPlaying(!playing);
    };

    return (
        <>
            <audio
                ref={audioRef}
                src="/music/BeautifulInWhite.mp3"
                loop
                preload="auto"
            />

            <button
                className={`music-player ${playing ? "playing" : ""}`}
                onClick={toggleMusic}
                aria-label="Toggle Music"
            >
                {playing ? <FaPause /> : <FaMusic />}
            </button>
        </>
    );
}