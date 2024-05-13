const AwardCard = ({ award }) => {
  const { title, imageUrl, message } = award;
  return (
    <button className="card card-compact w-auto bg-base-100 rounded-xl border hover:!scale-105 duration-500">
      <figure className=" mb-3 ">
        <img
          className="w-full rounded-t-xl h-[15.5rem] xl:h-[18.5rem] "
          src={imageUrl}
          alt={title}
        />
      </figure>

      <div className="card-body">
        <div>
          <h2 className="text-xl font-semibold text-primary mb-3">{title}</h2>
        </div>
        <div className="flex justify-between">
          <h4 className="text-justify font-normal  flex-grow">{message}</h4>
        </div>
      </div>
    </button>
  );
};

export default AwardCard;
