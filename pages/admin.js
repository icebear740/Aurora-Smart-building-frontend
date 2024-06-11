import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Admin = () => {
  const [role, setRole] = useState(''); // State untuk menyimpan peran pengguna

  const router = useRouter(); // Menggunakan hook useRouter dari Next.js untuk mendapatkan objek router

  useEffect(() => {
    // Menggunakan useEffect untuk melakukan efek samping saat komponen dimuat

    // Mengambil peran pengguna dari penyimpanan lokal (localStorage) atau panggilan API
    const userRole = localStorage.getItem('role');

    if (!userRole) {
      // Jika tidak ada peran pengguna yang tersimpan, redirect pengguna ke halaman login
      router.push('/login');
    } else {
      // Jika peran pengguna ditemukan, set state peran pengguna dengan nilai yang ditemukan
      setRole(userRole);
    }
  }, [router]); // Menggunakan router sebagai dependensi untuk useEffect


  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-center">
              <div className="block">
                <div className="flex space-x-4">
                  <a href="/admin" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                    Home
                  </a>
                  {role === 'superadmin' && (
                    <>
                      <a href="/finance" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        Finance
                      </a>
                      <a href="/about" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        About
                      </a>
                      <a href="/staff" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        Staff
                      </a>
                      <a href="/pengaduan" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        Pengaduan
                      </a>
                    </>
                  )}
                  {role === 'staff' && (
                    <>
                      <a href="/staff" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        Staff
                      </a>
                      <a href="/about" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        About
                      </a>
                    </>
                  )}
                  {role === 'user' && (
                    <>
                      <a href="/about" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        About
                      </a>
                      <a href="/pengaduan" className="text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:text-blue-500">
                        Pengaduan
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-96 w-screen flex items-center justify-center">
      <div class="font-extrabold text-3xl md:text-4xl [text-wrap:balance] bg-clip-text text-transparent bg-gradient-to-r from-purple-200/60 to-50% to-slate-200">Aurora-Building Management System for <span class="text-customWhite inline-flex flex-col h-[calc(theme(fontSize.3xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] overflow-hidden">
    <ul class="block animate-text-slide-5 text-left leading-tight [&_li]:block">
        <li>Finance</li>
        <li>Complaint</li>
        <li>Building</li>
        <li>AI</li>
        <li>eCommerce</li>
        <li aria-hidden="true">Finance</li>
    </ul>
</span></div>
      </div>
      
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md -mt-20">
  <h1 className="text-3xl font-bold mb-6 text-center text-blue-500">
    {role === 'superadmin' && 'Superadmin Dashboard'}
    {role === 'staff' && 'Staff Dashboard'}
    {role === 'user' && 'User Dashboard'}
  </h1>
  <p className="text-center">
    {role === 'superadmin' && 'Welcome to the Superadmin Dashboard.'}
    {role === 'staff' && 'Welcome to the Staff Dashboard.'}
    {role === 'user' && 'Welcome to the User Dashboard.'}
  </p>
</div>
</div>

  );
};



export default Admin;

