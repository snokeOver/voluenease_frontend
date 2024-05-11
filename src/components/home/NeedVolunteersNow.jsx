import { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import useData from "../../hooks/useData";
import { goToTop } from "../../helper/goToTop";
import SectionTitle from "../shared/SectionTitle";
import PrimaryButton from "../shared/PrimaryButton";
import PostCard from "./PostCard";

const NeedVolunteersNow = () => {
  const { posts } = useData();

  const navigate = useNavigate();

  const [featuredSpots, setFeaturedSpots] = useState([]);

  // handle the show Tourist Spot button
  const handleShowDetailsBtn = (id) => {
    navigate(`/spot-details/${id}`);
    return goToTop();
  };

  // Filter out the Volunteers Need Now from each category
  useEffect(() => {
    if (posts) {
      const newFeaturedSpot = [];
      let countryCounts = {};
      posts.forEach((spot) => {
        const country = spot.country;
        if (!countryCounts[country]) {
          countryCounts[country] = 0;
        }
        if (countryCounts[country] < 1) {
          newFeaturedSpot.push(spot);
          countryCounts[country]++;
        }
      });
      setFeaturedSpots(newFeaturedSpot);
    }
  }, [posts]);

  return (
    <div className=" px-2 w-full bg-base-100 mb-10 pb-10 overflow-hidden">
      <div>
        <SectionTitle title="Volunteers Need Now" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5 group">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            handleShowDetailsBtn={handleShowDetailsBtn}
          />
        ))}
      </div>
      <div className="w-full mt-10">
        <Link
          to="/need-volunteer"
          className="flex  justify-center w-full md:w-3/4 lg:w-[40%] mx-auto"
        >
          <PrimaryButton textField="View All" />
        </Link>
      </div>
    </div>
  );
};

export default NeedVolunteersNow;
