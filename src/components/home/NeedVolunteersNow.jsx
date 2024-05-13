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

  // handle the show Tourist Spot button
  const handleShowDetailsBtn = (id) => {
    navigate(`/post-details/${id}`);
    return goToTop();
  };

  return (
    <div className=" px-2 w-full bg-base-100 mb-10 pb-10 overflow-hidden">
      <div>
        <SectionTitle title="Volunteers Need Now" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 px-5 group">
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
