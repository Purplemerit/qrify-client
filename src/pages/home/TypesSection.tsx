interface TypesSectionProps {
  onTypeSelect: (type: string) => void;
  activeType: string;
}

export function TypesSection({ onTypeSelect, activeType }: TypesSectionProps) {
  const types = [
    "Website",
    "PDF",
    "vCard Plus",
    "Images",
    "Text",
    "Video",
    "Business",
  ];
  return (
    <section className="text-center">
      <h2 className="text-3xl font-bold mb-2">
        Generate different types of QR Codes
      </h2>
      <p className="text-gray-500 mb-6">
        QR codes can hold a large amount of content and at QRFY, we offer them
        all.
      </p>

      <div className="flex flex-wrap justify-center gap-10 my-6">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => onTypeSelect(t)}
            className={`w-28 text-center cursor-pointer transition-all ${
              activeType === t
                ? "transform scale-110"
                : "hover:transform hover:scale-105"
            }`}
          >
            <div
              className={`w-16 h-16 mx-auto flex items-center justify-center ${
                activeType === t ? "text-blue-600" : "text-gray-400"
              }`}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 24C44 12.96 35.04 4 24 4C12.96 4 4 12.96 4 24C4 35.04 12.96 44 24 44"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M15.9992 6H17.9992C14.0992 17.68 14.0992 30.32 17.9992 42H15.9992"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M30 6C31.94 11.84 32.92 17.92 32.92 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 32V30C11.84 31.94 17.92 32.92 24 32.92"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 17.9992C17.68 14.0992 30.32 14.0992 42 17.9992"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M36.4 42.8C39.9346 42.8 42.8 39.9346 42.8 36.4C42.8 32.8654 39.9346 30 36.4 30C32.8654 30 30 32.8654 30 36.4C30 39.9346 32.8654 42.8 36.4 42.8Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M44 44L42 42"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div
              className={`mt-2 text-sm font-medium ${
                activeType === t ? "text-blue-600" : "text-gray-600"
              }`}
            >
              {t}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
