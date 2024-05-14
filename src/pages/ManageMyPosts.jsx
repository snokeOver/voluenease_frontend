import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import useSAxios from "../hooks/useSAxios";
import PageSkeleton from "../components/shared/PageSkeleton";
import GoToTopBtn from "../components/shared/GoToTopBtn";
import ManagePosts from "../manageMyPost/ManagePosts";
import MyRequest from "../manageMyPost/MyRequest";

const ManageMyPosts = () => {
  const { user } = useAuth();
  const sAxios = useSAxios();
  const {
    setPageLoading,
    pageLoading,
    currTheme,
    getPosts,
    getAllVolunteerRequests,
    getPostsOfOrganizer,
    loadedPosts,
    loadedRequests,
  } = useData();

  const [startDate, setStartDate] = useState(new Date());
  const [openModal, setOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    imageUrl: "",
    spot: "",
    country: "",
    location: "",
    description: "",
    cost: "",
    seasonality: "",
    travel_time: "",
    visitors_per_year: "",
  });
  // Request Related

  useEffect(() => {
    if (user) {
      getAllVolunteerRequests();
    }
  }, [user]);

  // Handle the delete request
  const handleDeleteRequest = (id) => {
    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setPageLoading(true);
          const response = await sAxios.delete(`/api/delete-request/${id}`, {
            params: { uid: user?.uid },
          });
          if (response.data) {
            setPageLoading(false);
            getAllVolunteerRequests();
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Canceled!",
              text: "Your Volunteer reqest has been cancelled !",
              icon: "success",
            });
          } else {
            setPageLoading(false);
            console.log(response.data);
          }
        } catch (err) {
          setPageLoading(false);
          console.log(err.response);
        }
      }
    });
  };

  // Post related
  // Format date
  const formatedDate = (deadline) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = deadline.toLocaleDateString("en-GB", options);
    return formattedDate.replace(/ /g, "-");
  };

  useEffect(() => {
    if (user) {
      getPostsOfOrganizer();
    }
  }, [user]);

  // Handle the update post
  const handleDeletePost = (id) => {
    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setPageLoading(true);
          const response = await sAxios.delete(`/api/post/${id}`, {
            params: { uid: user?.uid },
          });
          if (response.data) {
            setPageLoading(false);
            getPostsOfOrganizer();
            getPosts();
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Deleted!",
              text: "Your tourist spot has been Deleted.",
              icon: "success",
            });
          } else {
            setPageLoading(false);
            console.log(response.data);
          }
        } catch (err) {
          setPageLoading(false);
          console.log(err.response);
        }
      }
    });
  };

  // Handle the update spot
  const handleUpdatePost = (singleSpot) => {
    setFormData((prevData) => ({
      ...prevData,
      id: singleSpot._id,
      imageUrl: singleSpot.imageUrl,
      title: singleSpot.title,
      category: singleSpot.category,
      location: singleSpot.location,
      description: singleSpot.description,
      volunNumber: singleSpot.volunNumber,
      deadline: singleSpot.deadline,
      uid: user.uid || "",
      email: user.email || "Private_Email",
      name: user.displayName || "",
    }));
    setOpenModal(true);
  };

  // This should handle all the changes of different fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle the update button from Modal
  const handleUpdateFromModal = (e) => {
    e.preventDefault();
    const { id, ...postData } = formData;
    postData.deadline = formatedDate(startDate);
    postData.email = user.email || "Private_Email";
    postData.volunNumber = parseInt(formData.volunNumber);

    Swal.fire({
      background: currTheme === "dark" ? "#1f2937 " : "",
      target: document.getElementById("form-modal"),
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setPageLoading(true);
        try {
          const response = await sAxios.patch(
            `/api/post/${formData.id}`,
            postData
          );
          if (response.data) {
            getPostsOfOrganizer();
            getPosts();
            setOpenModal(false);
            Swal.fire({
              background: currTheme === "dark" ? "#1f2937 " : "",
              title: "Updated!",
              text: "Your post has been Updated.",
              icon: "success",
            });
          } else {
            console.log(response.data);
            setPageLoading(false);
            setOpenModal(false);
          }
        } catch (err) {
          console.log(err.response);
          setPageLoading(false);
          setOpenModal(false);
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Manage Posts | VolunEase</title>
      </Helmet>
      {pageLoading ? (
        <PageSkeleton />
      ) : (
        <div className=" md:container bg-base-100 mx-2 md:mx-auto">
          <div role="tablist" className="tabs tabs-lifted px-0 py-5 lg:px-5 ">
            {/* My Post section */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="My Posts"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box py-6"
            >
              <ManagePosts
                loadedPosts={loadedPosts}
                handleDeletePost={handleDeletePost}
                handleUpdatePost={handleUpdatePost}
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleUpdateFromModal={handleUpdateFromModal}
                formData={formData}
                handleChange={handleChange}
                startDate={startDate}
                setStartDate={setStartDate}
              />
            </div>
            {/* My Post section */}
            <input
              type="radio"
              name="my_tabs_2"
              role="tab"
              className="tab"
              aria-label="My Requests"
            />
            <div
              role="tabpanel"
              className="tab-content bg-base-100 border-base-300 rounded-box py-6"
            >
              <MyRequest
                handleDeleteRequest={handleDeleteRequest}
                loadedRequests={loadedRequests}
              />
            </div>
          </div>
        </div>
      )}
      <GoToTopBtn />
    </>
  );
};

export default ManageMyPosts;
