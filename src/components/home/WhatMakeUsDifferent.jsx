import { useEffect } from "react";
import useData from "../../hooks/useData";
import Marquee from "react-fast-marquee";
import SectionTitle from "../shared/SectionTitle";
import WhyUsCard from "./WhyUsCard";

const WhatMakeUsDifferent = () => {
  const { getWhyUsData, whyUsData } = useData();

  //   load why-us data on first render
  useEffect(() => {
    getWhyUsData();
  }, []);

  return (
    <div className=" px-2 w-full bg-base-100 mb-10 overflow-hidden">
      <div>
        <h3 className="mt-8 ml-5 text-lg text-center md:text-left">
          <span className="text-primary font-semibold">WHY US?</span>
        </h3>
        <SectionTitle title="What Makes us Different?" />
      </div>

      <div className="text-center md:container md:mx-auto py-3 px-1 md:p-3 md:py-14">
        <Marquee>
          <div className="flex ">
            {whyUsData.map((card) => (
              <WhyUsCard key={card._id} card={card} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default WhatMakeUsDifferent;
