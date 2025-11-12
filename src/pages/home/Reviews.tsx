export function Reviews() {
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-4">
        Our clients tell you why they should choose QRFY
      </h2>
      <p className="text-gray-500 mb-8">through their reviews in Google</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-6 shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gray-100" />
              <div className="text-left">
                <div className="font-semibold">A D Joshi</div>
                <div className="text-sm text-gray-400">July 21, 2025</div>
              </div>
            </div>
            <div className="text-yellow-400">★★★★★ 5.0</div>
            <p className="text-sm text-gray-500 mt-4">
              Created the QR code in blink of a second. I created for My Road
              Safety Website address, for easy login to my followers. Thanks
              QRFY
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button className="px-6 py-3 bg-white border rounded-full">
          See more reviews
        </button>
      </div>
    </section>
  );
}
