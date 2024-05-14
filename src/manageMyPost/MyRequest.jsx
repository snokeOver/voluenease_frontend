import { Link } from "react-router-dom";
import PrimaryButton from "../components/shared/PrimaryButton";
import MyRequestCard from "./MyRequestCard";

const MyRequest = ({ handleDeleteRequest, loadedRequests }) => {
  return (
    <>
      <div className="flex gap-4 flex-col bg-base-100">
        <div className="text-center py-2">
          {loadedRequests.length < 1 && (
            <>
              <h1 className="text-xl lg:text-4xl font-bold py-10">
                You didn't make any request yet !
              </h1>

              <div className="text-center text-lg" colSpan="6">
                <span className="mr-3">To make request</span>
                <span className="inline-block">
                  <Link to="/need-volunteer">
                    <PrimaryButton textField="Click Here" />
                  </Link>
                </span>
              </div>
            </>
          )}
        </div>
        {/* heading section */}
        <div className=" flex  items-center md:w-[90%] mx-auto gap-x-3 mb-4">
          <h2 className="text-lg  font-medium ">My Request to be Volunteer</h2>

          <span className="px-3 py-1 text-xs text-prime bg-blue-100 rounded-full ">
            {loadedRequests.length}
            <span className="ml-1"> Request (s)</span>
          </span>
        </div>

        {loadedRequests.length > 0 && (
          <>
            {/* Table section */}
            <div className="max-w-[21rem] xs:max-w-[23rem] md:max-w-5xl  mx-auto">
              <div className="card w-full  shadow-2xl bg-base-300">
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
    </>
  );
};

export default MyRequest;
