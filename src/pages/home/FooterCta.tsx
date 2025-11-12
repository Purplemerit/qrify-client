export function FooterCta() {
  return (
    <footer className="pt-12 pb-24 text-center">
      <div className="max-w-md mx-auto">
        <h3 className="text-2xl font-bold mb-4">Do not leave with doubt</h3>
        <p className="text-gray-500 mb-6">
          In this section you will find the basic concepts and the necessary
          steps to start enjoying the benefits of using QR.
        </p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full">
            Basic information
          </button>
          <button className="px-6 py-3 border rounded-full">
            Design and creation
          </button>
          <button className="px-6 py-3 border rounded-full">
            Scan and print
          </button>
        </div>
      </div>
    </footer>
  );
}
