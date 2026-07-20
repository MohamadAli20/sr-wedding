import { useEffect, useRef, useState } from "react";
import "./MusicPlayer.css";

export default function MusicPlayer() {
    const audioRef = useRef(null);

    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("music");

        if (saved === "playing") {
            const start = async () => {
                try {
                    await audioRef.current.play();
                    setPlaying(true);
                } catch {
                    // Browser will require user interaction.
                }
            };

            start();
        }
    }, []);

    const toggleMusic = async () => {
        if (!audioRef.current) return;

        if (playing) {
            audioRef.current.pause();
            setPlaying(false);
            localStorage.setItem("music", "paused");
        } else {
            try {
                await audioRef.current.play();
                setPlaying(true);
                localStorage.setItem("music", "playing");
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <>
            <audio
                ref={audioRef}
                loop
                preload="auto"
                src="/music/BeautifulInWhite.mp3"
            />

            <button
                className="music-player"
                onClick={toggleMusic}
            >
                <span>♪</span>

                <div>
                    <strong>Music</strong>
                    <small>
                        {playing ? "Playing" : "Play"}
                    </small>
                </div>
            </button>
        </>
    );
}