import { useState } from "react";
import { Helmet } from "react-helmet-async";
import ActionButton from "../components/shared/ActionButton";
import useData from "../hooks/useData";
import GoToTopBtn from "../components/shared/GoToTopBtn";

const Contact = () => {
  const { setToastMsg } = useData();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  //   This should handle the change in form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //   This part handle the form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setToastMsg("Submitted  ! We'll contact you soon  !");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <Helmet>
        <title>Contact | VolunEase</title>
      </Helmet>
      <div className="md:container bg-base-100 mx-2 md:mx-auto  overflow-hidden">
        <div
          id="contact_bg"
          className="hero py-2 md:py-10 my-16 bg-base-200 rounded-lg md:w-[90%] mx-auto"
        >
          <div className="hero-content flex-col lg:gap-24 lg:flex-row-reverse">
            <div className="text-center lg:text-left text-gray-800 ">
              <h1 className="text-3xl md:text-5xl font-bold dark:hover:text-prime hover:text-prime">
                Contact now!
              </h1>
              <p className="py-6">
                Tell us what is your querry and we'll contact you soon.
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <form className="card-body" onSubmit={handleSubmit}>
                {/* Name part */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-lg">
                      Your Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 border-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input
                      type="text"
                      name="name"
                      placeholder="name"
                      value={formData.name || ""}
                      className="grow placeholder-gray-400 text-sm "
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>

                {/* email part */}
                <div className="form-control">
                  <span className="label-text text-lg">
                    Email <span className="text-red-500">*</span>
                  </span>
                  <label className="input input-bordered flex items-center gap-2 border-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="email"
                      name="email"
                      placeholder="name@domain.com"
                      value={formData.email || ""}
                      className="grow placeholder-gray-400 text-sm"
                      onChange={handleChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-control">
                  <span className="label-text text-lg">
                    Your Message <span className="text-red-500">*</span>
                  </span>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message || ""}
                    onChange={handleChange}
                    placeholder="Write your message here . . . "
                    className="input input-bordered h-auto placeholder-gray-400 text-sm border-primary"
                    required
                  />
                </div>

                <div className="form-control mt-6">
                  <ActionButton buttonText="Submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <GoToTopBtn />
    </>
  );
};

export default Contact;
