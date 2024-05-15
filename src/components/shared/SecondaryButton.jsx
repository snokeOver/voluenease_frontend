const SecondaryButton = ({ textField }) => {
  return (
    <button className="btn btn-outline  text-gray-100  py-3 rounded-[4px] hover:bg-primary hover:text-gray-100 hover:border-primary">
      {textField}
    </button>
  );
};

export default SecondaryButton;
