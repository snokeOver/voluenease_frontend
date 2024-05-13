import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useData from "../hooks/useData";
import { useEffect, useState } from "react";
import PageSkeleton from "../components/shared/PageSkeleton";
import SectionTitle from "../components/shared/SectionTitle";
import { TfiLayoutGrid3, TfiLayoutMenuV } from "react-icons/tfi";
import { IoIosSearch } from "react-icons/io";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import VolunPostCard from "../components/needVolun/VolunPostCard";
import { goToTop } from "../helper/goToTop";
import useAxios from "../hooks/useAxios";
import PrimaryButton from "../components/shared/PrimaryButton";
import VolunTableCard from "../components/needVolun/VolunTableCard";

const NeedVolunteer = () => {
  const { pageLoading, setPageLoading } = useData();
  const nsAxios = useAxios();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredArr, setFilteredArr] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPostNumber, setTotalPostNumber] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const numberOfPages = Math.ceil(totalPostNumber / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  const [layoutSelect, setLayoutSelect] = useState(false);

  // Get the number of All Posts from the database
  useEffect(() => {
    const getTotalPostNumber = async () => {
      try {
        setPageLoading(true);
        const { data } = await nsAxios.get(`/api/post-number?search=${search}`);
        setTotalPostNumber(data.response);
        setPageLoading(false);
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
      }
    };
    getTotalPostNumber();
  }, [search]);

  // Get posts based on the pagination
  useEffect(() => {
    const getPostsByPagination = async () => {
      try {
        setPageLoading(true);
        const { data } = await nsAxios.get(
          `api/pagination-posts?page=${currentPage}&size=${itemsPerPage}&search=${search}`
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
  }, [currentPage, itemsPerPage, search]);

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

  // Handle the Search functionality
  const handleSearch = (e) => {
    e.preventDefault();

    const searchValue = e.target.parentNode.querySelector(
      'input[name="searchVal"]'
    ).value;
    setSearch(searchValue);
    e.target.parentNode.querySelector('input[name="searchVal"]').value = "";
    setCurrentPage(1);
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
        <div className="md:container bg-base-100  md:mx-auto px-2  overflow-hidden">
          <SectionTitle
            title="You Can Be The Volunteer"
            subTitle="Volunteering is an act of selflessness and compassion, where individuals offer their time, skills."
          />

          {/* navigation bar */}

          <div className="flex items-center flex-col lg:flex-row gap-4 justify-between min-h-0 bg-blue-200 dark:bg-gray-800 rounded-lg w-[98%] lg:w-[90%] mx-auto py-5 lg:py-0 px-5">
            {/* start part */}

            <div className="flex">
              <div className="flex gap-5 justify-center items-center">
                <form onSubmit={handleSearch} className="w-fit">
                  <fieldset className="form-control w-full">
                    <div className=" relative text-gray-400 text-xl font-semibold">
                      <input
                        type="text"
                        name="searchVal"
                        placeholder="Search . . . "
                        className="input search-input  w-full py-2 bg-transparent rounded-md  placeholder-gray-600 dark:placeholder-gray-100 border-prime"
                      />
                      <IoIosSearch
                        onClick={handleSearch}
                        className="absolute cursor-pointer hover:text-prime right-5  top-3"
                      />
                    </div>
                  </fieldset>
                </form>
                <div onClick={() => setSearch("")}>
                  <PrimaryButton textField="Reset Search" />
                </div>
              </div>
            </div>
            {/* End part */}
            <div className="flex items-center gap-10">
              <div className="flex flex-col lg:flex-row">
                <ul className="menu menu-horizontal px-1">
                  <li>
                    <details>
                      <summary className="px-14 bg-prime dark:hover:bg-sky-600 hover:bg-sky-600 text-gray-100 w-full">
                        Sorted By
                      </summary>
                      <ul className="p-2 rounded-t-none rounded-b-lg z-50 w-full">
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
                        <li
                          className=" hover:border-b-2 rounded-none hover:border-prime dark:hover:hover:border-prime mr-2"
                          onClick={() => handleFilterSpot("reset")}
                        >
                          <a>Reset Sort</a>
                        </li>
                      </ul>
                    </details>
                  </li>
                </ul>
              </div>
              <div className="flex gap-4">
                <div>
                  <TfiLayoutGrid3
                    onClick={() => setLayoutSelect(false)}
                    className={`cursor-pointer hover:text-primary text-2xl ${
                      !layoutSelect ? "text-primary" : ""
                    }`}
                  />
                </div>
                <div>
                  <TfiLayoutMenuV
                    onClick={() => setLayoutSelect(true)}
                    className={`cursor-pointer hover:text-primary text-2xl ${
                      layoutSelect ? "text-primary" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-base-100 py-3 px-1 md:p-3 md:py-14">
            {filteredArr.length > 0 ? (
              layoutSelect ? (
                // Grid Format
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:px-5 group">
                  {filteredArr.map((post) => (
                    <VolunPostCard
                      key={post._id}
                      post={post}
                      handleShowDetailsBtn={handleShowDetailsBtn}
                    />
                  ))}
                </div>
              ) : (
                <>
                  {/* Table Format */}
                  <div className="max-w-[22rem] xs:max-w-[23rem] md:max-w-5xl  mx-auto">
                    <div className="card w-full  shadow-2xl bg-base-100">
                      {/* Table for posts */}
                      <div className="overflow-x-auto py-7 ">
                        <table className="table">
                          {/* head */}
                          <thead>
                            <tr className="text-left">
                              <th></th>
                              <th>Title</th>
                              <th>No. of Volunteers</th>
                              <th>Deadline</th>
                              <th>Location</th>
                              <th>Category</th>
                              <th colSpan="2" className="text-center">
                                Action
                              </th>
                            </tr>
                            <tr>
                              <th colSpan="8">
                                <div className="divider -my-3"></div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {filteredArr.map((post, index) => (
                              <VolunTableCard
                                index={index}
                                key={post._id}
                                post={post}
                              />
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : (
              <div>
                <h2 className="text-3xl text-yellow-400">
                  Your search matched no data !
                </h2>
              </div>
            )}
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
                  ${currentPage === page + 1 ? "border border-primary" : ""}`}
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
