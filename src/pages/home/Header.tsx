export function Header() {
  return (
    <header className="py-6 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 flex items-center gap-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center text-white font-bold">
            Q
          </div>
          <div>
            <h1 className="text-lg font-semibold">QRFY</h1>
            <p className="text-xs text-gray-400">QR Code Generator</p>
          </div>
        </div>
        <nav className="flex items-center gap-8 text-base text-gray-600 flex-1">
          <a className="font-bold px-3 py-2 rounded-md transition-colors hover:bg-gray-100 ">
            Products
          </a>
          <a className="font-bold px-3 py-2 rounded-md transition-colors hover:bg-gray-100 ">
            Resources
          </a>
          <a className="font-bold px-3 py-2 rounded-md transition-colors hover:bg-gray-100 ">
            Plans and Prices
          </a>
          <a className="font-bold px-3 py-2 rounded-md transition-colors hover:bg-gray-100 ">
            FAQ
          </a>
          <a className="font-bold px-3 py-2 rounded-md transition-colors hover:bg-gray-100 ">
            API
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <a
            href="/login"
            aria-label="Log in"
            className="px-4 py-2 rounded-full border text-blue-600 text-sm font-medium"
          >
            Log In
          </a>
          <a
            href="/signup"
            aria-label="Register"
            className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium"
          >
            Register
          </a>
        </div>
      </div>
    </header>
  );
}
