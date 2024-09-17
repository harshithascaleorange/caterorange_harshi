import React, { useContext, useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import DateComponent from './DateComponents';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { add_address, corporate_category } from '../services/contextapi_state_management/action/action';
import { StoreContext } from '../services/contextapi_state_management/store';
import MapAddressSelector from "./Maps";
import { MapPin } from 'lucide-react'; 

const Body = ({ isSidenavOpen }) => {
  const { state, dispatch } = useContext(StoreContext);
  const [flipped, setFlipped] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [address, setAddress] = useState('abcd, 500081');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        console.log('Fetching data...');
        const data = await corporate_category(dispatch);
        console.log('Fetched data:', data);
        setFoodData(data);
        setFlipped(Array(data.length).fill(false));
        setQuantities(Array(data.length).fill(0));
        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch food data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleFlip = (index) => {
    const newFlipped = [...flipped];
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);
  };

  const incrementQuantity = (index) => {
    const newQuantities = [...quantities];
    newQuantities[index] = newQuantities[index] + 1;
    setQuantities(newQuantities);
  };

  const decrementQuantity = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] = newQuantities[index] - 1;
      setQuantities(newQuantities);
    }
  };

  const handleChangeAddress = (newAddress) => {
    if (newAddress && newAddress.display_name) {
      add_address(newAddress.display_name,dispatch)
      setAddress(newAddress.display_name);
       // or however you want to use the address
    }
    setShowMap(false);
  };


  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">{error}</div>;
  }

  return (
    
    <div>
    {!showMap ? (
     <div>
      <div className="bg-white shadow-lg shadow-slate-400 mt-5 rounded-lg p-4 mb-6 flex items-center">
     <MapPin className="mr-2 text-gray-500" size={20} />
     <div>
       <p className="text-sm font-semibold">{address}</p>
       
     </div>
     <button 
       className="ml-auto text-blue-500 bg-slate-300 w-24 h-10 text-sm" 
       onClick={() => setShowMap(true)} // Show map when button is clicked
     >
       Change
     </button>
   </div>
    <div className={`relative ${isSidenavOpen ? 'blur-sm' : ''} z-10`}>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-8">
        {foodData.map((food, index) => (
          <ReactCardFlip key={index} isFlipped={flipped[index]} flipDirection="horizontal">
            {/* Front Side */}
            <div
              className="relative w-full h-96 max-h-96 p-4 rounded-lg shadow-xl shadow-slate-400 flex flex-col justify-between"
              style={{ zIndex: 1 }}
            >
              <h2 className="text-xl font-bold">{food.category_name}</h2>
              <button
                onClick={() => handleFlip(index)}
                className="absolute top-4 right-4 text-blue-500 text-lg rounded-full focus:outline-none"
              >
                <FontAwesomeIcon icon={faSyncAlt} size="sm" />
              </button>
              <div className="w-full h-72 flex space-x-3">
                <div className="rounded-lg shadow-slate-300 bg-blue-50 shadow-xl overflow-auto w-1/2 flex justify-center items-center">
                  <img src={food.category_media} className="rounded-full" alt="Food" />
                </div>
                <div className="w-1/2">
                  <h1>{food.category_description}</h1>
                  <p className="mt-4">
                    Price Per Plate: <span className="text-green-500">{food.category_price}/-</span>
                  </p>
                  <p className='mt-2 flex items-center'>
                    Quantity:
                    <button
                      className="text-red-500 text-2xl ml-3"
                      onClick={() => incrementQuantity(index)}
                    >
                      +
                    </button>
                    <span className="mx-4 text-lg bg-red-200 ring-offset-red-500 h-7 w-7 text-center">{quantities[index]}</span> 
                    <button
                      className="text-red-500 text-3xl ml-2"
                      onClick={() => decrementQuantity(index)}
                    >
                      -
                    </button>
                  </p>
                </div>
              </div>
            </div>
            {/* Back Side */}
            <div
              className="relative w-full h-96 max-h-96 p-4 rounded-lg shadow-xl shadow-slate-400 overflow-auto"
              style={{ zIndex: 2, position: 'relative' }}
            >
              <button
                onClick={() => handleFlip(index)}
                className="absolute top-4 right-4 text-blue-500 text-lg rounded-full focus:outline-none"
              >
                <FontAwesomeIcon icon={faSyncAlt} size="sm" />
              </button>
              <div className="mt-4">
                <DateComponent foodtype={food} quantity={quantities[index]}/>
              </div>
            </div>
          </ReactCardFlip>
        ))}
      </div>
    </div>
    </div>):(<MapAddressSelector onAddressSelect={handleChangeAddress} />
       )}
       </div>
  );
};

export default Body;