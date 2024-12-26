"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone_number, setPhone_number] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://192.168.1.50:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone_number }),
      });

      if (!response.ok) throw new Error("Error submitting form");
      const result = await response.json();
      console.log(result);

      toast.success("Signup successful!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

      setName('');
      setEmail('');
      setPhone_number('');
      router.push('/dashboard');
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit form", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div className="m-10">
      <ToastContainer />
      <div className="flex justify-center mb-6">
        <button onClick={() => setIsLogin(true)} className={`mr-2 px-4 py-2 rounded-lg ${isLogin ? "bg-blue-700 text-white" : "bg-gray-300"}`}>
          Login
        </button>
        <button onClick={() => setIsLogin(false)} className={`px-4 py-2 rounded-lg ${!isLogin ? "bg-blue-700 text-white" : "bg-gray-300"}`}>
          Signup
        </button>
      </div>

      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <h1 className="font-bold text-3xl text-gray-900 mb-6">{isLogin ? "Login Form" : "Signup Form"}</h1>

        {!isLogin && (
          <>
            <div className="mb-5">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                Name
              </label>
              <input type="text" id="name" value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Enter your name" />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input type="email" id="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="email@gmail.com" />
            </div>
          </>
        )}
        <div className="mb-5">
          <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">
            Phone Number
          </label>
          <input type="tel" id="phone_number" value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Enter phone number" required />
        </div>

        <button type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          {isLogin ? "Login" : "Signup"}
        </button>
        {error && <div className="text-red-600 mb-4">{error}</div>}

      </form>
    </div>
  );
}

// const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   // Check for missing fields
//   if (!phone_number || (isLogin && !phone_number) || (!isLogin && (!name || !phone_number || !email))) {
//     setError("All fields are required.");
//     return;
//   }

//   try {
//     const endpoint = isLogin ? "http://localhost:3000/webhook/login" : "http://localhost:3000/webhook";
//     const payload = isLogin
//       ? { phone_number }
//       : { name, phone_number, email };

//     const response = await fetch(endpoint, {
//       method: "POST",
//       body: JSON.stringify(payload),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Request failed");
//     }
//     const data = await response.json();
//     console.log("message from data : ", data.message);

//     if (isLogin) {
//       // Handle login case
//       if (data.phone_number_exists) {
//         toast.success(`Login successful!`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setTimeout(() => {
//           router.push('/dashboard');
//         }, 2000);
//       } else {
//         toast.error("Phone number is not registered!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           draggable: true,
//           progress: undefined,
//         });
//       }
//     } else {
//       // Handle signup case
//       if (data.isValid) {
//         const emailPart = data.message.split(": ")[1] || "Unknown email";
//         toast.warning(`Phone number is already registered with email: ${emailPart}`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           draggable: true,
//           progress: undefined,
//         });
//       } else {
//         toast.success("Signup successful!", {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           draggable: true,
//           progress: undefined,
//         });
//         setTimeout(() => {
//           router.push('/dashboard');
//         }, 2000);
//       }
//     }

//     setError(null);
//     console.log("Response data:", data);
//   } catch (error: any) {
//     console.error("Error:", error);
//     setError("An error occurred. Please try again.");
//   }
// };

// return (
//   <div className="m-10">
//     <ToastContainer />
//     <div className="flex justify-center mb-6">
//       <button onClick={() => setIsLogin(true)} className={`mr-2 px-4 py-2 rounded-lg ${isLogin ? "bg-blue-700 text-white" : "bg-gray-300"}`}>
//         Login
//       </button>
//       <button onClick={() => setIsLogin(false)} className={`px-4 py-2 rounded-lg ${!isLogin ? "bg-blue-700 text-white" : "bg-gray-300"}`}>
//         Signup
//       </button>
//     </div>

//     <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
//       <h1 className="font-bold text-3xl text-gray-900 mb-6">{isLogin ? "Login Form" : "Signup Form"}</h1>

//       {!isLogin && (
//         <>
//           <div className="mb-5">
//             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
//               Name
//             </label>
//             <input type="text" id="name" value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               placeholder="Enter your name" />
//           </div>
//           <div className="mb-5">
//             <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
//               Email
//             </label>
//             <input type="email" id="email" value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               placeholder="email@gmail.com" />
//           </div>
//         </>
//       )}
//       <div className="mb-5">
//         <label htmlFor="phone_number" className="block mb-2 text-sm font-medium text-gray-900">
//           Phone Number
//         </label>
//         <input type="tel" id="phone_number" value={phone_number}
//           onChange={(e) => setPhone_number(e.target.value)}
//           className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//           placeholder="Enter phone number" required />
//       </div>

//       <button type="submit"
//         className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
//         {isLogin ? "Login" : "Signup"}
//       </button>
//       {error && <div className="text-red-600 mb-4">{error}</div>}

//     </form>
//   </div>
// );

