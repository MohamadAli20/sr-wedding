import "./Parents.css";

const parents = {
    groom: {
        title: "Parents of the Groom",
        names: [
            "Mr. Alicasan Calanda",
            "Mrs. Anylie Calanda",
        ],
    },
    bride: {
        title: "Parents of the Bride",
        names: [
            "Mr. Reynaldo Taguinod",
            "Mrs. Alicia Taguinod",
        ],
    },
};

export default function Parents() {
    return (
        <section className="section parents-section" id="parents">

            <p className="kicker">
                With Love & Gratitude
            </p>

            <h2>
                Honoring Our <em>Parents</em>
            </h2>

            <p className="parents-intro">
                We lovingly honor our parents whose guidance, sacrifices, 
                unconditional love, and unwavering support have shaped the 
                people we are today. Their love, wisdom, and blessings remain 
                forever in our hearts and in every cherished moment of our 
                journey together.
            </p>

            <div className="parents-grid">

                <article className="parent-card">

                    <small>{parents.groom.title}</small>

                    {parents.groom.names.map((parent) => (
                        <h3 key={parent}>{parent}</h3>
                    ))}

                </article>

                <article className="parent-card">

                    <small>{parents.bride.title}</small>

                    {parents.bride.names.map((parent) => (
                        <h3 key={parent}>{parent}</h3>
                    ))}

                </article>

            </div>

        </section>
    );
}