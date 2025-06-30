'use client';
import { redirect } from 'next/navigation';

const HomePage = () => {

  redirect('/sign-in');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <header className="bg-white shadow-lg p-6 rounded-b-lg">
        <h1 className="text-4xl font-extrabold text-gray-800">Welcome to My Website</h1>
        <nav>
          <ul className="flex justify-center space-x-8 mt-4">
            <li><a href="#home" className="text-blue-600 hover:text-blue-800 transition duration-300">Home</a></li>
            <li><a href="#about" className="text-blue-600 hover:text-blue-800 transition duration-300">About</a></li>
            <li><a href="#contact" className="text-blue-600 hover:text-blue-800 transition duration-300">Contact</a></li>
          </ul>
        </nav>
      </header>
      <main className="flex-grow p-10">
        <h2 className="text-3xl font-semibold text-gray-700">Hello, User!</h2>
        <p className="mt-6 text-lg text-gray-600">This is a simple and intuitive homepage designed to be user-friendly and visually appealing.</p>
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">Get Started</button>
        </div>
      </main>
      <footer className="bg-white shadow-inner p-6 border-t border-gray-200 text-center rounded-t-lg">
        <p className="text-gray-500">&copy; 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;