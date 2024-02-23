import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Nav = ({ onLogout }) => {
  const [name, setName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUser = localStorage.getItem('loggedInUser');
        if (loggedInUser) {
          const response = await axios.get(`http://localhost:5000/users?Email=${loggedInUser}`);
          const userData = response.data[0];
          if (userData && userData.Name) {
            setName(userData.Name);
            setIsLoggedIn(true); // ตั้งค่าสถานะเข้าสู่ระบบเป็น true
          }
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    onLogout();
    localStorage.removeItem('loggedInUser');
    setIsLoggedIn(false); // ตั้งค่าสถานะเข้าสู่ระบบเป็น false เมื่อออกจากระบบ
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
      handleLogout(); // ถ้าไม่มีข้อมูลการเข้าสู่ระบบใน Local Storage ให้ออกจากระบบ
    } else {
      setIsLoggedIn(true); // ตั้งค่าสถานะเข้าสู่ระบบเป็น true เมื่อมีข้อมูลการเข้าสู่ระบบใน Local Storage
    }
  }, []);

  return (
    <nav className="bg-gray-700 px-4 py-2 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <h3 className="text-xl text-white font-bold">GO-Miniproject</h3>
        <ul className="flex space-x-4">
          <li>
            <Link to="/Listcompo" className="text-white hover:text-green-500">หน้าหลัก</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/users" className="text-white hover:text-green-500">ตารางผู้ใช้</Link>
              </li>
              <li>
                <Link to="/teachers" className="text-white hover:text-green-500">ตารางครู</Link>
              </li>
              <li>
                <Link to="/students" className="text-white hover:text-green-500">ตารางนักเรียน</Link>
              </li>
              <li>
                <Link to="/subjects" className="text-white hover:text-green-500">ตารางวิชา</Link>
              </li>
              <li className="flex items-center space-x-2">
                <div className="bg-gray-500 px-2 py-1 rounded">
                  <span className="text-white">สวัสดี: {name}</span>
                </div>
                <button onClick={handleLogout} className="text-white hover:text-green-500 bg-transparent border border-white px-2 rounded">ออกจากระบบ</button>
              </li>
            </>
          ) : (
              <>
                <li>
                  <Link to="/signin" className="text-white hover:text-green-500">เข้าสู่ระบบ</Link>
                </li>
                <li>
                  <Link to="/register" className="text-white hover:text-green-500">ลงทะเบียน</Link>
                </li>
              </>
            )}
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
