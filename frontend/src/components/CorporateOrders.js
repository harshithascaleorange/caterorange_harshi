

// import { CakeIcon, CalendarIcon, CheckCircleIcon, MinusCircleIcon } from '@heroicons/react/solid';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const CorporateOrders = () => {
//   const [showCorporate, setShowCorporate] = useState(true);
//   const [expandedOrder, setExpandedOrder] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [orderData, setOrderData] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       setError(null);
//       try {
//         const token = localStorage.getItem('accessToken');
//         console.log('Access Token:', token); // Debug: Check if token exists

//         const response = await axios.get('http://localhost:7000/customer/corporate/myorders', {
//           headers: { token: `${token}` },
//         });
//         console.log('Full API Response:', response); // Log the full response
//         console.log('API Response Data:', response.data); // Log just the data

//         if (response.data) {
//           setOrderData(response.data);
//         } else {
//           setError('No data received from the server.');
//           setOrderData(null);
//         }
//       } catch (error) {
//         console.error('Error fetching corporate order data:', error);
//         setError('Failed to fetch orders. Please try again later.');
//         setOrderData(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchOrders();
//   }, []);

//   const toggleOrderDetails = (orderId) => {
//     setExpandedOrder(expandedOrder === orderId ? null : orderId);
//   };

//   const renderProgressIcons = (progress) => {
//     const stages = ['processing', 'shipped', 'delivered'];
//     const activeIndex = stages.indexOf(progress);
    
//     return (
//       <div className="flex justify-between items-center">
//         {stages.map((stage, index) => (
//           <div key={stage} className="flex flex-col items-center">
//             {index <= activeIndex ? (
//               <CheckCircleIcon className="text-green-500 h-4 w-4 sm:h-6 sm:w-6 mb-1 transition-transform transform hover:scale-110" />
//             ) : (
//               <MinusCircleIcon className="text-gray-400 h-4 w-4 sm:h-6 sm:w-6 mb-1 transition-transform transform hover:scale-110" />
//             )}
//             <span className={`text-xs ${index <= activeIndex ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
//               {stage.charAt(0).toUpperCase() + stage.slice(1)}
//             </span>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderOrder = (order) => (
//     <div key={order.id || order.corporateorder_generated_id} className="w-full bg-white rounded-lg border shadow-md hover:shadow-xl transition-shadow duration-300">
//       <div
//         className="flex justify-between items-center p-4 sm:p-6 bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors rounded-t-lg"
//         onClick={() => toggleOrderDetails(order.id || order.corporateorder_generated_id)}
//       >
//         <div className="w-full">
//           <p className="text-lg sm:text-xl font-bold text-blue-700">Order ID: {order.id || order.corporateorder_generated_id}</p>
//           <p className="text-xs sm:text-sm text-gray-600 mt-1">Date: {(order.details && order.details[0]?.date) || order.date || 'N/A'}</p>
//         </div>
//         <div>
//           <span className="text-gray-500 text-xl sm:text-2xl">
//             {expandedOrder === (order.id || order.corporateorder_generated_id) ? '[-]' : '[+]'}
//           </span>
//         </div>
//       </div>

//       {expandedOrder === (order.id || order.corporateorder_generated_id) && (
//         <div className="p-4 sm:p-6 overflow-x-auto">
//           <table className="w-full bg-white min-w-max">
//             <thead className="bg-gray-100 text-left text-xs sm:text-sm">
//               <tr>
//                 <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Category Name</th>
//                 <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Progress</th>
//                 <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Date</th>
//                 <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Qty</th>
//                 <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Active Qty</th>
//                 <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Status</th>
//                 <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Media</th>
//               </tr>
//             </thead>
//             <tbody>
//               {(order.details || [order]).map((detail, i) => (
//                 <tr key={i} className="border-t text-xs sm:text-sm hover:bg-gray-50">
//                   <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.category_type || 'N/A'}</td>
//                   <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{renderProgressIcons(detail.progress)}</td>
//                   <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.date}</td>
//                   <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.quantity}</td>
//                   <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.active_quantity}</td>
//                   <td
//                     className={`p-2 sm:p-3 lg:p-4 font-bold whitespace-nowrap ${
//                       detail.status === 'cancelled' ? 'text-red-500' : 'text-green-500'
//                     }`}
//                   >
//                     {detail.status}
//                   </td>
//                   <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.category_media || 'N/A'}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );

//   return (
//     <>
//       <header className="w-full bg-green-500 h-16 flex items-center pl-4">
//         <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-white">
//           Your Orders
//         </h1>
//       </header>

//       <div className="w-full my-4 sm:my-10 px-4 sm:px-6 lg:px-8 xl:px-0 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-lg">
//         <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-10">
//           <button
//             className={`py-2 px-4 sm:py-3 sm:px-8 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform ${
//               showCorporate ? 'bg-yellow-500 text-white shadow-lg hover:scale-105' : 'bg-gray-300 text-gray-700 hover:scale-105'
//             }`}
//             onClick={() => setShowCorporate(true)}
//           >
//             <CakeIcon className="h-5 w-5 inline-block mr-2" />
//             Corporate
//           </button>
//           <button
//             className={`py-2 px-4 sm:py-3 sm:px-8 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform ${
//               !showCorporate ? 'bg-green-500 text-white shadow-lg hover:scale-105' : 'bg-gray-300 text-gray-700 hover:scale-105'
//             }`}
//             onClick={() => setShowCorporate(false)}
//           >
//             <CalendarIcon className="h-5 w-5 inline-block mr-2" />
//             Events
//           </button>
//         </div>

//         {showCorporate && (
//           <div className="space-y-4 sm:space-y-8 w-full">
//             {isLoading ? (
//               <p>Loading orders...</p>
//             ) : error ? (
//               <p className="text-red-500">{error}</p>
//             ) : orderData ? (
//               Array.isArray(orderData) ? orderData.map(renderOrder) : renderOrder(orderData)
//             ) : (
//               <p>No corporate orders found.</p>
//             )}
//           </div>
//         )}

//         {!showCorporate && (
//           <div className="text-center py-8">
//             <p className="text-lg text-gray-700">Events content will be displayed here.</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CorporateOrders;

import { CakeIcon, CalendarIcon, CheckCircleIcon, HomeIcon, MinusCircleIcon } from '@heroicons/react/solid';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CorporateOrders = () => {
  const [showCorporate, setShowCorporate] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        console.log('Access Token:', token); // Debug: Check if token exists

        const response = await axios.get('http://localhost:7000/customer/corporate/myorders', {
          headers: { token: `${token}` },
        });
        console.log('Full API Response:', response); // Log the full response
        console.log('API Response Data:', response.data); // Log just the data

        if (response.data) {
          setOrderData(response.data);
        } else {
          setError('No data received from the server.');
          setOrderData(null);
        }
      } catch (error) {
        console.error('Error fetching corporate order data:', error);
        setError('Failed to fetch orders. Please try again later.');
        setOrderData(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const handleViewHome = ()=>{
    navigate('/home')
  }

  const renderProgressIcons = (progress) => {
    const stages = ['processing', 'shipped', 'delivered'];
    const activeIndex = stages.indexOf(progress);
    
    return (
      <div className="flex justify-between items-center">
        {stages.map((stage, index) => (
          <div key={stage} className="flex flex-col items-center">
            {index <= activeIndex ? (
              <CheckCircleIcon className="text-green-500 h-4 w-4 sm:h-6 sm:w-6 mb-1 transition-transform transform hover:scale-110" />
            ) : (
              <MinusCircleIcon className="text-gray-400 h-4 w-4 sm:h-6 sm:w-6 mb-1 transition-transform transform hover:scale-110" />
            )}
            <span className={`text-xs ${index <= activeIndex ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}>
              {stage.charAt(0).toUpperCase() + stage.slice(1)}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const renderOrder = (order) => (
    <div key={order.id || order.corporateorder_generated_id} className="w-full bg-white rounded-lg border shadow-md hover:shadow-xl transition-shadow duration-300 mx-3 sm:mx-4">
      <div
        className="flex justify-between items-center p-4 sm:p-6 bg-blue-100 cursor-pointer hover:bg-blue-200 transition-colors rounded-t-lg"
        onClick={() => toggleOrderDetails(order.id || order.corporateorder_generated_id)}
      >
        <div className="w-full">
          <p className="text-lg sm:text-xl font-bold text-blue-700">Order ID: {order.id || order.corporateorder_generated_id}</p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">Date: {(order.details && order.details[0]?.date) || order.date || 'N/A'}</p>
        </div>
        <div>
          <span className="text-gray-500 text-xl sm:text-2xl">
            {expandedOrder === (order.id || order.corporateorder_generated_id) ? '[-]' : '[+]'}
          </span>
        </div>
      </div>

      {expandedOrder === (order.id || order.corporateorder_generated_id) && (
        <div className="p-4 sm:p-6 overflow-x-auto">
          <table className="w-full bg-white min-w-max">
            <thead className="bg-gray-100 text-left text-xs sm:text-sm">
              <tr>
                <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Category Name</th>
                <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Progress</th>
                <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Date</th>
                <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Qty</th>
                <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Active Qty</th>
                <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Status</th>
                <th className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">Media</th>
              </tr>
            </thead>
            <tbody>
              {(order.details || [order]).map((detail, i) => (
                <tr key={i} className="border-t text-xs sm:text-sm hover:bg-gray-50">
                  <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.category_type || 'N/A'}</td>
                  <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{renderProgressIcons(detail.progress)}</td>
                  <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.date}</td>
                  <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.quantity}</td>
                  <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.active_quantity}</td>
                  <td
                    className={`p-2 sm:p-3 lg:p-4 font-bold whitespace-nowrap ${
                      detail.status === 'cancelled' ? 'text-red-500' : 'text-green-500'
                    }`}
                  >
                    {detail.status}
                  </td>
                  <td className="p-2 sm:p-3 lg:p-4 whitespace-nowrap">{detail.category_media || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <>
     <header className="w-full bg-green-500 h-16 flex items-center pl-4">
      <Link to='/home'>
  <HomeIcon className="h-6 w-6 sm:h-8 sm:w-8 text-white mr-2" onClick={handleViewHome}/> 
  </Link>
  <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white">
    Your Orders
  </h1>
</header>

      <div className="w-full my-4 sm:my-10 px-4 sm:px-6 lg:px-8 xl:px-0 bg-gradient-to-r from-blue-50 to-white shadow-xl rounded-lg">
        <div className="flex justify-center gap-4 sm:gap-6 mb-6 sm:mb-10">
          <button
            className={`py-2 px-4 sm:py-3 sm:px-8 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform ${
              showCorporate ? 'bg-yellow-500 text-white shadow-lg hover:scale-105' : 'bg-gray-300 text-gray-700 hover:scale-105'
            }`}
            onClick={() => setShowCorporate(true)}
          >
            <CakeIcon className="h-5 w-5 inline-block mr-2" />
            Corporate
          </button>
          <button
            className={`py-2 px-4 sm:py-3 sm:px-8 rounded-full font-semibold text-sm sm:text-lg transition-all duration-300 transform ${
              !showCorporate ? 'bg-green-500 text-white shadow-lg hover:scale-105' : 'bg-gray-300 text-gray-700 hover:scale-105'
            }`}
            onClick={() => setShowCorporate(false)}
          >
            <CalendarIcon className="h-5 w-5 inline-block mr-2" />
            Events
          </button>
        </div>

        {showCorporate && (
          <div className="space-y-4 sm:space-y-8 w-full">
            {isLoading ? (
              <p>Loading orders...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : orderData ? (
              Array.isArray(orderData) ? orderData.map(renderOrder) : renderOrder(orderData)
            ) : (
              <p>No corporate orders found.</p>
            )}
          </div>
        )}

        {!showCorporate && (
          <div className="text-center py-8">
            <p className="text-lg text-gray-700">Events content will be displayed here.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CorporateOrders;
