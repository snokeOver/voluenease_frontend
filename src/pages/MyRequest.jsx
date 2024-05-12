import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../hooks/useAuth";
import useSAxios from "../hooks/useSAxios";
import useData from "../hooks/useData";
import PageSkeleton from "../components/shared/PageSkeleton";
import MyRequestCard from "../components/myRequests/MyRequestCard";
import { Link } from "react-router-dom";
import PrimaryButton from "../components/shared/PrimaryButton";
import Swal from "sweetalert2";

const MyRequest = () => {
  const { user } = useAuth();
  const sAxios = useSAxios();
  const { setPageLoading, pageLoading, currTheme } = useData();
  const [loadedRequests, setLoadedRequests] = useState([]);

  // Get the Posts that this organizer added
  const getAllVolunteerRequests = async () => {
    try {
      setPageLoading(true);
      const { data } = await sAxios.get(`/api/volunteer-requests/${user.uid}`);
      setLoadedRequests(data);
      setPageLoading(false);
    } catch (err) {
      console.log(err.response);
      setPageLoading(false);
    }
  };

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
          const response = await sAxios.delete(`/api/delete-request/${id}`);
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

  return (
    <>
      <Helmet>
        <title>My Requests | VolunEase</title>
      </Helmet>
      <div className="py-10 md:container md:mx-auto rounded-lg bg-base-200">
        {pageLoading ? (
          <PageSkeleton />
        ) : (
          <div className="flex gap-4 flex-col">
            <div className="text-center">
              <h1 className="text-4xl font-bold">
                {loadedRequests.length > 0
                  ? ""
                  : "You didn't make any request yet !"}
              </h1>
            </div>

            <div className=" flex  items-center w-[90%] mx-auto gap-x-3 ">
              <h2 className="text-lg  font-medium ">
                My Request to be Volunteer
              </h2>

              <span className="px-3 py-1 text-xs text-prime bg-blue-100 rounded-full ">
                {loadedRequests.length}
                <span className="ml-1"> Request (s)</span>
              </span>
            </div>
            {loadedRequests.length > 0 && (
              <>
                {/* Table section */}
                <div className="max-w-[22rem] xs:max-w-[23rem] md:max-w-5xl  mx-auto">
                  <div className="card w-full  shadow-2xl bg-base-100">
                    {/* Table for cart */}
                    <div className="overflow-x-auto py-7 ">
                      <table className="table">
                        {/* head */}
                        <thead>
                          <tr className="text-center">
                            <th></th>
                            <th>Title</th>
                            <th>No. of Volunteers</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th colSpan="2">Actions</th>
                          </tr>
                          <tr>
                            <th colSpan="6">
                              <div className="divider -my-3"></div>
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {loadedRequests.map((request, index) => (
                            <MyRequestCard
                              index={index}
                              key={request._id}
                              sPost={request}
                              handleDeleteRequest={handleDeleteRequest}
                            />
                          ))}
                          <tr>
                            <th colSpan="6">
                              <div className="divider -my-3"></div>
                            </th>
                          </tr>

                          <tr>
                            <th className="text-center text-lg" colSpan="6">
                              <span className="mr-3">To make request</span>
                              <span className="inline-block">
                                <Link to="/need-volunteer">
                                  <PrimaryButton textField="Click Here" />
                                </Link>
                              </span>
                            </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MyRequest;
