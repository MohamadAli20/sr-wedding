import { useEffect, useRef, useState } from "react";
import { FaMusic, FaPause } from "react-icons/fa";
import "./MusicPlayer.css";

const playlist = [
    "/music/BeautifulInWhite.mp3",
    "/music/Zaheen-NahalalKawin.mp3",
    "/music/Firehouse-LoveofaLifetime.mp3",
    // Add more songs here
];

export default function MusicPlayer() {
    const audioRef = useRef(null);

    const [playing, setPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);

    // Restore playback state
    useEffect(() => {
        const saved = localStorage.getItem("musicPlaying");

        if (saved === "true") {
            setPlaying(true);
        }
    }, []);

    // Play whenever the song changes
    useEffect(() => {
        if (playing && audioRef.current) {
            audioRef.current.play().catch(() => {});
        }
    }, [currentSong, playing]);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            localStorage.setItem("musicPlaying", "false");
        } else {
            audioRef.current.play().catch(() => {});
            localStorage.setItem("musicPlaying", "true");
        }

        setPlaying(!playing);
    };

    // Automatically play the next song
    const nextSong = () => {
        setCurrentSong((prev) => (prev + 1) % playlist.length);
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentSong]}
                preload="auto"
                onEnded={nextSong}
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