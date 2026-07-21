import './Footer.css';

export default function Footer() {
    return (
        <footer>
            <p>&ldquo;Together is a wonderful place to be.&rdquo;</p>

            <strong className="couple-name">
                Saifudin <i>&</i> Rea Mae
            </strong>

            <small className="copyright">
                &copy; 2026 &middot; Made with love
            </small>

            <div className="developer-contact">
                <span className="developer-label">
                    Designed &amp; Developed by
                </span>

                <a
                    href="https://mohamadali20.github.io/ali-calanda-portfolio"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="developer-name">Ali Calanda</span>
                    <span className="developer-divider">•</span>
                    <span className="developer-role">
                        Full Stack Developer
                    </span>
                    <span className="developer-divider">•</span>
                    <span className="developer-portfolio">
                        View Portfolio ↗
                    </span>
                </a>
            </div>
        </footer>
    );
}