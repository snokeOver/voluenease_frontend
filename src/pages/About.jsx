import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | VolunEase</title>
      </Helmet>
      <div id="about_image" className="relative w-full">
        <img
          src="https://images.ctfassets.net/81iqaqpfd8fy/6edoNow0XSDKMFSpmARS7k/01aedabc537cc07cfc29b557ff44b9d8/DoSomething-Revised-Homepage-10-3-2022.jpg"
          alt="About_image"
        />
        <div className="absolute flex h-full w-full items-center lg:bg-gradient-to-l from-[#1d1c1c6b] to-[rgba(21, 21, 21, 0.00)] rounded-xl top-0 left-0">
          <div className="bg-gray-200 mx-auto text-gray-700 w-1/2 p-2 lg:p-10 hidden lg:block">
            <h2 className="text-xl md:text-2xl lg:text-4xl xl:text-6xl font-semibold w-full lg:w-fit text-center md:text-left border-b-4 border-prime mb-1 md:mb-5">
              About Us
            </h2>
            <p className="text-center text-xs md:text-base md:text-left">
              We believe that together we can build a world where all people can
              lead free and dignified lives. Meet our team and see where we came
              from, what we do, and where we are going.
            </p>
          </div>
        </div>
        <div className="bg-base-200 mx-auto px-2 md:px-10 py-10 lg:hidden flex flex-col items-center text-center gap-4">
          <h2 className="text-xl font-semibold w-fit text-center  border-b-4 border-prime mb-1 md:mb-5">
            About Us
          </h2>
          <p className=" text-sm md:text-base text-left">
            We believe that together we can build a world where all people can
            lead free and dignified lives. Meet our team and see where we came
            from, what we do, and where we are going.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
