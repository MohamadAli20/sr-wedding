import { FaGift, FaHeart } from "react-icons/fa6";
import "./GiftRegistry.css";
export default function GiftRegistry() {
  return (
    <section id="gifts" className="section gifts">
      <div>
        <p className="kicker">Your presence is a present</p>
        <h2>
          Gifts from the <em>heart</em>
        </h2>
        <p>
          Your love and prayers are more than enough. For friends and family who
          wish to bless our new beginning, a contribution toward our future
          together will be received with grateful hearts.
        </p>
      </div>
      <article>
        <FaGift />
        <h3>A little extra love</h3>
        <p>Scan the QR code to send your gift via PNB instaPay.</p>
        <img
          className="gift-qr"
          src="/images/pnb-instapay-qr.png"
          alt="PNB instaPay QR code for wedding gifts"
          loading="lazy"
        />
        <FaHeart />
      </article>
    </section>
  );
}
