import { useState } from 'react'; // Mengimpor useState dari React untuk mengelola state lokal
import axios from 'axios'; // Mengimpor axios untuk melakukan permintaan HTTP
import { useRouter } from 'next/router'; // Mengimpor useRouter dari Next.js untuk navigasi halaman

const Login = () => {
  const [email, setEmail] = useState(''); // State untuk menyimpan nilai email dari form
  const [password, setPassword] = useState(''); // State untuk menyimpan nilai password dari form
  const [message, setMessage] = useState(''); // State untuk menyimpan pesan yang akan ditampilkan kepada pengguna
  const [messageColor, setMessageColor] = useState(''); // State untuk menyimpan warna pesan
  const router = useRouter(); // Menggunakan hook useRouter dari Next.js untuk mendapatkan objek router

  const handleSubmit = async (e) => {
    e.preventDefault(); // Menghentikan default submit form

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }); // Mengirim permintaan login ke server

      if (response.status === 200) { // Jika permintaan berhasil
        const { role } = response.data; // Mendapatkan peran pengguna dari data respons

        // Menyimpan token dan peran dalam local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', role);

        // Menampilkan pesan berdasarkan peran pengguna dan melakukan redirect sesuai peran
        if (role === 'superadmin' || role === 'staff') {
          setMessage('Login successful. You are an Admin.');
          router.push('/admin');
        } else if (role === 'user') {
          setMessage('Login successful. You are a User.');
          router.push('/admin');
        }

        setMessageColor('text-green-500'); // Mengatur warna pesan menjadi hijau
      } else {
        setMessage('Login failed'); // Menampilkan pesan gagal login jika respons status bukan 200
        setMessageColor('text-red-500'); // Mengatur warna pesan menjadi merah
      }
    } catch (error) { // Menangani kesalahan dari permintaan
      setMessage('Login failed: ' + (error.response?.data?.message || error.message)); // Menampilkan pesan kesalahan
      setMessageColor('text-red-500'); // Mengatur warna pesan menjadi merah
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-blue-500">Email</label>
            <input
              type="email"
              className="mt-1 p-2 w-full border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-blue-500">Password</label>
            <input
              type="password"
              className="mt-1 p-2 w-full border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>
        </form>
        {message && <p className={`mt-4 text-center ${messageColor}`}>{message}</p>}
      </div>
    </div>
  );
};

export default Login;
