import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";

import { Helmet } from "react-helmet-async";
import useAxios from "../hooks/useAxios";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import { goToTop } from "../helper/goToTop";
import PageSkeleton from "../components/shared/PageSkeleton";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import ActionButton from "../components/shared/ActionButton";

const PostDetails = () => {
  const nsAxios = useAxios();
  const { setToastMsg } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [postCard, setPostCard] = useState({});
  const { id } = useParams();
  const [pageLoading, setPageLoading] = useState(true);
  // Get the Spots that this user added
  useEffect(() => {
    const getSingleData = async () => {
      try {
        const { data } = await nsAxios.get(`/api/post/${id}`);
        if (data) {
          setPostCard(data);
          setPageLoading(false);
        } else {
          console.log(data);
          setPageLoading(false);
        }
      } catch (err) {
        console.log(err.response);
        setPageLoading(false);
      }
    };
    if (user) {
      setPageLoading(true);
      getSingleData();
    }
  }, [user]);

  // Calculate Total price
  const formateTotalVisitors = (visitors) => {
    const formatedVisitors = visitors.toLocaleString("en-US");
    return formatedVisitors;
  };

  // Handle the add to cart button
  const handleBeVolunteer = (id) => {
    if (!user) {
      navigate("/login");
      return goToTop();
    }
    //  const result = getCartIdsFromLST(user?.uid);
    //  if (result.includes(id)) {
    //    return setToastMsg("Tourist Spot Already Added To Cart  !");
    //  } else {
    //    storeCartIdsToLST(user?.uid, id);
    //    setCartNumber(result.length + 1);
    //    storeUserPreference();
    //    return setToastMsg("Tourist Spot added succesfully  !");
    //  }
  };

  return (
    <>
      <Helmet>
        <title>Post Details | VolunEase</title>
      </Helmet>
      <div className="md:container mx-2 bg-base-100 md:mx-auto">
        <div className="card card-compact w-full  px-4 py-4">
          {pageLoading ? (
            <div>
              <PageSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:p-8">
              <figure className="w-full mx-auto rounded-xl ">
                <img
                  className="h-full py-4 "
                  src={postCard.imageUrl}
                  alt={postCard.imageUrl}
                />
              </figure>
              <div className="card-body text-left w-full">
                <div className="flex justify-between items-center">
                  <h2 className="card-title text-2xl md:text-4xl font-bold text-heading-color playfair-font">
                    {postCard.title}
                  </h2>
                  <div>
                    <h5 className=" px-4 py-1 bg-primary text-gray-100 font-semibold rounded-xl inline-block">
                      {postCard.category}
                    </h5>
                  </div>
                </div>

                <div className=" font-mediumpy-5 mt-3 text-message-color">
                  <h4 className="text-lg text-left">
                    <span className="font-extrabold text-lg mr-2">
                      Deadlines:
                    </span>
                    <h5 className=" text-primary text-lg font-semibold inline-block">
                      {postCard.deadline}
                    </h5>
                  </h4>
                </div>
                <div className=" font-mediumpy-5 mt-3 text-message-color">
                  <h4 className="text-lg text-left">
                    <span className="font-extrabold text-lg mr-2">
                      Number of Volunteers:
                    </span>
                    {postCard.volunNumber}
                  </h4>
                </div>

                <div className="my-2">
                  <span className="font-extrabold text-lg mr-2">
                    Description:
                  </span>
                  <br />
                  <p className="text-justify">{postCard.description}</p>
                </div>

                <div className="divider mb-0"></div>
                <div className="flex flex-col gap-3 font-medium  pt-5 text-message-color">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <FaLocationDot className="text-lg" />
                      <h3 className="text-message-color">Location:</h3>
                    </div>
                    <span className="font-bold">{postCard.location}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <FaPhoneAlt className="text-lg" />
                      <h3 className="text-message-color">Organizer Name:</h3>
                    </div>
                    <span className="font-bold">{postCard.name}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="flex items-center gap-3">
                      <MdEmail className="text-lg" />
                      <h3 className="text-message-color">Organizer Email:</h3>
                    </div>
                    <span className="font-bold">{postCard.email}</span>
                  </div>
                </div>

                <div
                  className="flex gap-10 w-[90%] mx-auto mt-8"
                  onClick={() => handleBeVolunteer(postCard._id)}
                >
                  <ActionButton buttonText="Be A Volunteer" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default PostDetails;
