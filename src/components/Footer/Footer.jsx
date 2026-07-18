import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <p>&ldquo;Together is a wonderful place to be.&rdquo;</p>
            <strong>Saifudin <i>&</i> Rea Mae</strong>
            <small>&copy; 2026 &middot; Made with love</small>
            <p className="developer-contact">
                <a
                    href="https://web.facebook.com/profile.php?id=61591840748292"
                    target="_blank"
                    rel="noreferrer"
                >
                    Need a wedding website? Contact the developer.
                </a>
            </p>
        </footer>
    );
}
