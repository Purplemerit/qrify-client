export function Collections() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-6">
        Explore our extensive collection of QR codes
      </h2>
      <p className="text-gray-500 mb-8">
        QR codes can contain a wide range of content and at QRFY we offer them
        all.
      </p>

      <div
        className="overflow-hidden relative"
        style={{
          height: "300px",
          borderRadius: "28px",
          backgroundImage:
            "linear-gradient(90deg, rgb(34, 14, 39) 32%, rgba(34, 14, 39, 0.2) 60%, rgba(34, 14, 39, 0) 100%)",
        }}
      >
        <div className="relative z-10 p-8 w-1/2 flex flex-col justify-center h-full text-left">
          <h3 className="text-4xl font-semibold mb-4 text-white">
            Create a unique
            <br />
            invitation for an
            <br />
            unforgettable event.
          </h3>
          <button
            className="px-4 py-2 border text-white"
            style={{ borderRadius: "28px", width: "fit-content" }}
          >
            See more
          </button>
        </div>
        <div
          className="absolute top-0 right-0 h-full"
          style={{ width: "calc(65%)" }}
        >
          <img
            src="/qrs-for-events-x2-B_KNjck6.webp"
            alt="qr codes"
            width="711"
            height="353"
            srcSet="/qrs-for-events-x2-B_KNjck6.webp 1422w"
            sizes="711px"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-6">
        <button className="px-6 py-3 bg-white border rounded shadow">
          QR code for weddings
        </button>
        <button className="px-6 py-3 bg-white border rounded shadow">
          QR code for NGOs
        </button>
        <button className="px-6 py-3 bg-white border rounded shadow">
          QR code for photographers
        </button>
      </div>
    </section>
  );
}
