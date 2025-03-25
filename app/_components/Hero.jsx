import React from "react";

function Hero() {
  return (
    <div>
      <section className="bg-white text-black">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
              Create Forms in Seconds
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-gray-500">
            EasyFormAI lets you design and deploy customized forms in seconds with intuitive AI-driven tools for effortless data collection.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded-sm border border-teal-600 bg-primary px-12 py-3 text-sm font-medium text-white hover:bg-purple-500 hover:text-white focus:ring-3 focus:outline-hidden sm:w-auto"
                href="#"
              >
                + Create AI Form
              </a>

              <a
                className="block w-full rounded-sm border border-blue-600 px-12 py-3 text-sm font-medium text-black hover:bg-purple-400 focus:ring-3 focus:outline-hidden sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
