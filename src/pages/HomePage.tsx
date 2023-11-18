// const HomePage = () => {
//   return (
//     <div>This is home page</div>
//   )
// }

// export default HomePage

// import { useState, useEffect } from "react";

// // A simple spinner component
// const Spinner = () => {
//   return <div className="spinner">Loading...</div>;
// };

// const HomePage = () => {
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       // Set loading to false after a delay of 20 seconds
//       setLoading(false);
//     }, 20000);

//     // Clear the timeout when the component unmounts
//     return () => clearTimeout(timeoutId);
//   }, []);

//   if (loading) {
//     // Loading state - Display the spinner component
//     return <Spinner />;
//   }

//   // Render the component with the fetched data
//   return <div>This is the home page. Display your content here.</div>;
// };

// export default HomePage;

import { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";

// A simple spinner component
const Spinner = () => {
  return <BarLoader color="#00BFFF" height={4} width={150} loading />;
};

const HomePage = () => {
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // Set loading to false after a delay of 20 seconds
      setLoading(false);
    }, 20000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  if (loading) {
    // Loading state - Display the spinner component
    return <Spinner />;
  }

  // Render the component with the fetched data
  return <div>This is the home page. Display your content here.</div>;
};

export default HomePage;
