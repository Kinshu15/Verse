import './App.css'
import Pages from "./Components/Pages/Pages"
import { BrowserRouter } from 'react-router-dom';
import AppContext from './Components/AppContext/AppContext';
function App() {
  return (
    <h1 className="App">
      <BrowserRouter>
      <AppContext>
        <Pages />
      </AppContext>
      </BrowserRouter>
    </h1>
  );
}

export default App

// import React, { useEffect } from 'react';
// import {supaBase} from "./Components/supaBase/supaBase" // adjust path if needed

// const SupabaseTest = () => {
//   useEffect(() => {
//     const testConnection = async () => {
//       const { data, error } = await supaBase.from('test').select('*'); // use any existing table name
//       if (error) {
//         console.error("❌ Supabase not working:", error.message);
//       } else {
//         console.log("✅ Supabase connected! Data:", data);
//       }
//     };
//     testConnection();
//   }, []);

//   return <div>Check console for Supabase connection status</div>;
// };

// export default SupabaseTest;