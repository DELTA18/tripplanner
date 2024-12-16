const PackageCard = ({ packageData }) => {
    const { title, description, _id, avaliableDates, additionalImages, coverImage, price } = packageData;
    console.log(_id)
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all transform hover:scale-105 duration-300 ease-in-out "
      onClick={() => window.location.href = `/package/${_id}`}>
        <img
          src={coverImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-blue-600 font-bold text-lg">${price}</span>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={() => window.location.href = `/package/${_id}`}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default PackageCard;
  