import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";

const BookingForm = () => {
  const { id } = useParams();
  const [price, setPrice] = useState();
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [numberOfTravelers, setNumberOfTravelers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [totalPrice, setTotalPrice] = useState(price);
  const [errors, setErrors] = useState({});

  // Fetch the package details
  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/packages/${id}`);
        setPrice(response.data.price);
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };
    fetchPackageDetails();
  }, [id]);

  useEffect(() => {
    if (price) {
      setTotalPrice(price * numberOfTravelers);
    }
  }, [numberOfTravelers, price]);

  // Validate the form fields
  const validateForm = () => {
    const newErrors = {};

    if (!customerName.trim()) newErrors.customerName = "Name is required.";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Valid email is required.";
    if (!phoneNumber.trim() || !/^\d{10}$/.test(phoneNumber)) newErrors.phoneNumber = "Valid phone number is required (10 digits).";
    if (!numberOfTravelers || numberOfTravelers < 1) newErrors.numberOfTravelers = "At least one traveler is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  // Generate PDF Invoice
  const generateInvoice = (bookingData) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Travel Agency Invoice", 20, 20);

    doc.setFontSize(12);
    doc.text(`Customer Name: ${bookingData.customerName}`, 20, 50);
    doc.text(`Email: ${bookingData.email}`, 20, 60);
    doc.text(`Phone Number: ${bookingData.phoneNumber}`, 20, 70);
    doc.text(`Number of Travelers: ${bookingData.numberOfTravelers}`, 20, 80);
    doc.text(`Special Requests: ${bookingData.specialRequests || "None"}`, 20, 90);
    doc.text(`Total Price: $${bookingData.totalPrice}`, 20, 100);

    doc.save(`Invoice_${bookingData.customerName}.pdf`);
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const booking = {
      packageId: id,
      customerName,
      email,
      phoneNumber,
      numberOfTravelers,
      specialRequests,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/bookings`, booking);
      alert("Booking successful!");

      // Generate Invoice PDF
      generateInvoice({
        id: response.data._id, 
        customerName,
        email,
        phoneNumber,
        numberOfTravelers,
        specialRequests,
        totalPrice,
      });
    } catch (error) {
      if (error.response) {
        console.error("Booking failed:", error.response.data.message);
      } else {
        console.error("Error submitting booking:", error.message);
      }
    }
  };

  return (
    <>
    <div className="py-8 bg-black w-full"></div>
    <div className="max-w-4xl mx-auto p-6 text-black">
      <h2 className="text-2xl font-bold mb-4">Booking Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
          {errors.customerName && <p className="text-red-500 text-sm">{errors.customerName}</p>}
        </div>
        <div>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <Input
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
        </div>
        <div>
          <Input
            type="number"
            placeholder="Enter the number of travelers"
            value={numberOfTravelers}
            onChange={(e) => setNumberOfTravelers(e.target.value)}
            min="1"
          />
          {errors.numberOfTravelers && <p className="text-red-500 text-sm">{errors.numberOfTravelers}</p>}
        </div>
        <Textarea
          placeholder="Enter any special requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p>Total Price: ${totalPrice}</p>
          <Button type="submit" variant="primary">
            Submit Booking
          </Button>
        </div>
      </form>
    </div>
    </>
  );
};

export default BookingForm;
