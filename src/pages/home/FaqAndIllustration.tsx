export function FaqAndIllustration() {
  const questions = [
    "What is a QR Code ?",
    "Know the benefits of using QR",
    "How to start using QR",
  ];
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-2">
          Everything you need to know to get started
        </h2>
        <p className="text-gray-500 mb-6">
          In this section you will find the basic concepts and the necessary
          steps to start enjoying the benefits of using QR.
        </p>

        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <details key={i} className="bg-white rounded p-4 shadow-sm">
              <summary className="cursor-pointer font-medium">
                {questions[i % questions.length]}
              </summary>
              <p className="mt-2 text-sm text-gray-500">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </p>
            </details>
          ))}
        </div>
      </div>

      <div className="p-8 flex items-center justify-center">
        <div className="w-80 h-96 bg-gray-50 rounded-lg shadow flex items-center justify-center">
          Illustration
        </div>
      </div>
    </section>
  );
}
