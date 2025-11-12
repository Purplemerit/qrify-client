export function HowToCreate() {
  const steps = [
    {
      image: "/howto1.PNG",
      title: "Choose the content of your QR code",
      description:
        "Select from a wide variety of options: PDF, menu, video, business cards, web, apps, etc.",
    },
    {
      image: "/howto2.PNG",
      title: "Customize your QR code design",
      description:
        "Personalize your QR code with colors, shapes, frames, and logos to match your brand.",
    },
    {
      image: "/howto3.PNG",
      title: "Download and use your QR code",
      description:
        "Download your QR code in various formats and start using it in your marketing materials.",
    },
  ];

  return (
    <section className="text-center px-4">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
        QR Code Generator: Create your Free QR Code
      </h2>
      <p className="text-gray-500 mb-8 text-sm sm:text-base max-w-2xl mx-auto">
        Customize it with your color, shape and logo in 3 simple steps.
      </p>

      <h3 className="text-3xl sm:text-4xl font-light mb-12">
        How to create a QR code?
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {steps.map((step, i) => (
          <div key={i} className="rounded-lg transition-shadow p-6">
            <div className="h-32 sm:h-40 md:h-48 rounded-lg mb-4 overflow-hidden flex items-center justify-center">
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  e.currentTarget.parentElement.classList.add(
                    "bg-gradient-to-br",
                    "from-blue-50",
                    "to-purple-50"
                  );
                }}
              />
            </div>
            <h4 className="font-semibold mb-3 text-base sm:text-lg text-gray-900">
              {step.title}
            </h4>
            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 sm:mt-12">
        <button className="px-6 sm:px-8 py-3 sm:py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors text-sm sm:text-base">
          Create QR Code
        </button>
      </div>
    </section>
  );
}
