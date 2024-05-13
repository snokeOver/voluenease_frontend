import { Helmet } from "react-helmet-async";
import { goToTop } from "../helper/goToTop";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import Banner from "../components/home/Banner";
import NeedVolunteersNow from "../components/home/NeedVolunteersNow";
import WhatMakeUsDifferent from "../components/home/WhatMakeUsDifferent";
import AwardSection from "../components/home/AwardSection";

const Home = () => {
  return (
    <>
      {goToTop()}
      <div className="w-full overflow-hidden">
        <Helmet>
          <title>Home | VolunEase</title>
        </Helmet>
        <Banner />
        <div className="md:container mx-auto">
          <NeedVolunteersNow />
        </div>
        <WhatMakeUsDifferent />

        <div className="md:container mx-auto">
          <AwardSection />
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default Home;
