const SecondaryButton = ({ textField }) => {
  return (
    <button className="btn btn-outline  text-gray-100  py-3 rounded-[4px] hover:bg-prime hover:text-gray-100 hover:border-prime">
      {textField}
    </button>
  );
};

export default SecondaryButton;
