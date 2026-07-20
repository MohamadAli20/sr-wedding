import "./Entourage.css";

const sections = [
    {
        title: "Officiating Ministers",
        items: [
            "Pastor Bryan Taguinod",
            "Pastor Bernardino Mandigma",
        ],
    },
    {
        title: "Principal Sponsors",
        items: [
            "Mr. and Mrs. William Uy",
            "Mr. and Mrs. Edwin Pamittan",
            "Mr. and Mrs. Joaquin Gerena",
            "Mr. and Mrs. Strauss Tobias",
            "Mr. and Mrs. Cornelio Lomboy",
            "Mrs. Violy Saquing",
            "Mrs. Aida Batang",
        ],
    },
    {
        title: "Maid of Honor & Best Man",
        duo: {
            left: {
                title: "Maid of Honor",
                name: "Eva Marie Taguiam",
            },
            right: {
                title: "Best Man",
                name: "TBA",
            },
        },
    },
    {
        title: "Bridesmaids & Groomsmen",
        pairs: [
            {
                bride: "Rizzah Ramos",
                groom: "Jairus Ramos",
                role: "Veil",
            },
            {
                bride: "Zheia Elaiza Blancad",
                groom: "Elvin James Pamittan",
                role: "Candle",
            },
            {
                bride: "Jana Vee Quinagoran",
                groom: "Samuel Quinagoran",
                role: "Cord",
            },
            {
                bride: "Queen Marlee Callueng",
                groom: "Daniel Jhay Ramos",
                role: "White Sheet",
            },
        ],
    },
    {
        title: "Little Attendants & Coordinators",
        bearers: [
            "Contract Bearer — Darren Japheth Ramos",
            "Bible Bearer — Titus Jair Gonzales",
            "Ring Bearer — Yshan Evrei Balatico",
        ],
        flowers: [
            "Ivanna Quinagoran",
            "Jade Vien Quinagoran",
            "Clesthryn Fheiza Mamotos",
        ],
        coordinators: [
            "Pastor Jerome Gonzales",
            "Jemima Ramos",
        ],
    },
];

export default function Entourage() {
    return (
        <section className="section entourage" id="entourage">

            <p className="kicker">
                Standing with us
            </p>

            <h2>
                Our <em>Entourage</em>
            </h2>

            <div className="entourage-grid">

                {sections.map((section) => (

                    <article
                        className="entourage-card"
                        key={section.title}
                    >

                        <h3>{section.title}</h3>

                        {section.items && (

                            <ul>

                                {section.items.map((item) => (

                                    <li key={item}>
                                        {item}
                                    </li>

                                ))}

                            </ul>

                        )}

                        {section.duo && (

                            <div className="duo">

                                <div className="duo-item">

                                    <small>
                                        {section.duo.left.title}
                                    </small>

                                    <h4>
                                        {section.duo.left.name}
                                    </h4>

                                </div>

                                <div className="duo-item">

                                    <small>
                                        {section.duo.right.title}
                                    </small>

                                    <h4>
                                        {section.duo.right.name}
                                    </h4>

                                </div>

                            </div>

                        )}

                        {section.pairs && (

                            <>

                                <div className="pair-header">

                                    <span>Bridesmaids</span>

                                    <span>Groomsmen</span>

                                </div>

                                {section.pairs.map((pair) => (

                                    <div
                                        className="pair-row"
                                        key={pair.bride}
                                    >

                                        <div>

                                            {pair.bride}

                                        </div>

                                        <div>

                                            {pair.groom}

                                            <small>

                                                {pair.role}

                                            </small>

                                        </div>

                                    </div>

                                ))}

                            </>

                        )}

                        {section.bearers && (

                            <div className="attendants">

                                <h4>Bearers</h4>

                                <ul>

                                    {section.bearers.map((item)=>(

                                        <li key={item}>{item}</li>

                                    ))}

                                </ul>

                                <h4>Flower Girls</h4>

                                <ul>

                                    {section.flowers.map((item)=>(

                                        <li key={item}>{item}</li>

                                    ))}

                                </ul>

                                <h4>Coordinators</h4>

                                <ul>

                                    {section.coordinators.map((item)=>(

                                        <li key={item}>{item}</li>

                                    ))}

                                </ul>

                            </div>

                        )}

                    </article>

                ))}

            </div>

        </section>
    );
}