// import React, { useEffect, useState } from 'react';
// import { ShoppingCart, ChevronLeft } from 'lucide-react'; // Import the ChevronLeft icon
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const MyCart = () => {
//   const [Total, setTotal] = useState(0);
//   // const [sortedCartItems, setSortedCartItems] = useState([]);
//   const navigate = useNavigate();
//   const [CartData, setCartData] = useState([]);
//   const [userData, setUserData] = useState(null);

//   const [isLoading, setIsLoading] = useState(true);

//   // const userData = {
//   //   name: 'Harshitha',
//   //   email: 'harshi@gmail.com',
//   //   phoneNumber: '6281936556',
//   //   address: 'knjgtrcgbuhunkndyegcv jgyftdrdgvh bgfrdeseseses',
//   // };


//   useEffect(() => {
//     const fetchCart = async () => {
//       setIsLoading(true);
//       try {
//         const response = await axios.get('http://localhost:7000/customer/getCorporateCarts',{
          
//             headers: { token: `${localStorage.getItem('accessToken')}` }
        
//         });
//         console.log('Fetched cart data:', response);
//         // Check the response structure
//         setCartData(response.data || []);
//          // Fallback to empty array if carts is undefined
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchCart();
//   }, []);

//   useEffect(() =>{
//     const fetchCustomer = async () => {
    
//       try {
//         const response = await axios.get('http://localhost:7000/customer/getCustomerDetails',{
          
//             headers: { token: `${localStorage.getItem('accessToken')}` }
        
//         });
//         console.log('Fetched customer data:', response);
//         // Check the response structure
//         setUserData(response.data);
//          // Fallback to empty array if carts is undefined
//       } catch (error) {
//         console.error('Error fetching customer data:', error);
//       } 
//     };
//     fetchCustomer();
//   }, []);
  
//   // useEffect(() => {
//   //   const totalAmount = sortedCartItems.reduce(
//   //     (sum, cart) => sum + cart.price * cart.quantity,
//   //     0
//   //   );
//   //   setTotal(totalAmount);
//   // }, [sortedCartItems]);
//   useEffect(() => {
//     const totalAmount = CartData.reduce(
//       (sum, cart) => sum + cart.category_price * cart.quantity,
//       0
//     );
//     setTotal(totalAmount);
//   }, [CartData]);

//   // const handleIncrement = (index) => {
//   //   setSortedCartItems((prevItems) =>
//   //     prevItems.map((item, i) =>
//   //       i === index ? { ...item, quantity: item.quantity + 1 } : item
//   //     )
//   //   );
//   // };

//   // const handleDecrement = (index) => {
//   //   setSortedCartItems((prevItems) =>
//   //     prevItems.map((item, i) =>
//   //       i === index ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
//   //     )
//   //   );
//   // };

//   // const handleRemove = (index) => {
//   //   setSortedCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
//   // };

//   const handleIncrement = (index) => {
//     setCartData((prevItems) =>
//       prevItems.map((item, i) =>
//         i === index ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleDecrement = (index) => {
//     setCartData((prevItems) =>
//       prevItems.map((item, i) =>
//         i === index ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
//       )
//     );
//   };

//   const handleRemove = (index) => {
//     setCartData((prevItems) => prevItems.filter((_, i) => i !== index));
//   };
//   const handleViewHome = () => {
//     navigate('/home');
//   };
//   if (isLoading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

 

//   return (
//     <div className="min-h-screen flex flex-col">
//       <div className="flex justify-between items-center p-4 bg-white shadow-md">
//         {/* Left Arrow */}
//         <div className="flex items-center">
//           <Link to="/home">
//             <ChevronLeft size={24} className="cursor-pointer" onClick={handleViewHome} />
//           </Link>
//           <h1 className="text-lg text-black font-bold ml-2">My Cart</h1>
//         </div>
//         <div className="bg-yellow-500 rounded-full h-9 w-9 flex items-center justify-center">
//           <ShoppingCart size={24} />
//         </div>
//       </div>

//       <div className="px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-4">
//         {/* Your Details */}
//         <div className="bg-gray-100 shadow-lg rounded-lg p-6 mb-6 w-full max-w-2xl">
//           <h2 className="text-xl font-bold mb-4 text-center">Your Details</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div className='flex'>
//               <p className="text-sm font-bold">Name : </p>
//               <p className="text-sm">{userData.Name}</p>
//             </div>
//             <div className='flex'>
//               <p className="text-sm font-bold">Email : </p>
//               <p className="text-sm">{userData.email}</p>
//             </div>
//             <div className='flex'>
//               <p className="text-sm font-bold">Phone Number : </p>
//               <p className="text-sm">{userData.PhoneNumber}</p>
//             </div>
//             <div className='flex'>
//               <p className="text-sm font-bold">Address : </p>
//               <p className="text-sm break-words">{userData.address}</p>
//             </div>
//           </div>
//           <button className="mt-4 text-blue-500 bg-gray-200 px-4 py-2 rounded-md w-24 self-end">
//             Change
//           </button>
//         </div>

//         {/* Cart Items Table */}
//         <table className="table-auto w-full max-w-md sm:max-w-4xl border-separate border-spacing-2 border border-gray-200 mb-6 bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-200 text-gray-700">
//             <tr>
//               <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Item</th>
//               <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Processing Date</th>
//               <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Quantity</th>
//             </tr>
//           </thead>
//           <tbody>
//             {CartData?.map((item, index) => (
//               <tr
//                 key={index}
//                 className={`border border-gray-300 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
//               >
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <div className="flex justify-center sm:justify-start items-center gap-4">
//                     <img
//                       src={item.category_media}
//                       className="rounded-full h-10 w-10 mb-2"
//                       alt={item.type}
//                     />
//                     <span className="text-sm font-medium">{item.category_name}</span>
//                   </div>
//                 </td>
//                 <td className="border border-gray-300 px-4 py-2 text-center text-sm">{item.processing_date}</td>
//                 <td className="border border-gray-300 px-4 py-2 text-center">
//                   <div className="flex justify-center sm:justify-between items-center">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         className="text-red-500 text-lg hover:bg-red-100 p-1 rounded-full"
//                         onClick={() => handleDecrement(index)}
//                       >
//                         -
//                       </button>
//                       <span className="text-sm font-medium">{item.quantity}</span>
//                       <button
//                         className="text-red-500 text-lg hover:bg-red-100 p-1 rounded-full"
//                         onClick={() => handleIncrement(index)}
//                       >
//                         +
//                       </button>
//                     </div>
//                     <button
//                       className="text-red-500 text-xs hover:bg-red-100 p-1 rounded-full"
//                       onClick={() => handleRemove(index)}
//                     >
//                       ✖
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             )) || <tr><td colSpan="3" className="text-center">No items found</td></tr> }
//           </tbody>
//         </table>
//       </div>

//       <footer className="bg-gray-300 text-black p-4 flex justify-between items-center shadow-md mt-auto">
//         <h2 className="text-lg font-bold">Total: {Total}/-</h2>
//         <button className="bg-purple-600 text-white p-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition">
//           Pay Now
//         </button>
//       </footer>
//     </div>
//   );
// };

// export default MyCart;


//   // useEffect(() => {
//   //   const sortedItems = carts
//   //     .flatMap((cart) => cart.dates.map((date) => ({ ...cart, date })))
//   //     .sort((a, b) => new Date(a.date) - new Date(b.date));
//   //   setSortedCartItems(sortedItems);
//   // }, []);
import React, { useEffect, useState } from 'react';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyCart = () => {
  const [Total, setTotal] = useState(0);
  const [CartData, setCartData] = useState([]);
  const [userData, setUserData] = useState({
    Name: '',
    email: '',
    PhoneNumber: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:7000/customer/getCorporateCarts', {
          headers: { token: `${localStorage.getItem('accessToken')}` },
        });
        setCartData(response.data || []);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get('http://localhost:7000/customer/getCustomerDetails', {
          headers: { token: `${localStorage.getItem('accessToken')}` },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };
    fetchCustomer();
  }, []);

  useEffect(() => {
    const totalAmount = CartData.reduce(
      (sum, cart) => sum + cart.category_price * cart.quantity,
      0
    );
    setTotal(totalAmount);
  }, [CartData]);

  const handleIncrement = (index) => {
    setCartData((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (index) => {
    setCartData((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(item.quantity - 1, 0) } : item
      )
    );
  };

  const handleRemove = (index) => {
    setCartData((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleViewHome = () => {
    navigate('/home');
  };

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put('http://localhost:7000/customer/updateCustomerDetails', userData, {
        headers: { token: `${localStorage.getItem('accessToken')}` },
      });
      setIsModalOpen(false);
      // Refresh the page to show updated details
      window.location.reload();
    } catch (error) {
      console.error('Error updating customer data:', error);
    }
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Header */}
      <header className="bg-white shadow-md p-4 fixed top-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <div className="flex items-center">
            <Link to="/home">
              <ChevronLeft size={24} className="cursor-pointer" onClick={handleViewHome} />
            </Link>
            <h1 className="text-lg text-black font-bold ml-2">My Cart</h1>
          </div>
          <div className="bg-yellow-500 rounded-full h-9 w-9 flex items-center justify-center">
            <ShoppingCart size={24} />
          </div>
        </div>
      </header>

      {/* Scrollable Content */}
      <main className="flex-grow overflow-y-auto mt-16 mb-20 p-4">
        <div className="max-w-6xl mx-auto">
          {/* User Details Card */}
          <div className="bg-gray-100 shadow-lg rounded-lg p-4 mb-6">
            <h2 className="text-xl font-bold mb-4">Your Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <p className="text-sm font-bold">Name:</p>
                <p className="text-sm">{userData.Name}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold">Email:</p>
                <p className="text-sm">{userData.email}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold">Phone Number:</p>
                <p className="text-sm">{userData.PhoneNumber}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm font-bold">Address:</p>
                <p className="text-sm">{userData.address}</p>
              </div>
            </div>
            <button
              onClick={handleModalToggle}
              className="mt-4 text-blue-500 bg-gray-200 px-4 py-2 rounded-md w-full sm:w-auto"
            >
              Change
            </button>
          </div>

          {/* Cart Items */}
          {CartData.length === 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-xl font-bold mb-4">Your cart is empty</h2>
              <p>No items are added to cart. Please add some items to continue.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
  <table className="w-full border-collapse border border-gray-200 bg-white shadow-md rounded-lg">
    <thead className="bg-gray-200 text-gray-700">
      <tr>
        <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Item</th>
        <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Processing Date</th>
        <th className="border border-gray-300 px-4 py-2 text-sm font-medium">Quantity</th>
      </tr>
    </thead>
    <tbody>
      {CartData.map((item, index) => (
        <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
          <td className="border px-4 py-2 flex items-center gap-3">
            <img src={item.category_media} alt='food' className='rounded-full h-8 w-8 object-cover' />
            <span className="text-sm">{item.category_name}</span>
          </td>
          <td className="border px-4 py-2 text-sm">{item.processing_date}</td>
          <td className="border px-4 py-2">
            <div className="flex items-center justify-center gap-2">
              <button
                className="bg-gray-200 px-2 py-1 rounded-l-lg text-sm"
                onClick={() => handleDecrement(index)}
              >
                -
              </button>
              <span className="px-4 text-sm">{item.quantity}</span>
              <button
                className="bg-gray-200 px-2 py-1 rounded-r-lg text-sm"
                onClick={() => handleIncrement(index)}
              >
                +
              </button>
              <button
                className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                onClick={() => handleRemove(index)}
              >
                Remove
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

          )}
        </div>
      </main>

      {/* Fixed Footer */}
      <footer className="bg-gray-300 text-black p-4 fixed bottom-0 left-0 right-0 z-10">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h2 className="text-lg font-bold bg-yellow-400 p-2 rounded-md shadow-md">
            Total: {Total}/-
          </h2>
          <button className="bg-purple-600 text-white p-2 px-4 rounded-lg shadow-md hover:bg-purple-700 transition">
            Pay Now
          </button>
        </div>
      </footer>

      {/* Modal Dialog for Editing User Details */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md m-4">
            <h2 className="text-xl font-bold mb-4">Edit Your Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name:</label>
                <input
                  type="text"
                  name="Name"
                  value={userData.Name}
                  onChange={handleInputChange}
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone Number:</label>
                <input
                  type="text"
                  name="PhoneNumber"
                  value={userData.PhoneNumber}
                  onChange={handleInputChange}
                  className="border rounded w-full px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  className="border rounded w-full px-3 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
              >
                Save Changes
              </button>
              <button
                onClick={handleModalToggle}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;

