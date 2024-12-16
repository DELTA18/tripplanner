import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
const PackageDetails = () => {
  const { id } = useParams();  // Get the package ID from the URL
  const [packageDetails, setPackageDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPackageDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package details:", error);
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!packageDetails) {
    return <div className="text-center">Package not found.</div>;
  }

  const {
    title,
    description,
    coverImage,
    price,
    availableDates,
    additionalImages,
  } = packageDetails;

  return (
    <div className="container mx-auto ">
      {/* Hero Section with Cover Image */}
      <div className="w-full h-[80vh] relative mb-8">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover rounded-lg shadow-lg"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div> {/* Optional overlay for visual effect */}
      </div>

      {/* Title and Description */}
      <div className="space-y-4 mb-8">
        <h2 className="text-4xl font-bold text-center">{title}</h2>
        <p className="text-lg text-gray-600 text-center">{description}</p>
      </div>
      <div className="text-center mt-8">
        <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300">
          Book Now
        </button>
      </div>
      {/* Price and Available Dates */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-xl font-semibold text-blue-600">
          Price: ${price}
        </div>
        <div className="text-md font-semibold">
          <span className="text-gray-700">Available Dates: </span>
          {availableDates.join(", ")}
        </div>
      </div>

      {
        additionalImages.length > 0 && (
            <>
            <label className="block text-gray-700 font-semibold mb-2">Additional Images:</label>
            <div className="w-full max-w-2xl max-h-24 mx-auto my-6" >
      <Carousel
        plugins={[
          Autoplay({ delay: 3000 })  // Auto-scroll every 3 seconds
        ]}
      >
        <CarouselContent className="-ml-4 md:-ml-6">
          {packageDetails.additionalImages.map((img, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <img src={img} alt={`Additional Image ${index + 1}`} className="w-full h-auto object-fill rounded-md" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      </div>
            </>
            
        )
      }
      
      

      {/* Booking Button */}
      
    </div>
  );
};

export default PackageDetails;
