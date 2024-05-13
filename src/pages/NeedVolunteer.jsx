import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";
import PageSkeleton from "../components/shared/PageSkeleton";
import SectionTitle from "../components/shared/SectionTitle";

import GoToTopBtn from "../components/shared/GoToTopBtn";
import VolunPostCard from "../components/needVolun/VolunPostCard";
import { goToTop } from "../helper/goToTop";
import useAxios from "../hooks/useAxios";

const NeedVolunteer = () => {
  const { pageLoading, setPageLoading } = useData();
  const nsAxios = useAxios();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);

  const [filteredArr, setFilteredArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPostNumber, setTotalPostNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const numberOfPages = Math.ceil(totalPostNumber / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Get the number of All Posts from the database
  useEffect(() => {
    const getTotalPostNumber = async () => {
      try {
        setPageLoading(true);
        const { data } = await nsAxios.get(`/api/post-number`);
        setTotalPostNumber(data.response);
        setPageLoading(false);
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
      }
    };
    getTotalPostNumber();
  }, []);

  // Get posts based on the pagination
  useEffect(() => {
    const getPostsByPagination = async () => {
      try {
        setPageLoading(true);
        const { data } = await nsAxios.get(
          `api/pagination-posts?page=${currentPage}&size=${itemsPerPage}`
        );
        setPosts(data);
        setPageLoading(false);
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
      }
    };

    if (currentPage && itemsPerPage) {
      getPostsByPagination();
    }
  }, [currentPage, itemsPerPage]);

  //   handle previous page
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  //   handle Next page
  const handleNext = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Set the filterred array based on the new posts
  useEffect(() => {
    setFilteredArr(posts);
  }, [posts]);

  // handle the show Volunteer post button
  const handleShowDetailsBtn = (id) => {
    navigate(`/post-details/${id}`);
    return goToTop();
  };

  // handle the filter
  const handleFilterSpot = (filterOps) => {
    let newArr = [...posts];

    if (filterOps === "deadline") {
      newArr.sort((a, b) => {
        // Convert deadline strings to Date objects
        const dateA = new Date(a.deadline);
        const dateB = new Date(b.deadline);

        // Compare the dates
        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });
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
                  <summary className="px-16 md:px-10 bg-prime dark:hover:bg-sky-600 hover:bg-sky-600 mb-1">
                    Sorted By
                  </summary>
                  <ul className="bg-gray-600  mx-auto  rounded-t-none rounded-b-lg py-2">
                    <li
                      className=" hover:border-b-2 rounded-none hover:border-prime dark:hover:hover:border-prime mr-2"
                      onClick={() => handleFilterSpot("all")}
                    >
                      <a>All</a>
                    </li>
                    <li
                      className=" hover:border-b-2 rounded-none hover:border-prime dark:hover:hover:border-prime mr-2"
                      onClick={() => handleFilterSpot("deadline")}
                    >
                      <a>Deadline</a>
                    </li>
                    <li
                      className=" hover:border-b-2 rounded-none hover:border-prime dark:hover:hover:border-prime mr-2"
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
          <div className="flex justify-center my-12">
            <button
              onClick={handlePrevious}
              className="btn py-2 md:px-4  btn-primary btn-outline disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <div className="flex items-center -mx-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-1 rtl:-scale-x-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>

                <span className="hidden lg:flex">Previous</span>
              </div>
            </button>

            {pages.map((page) => (
              <button
                onClick={() => setCurrentPage(page + 1)}
                key={page}
                className={`btn mx-1 bg-transparent
                  ${currentPage === page + 1 ? "border border-prime" : ""}`}
              >
                {page + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              className="btn py-2 md:px-4 btn-primary btn-outline disabled:cursor-not-allowed disabled:text-gray-500"
            >
              <div className="flex items-center -mx-1">
                <span className="hidden lg:flex">Next</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-1 rtl:-scale-x-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </button>
            <div className="ml-2">
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(e.target.value);
                  setCurrentPage(1);
                }}
                className="select select-bordered w-full border-primary"
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="12">12</option>
                <option value="15">15</option>
              </select>
            </div>
          </div>
        </div>
      )}
      <GoToTopBtn />
    </>
  );
};

export default NeedVolunteer;
