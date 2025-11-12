export function Discover() {
  const cards = [
    {
      title: "Business cards",
      description:
        "Turn your card into an interactive tool by adding a QR code that connects clients and employers with your work, social networks and contact information.",
      image: "/qrs-on-cards-2x-4t0A1eJG.webp",
      link: "/qr-codes-on/business-cards",
    },
    {
      title: "Pamphlets",
      description:
        "Expand the printed information on your pamphlets with a QR code, offering interactive content and measuring its reach in real time.",
      image: "/qrs-on-flyers-2x-BPWiaElX.webp",
      link: "/qr-codes-on/pamphlets",
    },
    {
      title: "Brochures",
      description:
        "Complement the content of your brochures by adding a QR code that provides access to multimedia content such as videos and online documents.",
      image: "/qrs-on-brochures-2x-DQaxf5W3.webp",
      link: "/qr-codes-on/brochures",
    },
  ];

  return (
    <section
      className="w-full text-center py-16 px-4 md:px-8 lg:px-16"
      style={{ backgroundColor: "#F3F3FF" }}
    >
      <p className="text-blue-600 font-semibold text-sm mb-3 uppercase tracking-wide">
        QR CODES ON
      </p>
      <h2 className="text-3xl md:text-4xl font-normal text-gray-900 mb-12">
        Discover how to use QR codes to boost your marketing strategy
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {cards.map((card, index) => (
          <div
            key={index}
            className="group bg-white rounded-lg overflow-hidden"
          >
            <div className="bg-white" style={{ padding: "6px" }}>
              <div
                className="flex items-center justify-center bg-[#F7F7F7]"
                style={{ height: "258px" }}
              >
                <img
                  src={card.image}
                  alt="make a free qr code"
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </div>
            <div className="p-6">
              <p className="text-lg font-semibold text-gray-900 mb-3">
                {card.title}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {card.description}
              </p>
              <a
                href={card.link}
                className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              >
                <span>More Info</span>
                <svg
                  className="w-4 h-4"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M13.92,8.38a1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4A1,1,0,0,0,8.29,4.71L10.59,7H3A1,1,0,0,0,3,9h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4A1,1,0,0,0,13.92,8.38Z"></path>
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
