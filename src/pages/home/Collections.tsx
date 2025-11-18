export function Collections() {
  return (
    <section className="text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
        Explore our extensive collection of QR codes
      </h2>
      <p className="text-gray-500 mb-6 md:mb-8 text-sm md:text-base">
        QR codes can contain a wide range of content and at QRFY we offer them
        all.
      </p>

      <div
        className="overflow-hidden relative rounded-2xl md:rounded-[28px]"
        style={{
          height: "250px",
          minHeight: "200px",
        }}
      >
        <img
          src="/qrs-for-events-x2-B_KNjck6.webp"
          alt="qr codes"
          width="711"
          height="353"
          srcSet="/qrs-for-events-x2-B_KNjck6.webp 1422w"
          sizes="711px"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(0, 0, 0, 1) 0%, rgba(10, 0, 15, 0.95) 15%, rgba(20, 5, 25, 0.85) 30%, rgba(30, 10, 35, 0.7) 45%, rgba(40, 15, 45, 0.5) 60%, rgba(50, 20, 55, 0.3) 75%, rgba(60, 25, 65, 0.15) 85%, rgba(0, 0, 0, 0) 100%)",
          }}
        />
        <div className="relative z-10 p-4 md:p-8 flex flex-col justify-center h-full text-left max-w-lg">
          <h3 className="text-2xl md:text-4xl font-normal mb-3 md:mb-4 text-white leading-tight">
            Create a unique
            <br />
            invitation for an
            <br />
            unforgettable event.
          </h3>
          <button
            className="px-4 py-2 border text-white text-sm md:text-base rounded-full md:rounded-[28px] w-fit"
          >
            See more
          </button>
        </div>
      </div>

      <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center gap-2 md:gap-4 w-full">
        <button className="flex-1 px-3 md:px-6 py-3 md:py-4 bg-white border-b-2 border-blue-500 text-center text-sm md:text-base hover:bg-blue-50 hover:border-blue-600 transition-colors duration-200 focus:bg-blue-100 focus:border-blue-700 focus:outline-none">
          QR code for weddings
        </button>
        <button className="flex-1 px-3 md:px-6 py-3 md:py-4 bg-white border-b-2 border-blue-500 text-center text-sm md:text-base hover:bg-blue-50 hover:border-blue-600 transition-colors duration-200 focus:bg-blue-100 focus:border-blue-700 focus:outline-none">
          QR code for NGOs
        </button>
        <button className="flex-1 px-3 md:px-6 py-3 md:py-4 bg-white border-b-2 border-blue-500 text-center text-sm md:text-base hover:bg-blue-50 hover:border-blue-600 transition-colors duration-200 focus:bg-blue-100 focus:border-blue-700 focus:outline-none">
          QR code for photographers
        </button>
      </div>
    </section>
  );
}
