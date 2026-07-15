import "../assets/styles/hero.css";

export default function Hero() {
  return (
    <section className="hero" id="home">

      {/* Floral Decorations */}
      <img
        src="/images/floral-top-left.png"
        className="hero__flower hero__flower--tl"
        alt=""
      />

      <img
        src="/images/floral-bottom-right.png"
        className="hero__flower hero__flower--br"
        alt=""
      />

      <div className="hero__content">

        <p className="hero__welcome">
          Together with our families
        </p>

        <h1 className="hero__title">
          Saifudin
          <span>&</span>
          Rea Mae
        </h1>

        <p className="hero__subtitle">
          joyfully invite you to celebrate
          our wedding day
        </p>

        <div className="hero__date">

          <h2>20</h2>

          <div>

            <p>December</p>
            <p>2026</p>

          </div>

        </div>

        <div className="hero__buttons">

          <button className="btn btn-primary">
            RSVP
          </button>

          <button className="btn btn-outline">
            Our Story
          </button>

        </div>

      </div>

    </section>
  );
}