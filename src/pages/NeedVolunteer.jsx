import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";
import PageSkeleton from "../components/shared/PageSkeleton";
import SectionTitle from "../components/shared/SectionTitle";

import GoToTopBtn from "../components/shared/GoToTopBtn";
import VolunPostCard from "../components/needVolun/VolunPostCard";

const NeedVolunteer = () => {
  const { posts, pageLoading } = useData();

  const [filteredArr, setFilteredArr] = useState([]);

  useEffect(() => {
    setFilteredArr(posts);
  }, [posts]);
  const navigate = useNavigate();

  // handle the show Volunteer post button
  const handleShowDetailsBtn = (id) => {
    navigate(`/spot-details/${id}`);
  };

  // handle the filter
  const handleFilterSpot = (filterOps) => {
    let newArr = [...posts];

    if (filterOps === "cost") {
      newArr.sort(
        (a, b) =>
          parseInt(a.cost.replace(/\D/g, ""), 10) -
          parseInt(b.cost.replace(/\D/g, ""), 10)
      );
    } else if (filterOps === "number") {
      newArr.sort((a, b) => b.volunNumber - a.volunNumber);
    }

    setFilteredArr(newArr);
  };

  return (
    <>
      <Helmet>
        <title>Need Volunteer | VolunEase</title>
      </Helmet>
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <div className="md:container bg-base-100   md:mx-auto px-2  overflow-hidden">
          <SectionTitle
            title="You Can Be The Volunteer"
            subTitle="Volunteering is an act of selflessness and compassion, where individuals offer their time, skills."
          />
          {/* Sort Functionality */}
          <div className="flex justify-center text-center my-5">
            <ul className="menu w-fit">
              <li className=" ">
                <details className=" rounded-md text-gray-50 font-semibold ">
                  <summary className="px-16 md:px-10 bg-primary dark:hover:bg-green-600 hover:bg-blue-600 mb-1">
                    Sorted By
                  </summary>
                  <ul className="bg-gray-600  mx-auto  rounded-t-none rounded-b-lg py-2">
                    <li
                      className=" hover:border-b-2 rounded-lg hover:border-blue-500 dark:hover:hover:border-green-500 mr-2"
                      onClick={() => handleFilterSpot("all")}
                    >
                      <a>All</a>
                    </li>
                    <li
                      className=" hover:border-b-2 rounded-lg hover:border-blue-500 dark:hover:hover:border-green-500 mr-2"
                      onClick={() => handleFilterSpot("deadline")}
                    >
                      <a>Deadline</a>
                    </li>
                    <li
                      className=" hover:border-b-2 rounded-lg hover:border-blue-500 dark:hover:hover:border-green-500 mr-2"
                      onClick={() => handleFilterSpot("number")}
                    >
                      <a>Volunteer Number</a>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </div>
          <div className="text-center bg-base-100 py-3 px-1 md:p-3 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 md:px-5 group">
              {filteredArr.map((post) => (
                <VolunPostCard
                  key={post._id}
                  post={post}
                  handleShowDetailsBtn={handleShowDetailsBtn}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      <GoToTopBtn />
    </>
  );
};

export default NeedVolunteer;
