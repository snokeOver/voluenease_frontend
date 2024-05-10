const PrimaryButton = ({ textField }) => {
  return (
    <button className="btn  py-2  md:py-3 md:px-7 rounded-sm text-prime border-prime bg-transparent hover:bg-prime hover:text-gray-100 dark:hover:border-prime">
      {textField}
    </button>
  );
};

export default PrimaryButton;
