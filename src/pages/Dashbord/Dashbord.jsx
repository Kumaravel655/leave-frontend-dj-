import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Action from '../../components/Common/Actionbar/ActionBar';
import LeaveCalendar from '../../components/employe/LeaveCalender/Calender';
import ProfileCard from '../../components/employe/Profile/Profile';
import { FaTachometerAlt, FaUsers, FaMoneyBillWave, FaCalendarAlt, FaQuestionCircle } from 'react-icons/fa'; 
import { API_URL } from '../../Apiservice/Apiserverce';
import { toast } from 'react-toastify';

export const Dashbord = () => {
  const [leaves, setLeaves] = useState([]);
  const [usedLeaves, setUsedLeaves] = useState(0);
  const [pendingLeaves, setPendingLeaves] = useState(0);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await axios.get(`${API_URL}/leavelists/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setLeaves(response.data.leave);
      } catch (err) {
        toast.error('Could not fetch leave applications');
      }
    };

    fetchLeaves();
  }, [token]);

  useEffect(() => {
    const used = leaves.filter(leave => leave.status === 'Approved').length;
    const pending = leaves.filter(leave => leave.status === 'Pending').length;
    setUsedLeaves(used);
    setPendingLeaves(pending);
  }, [leaves]);

  const navItems = [
    { label: 'Dashboard', icon: FaTachometerAlt, link: '/dashbord' },
    { label: 'Leave Apply', icon: FaCalendarAlt, link: '/lists' },
  ];

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="lg:w-1/5 w-full text-white">
        <Action navItems={navItems} />
      </div>

      <div className="flex flex-col lg:flex-row ml-[-34px] lg:w-4/5 w-full p-4">
        <div className="lg:w-2/3 w-full lg:mr-4 bg-blue-100 rounded-lg shadow-md p-6 mb-4 lg:mb-0">
          <h2 className="text-xl md:text-2xl font-semibold text-center text-blue-500 mt-6">
            Report Your Leave
          </h2>
          <div className="mt-[100px] sm:mt-4 sm:ml-4 lg:ml-[180px]">
            <LeaveCalendar />
          </div>
        </div>

        <div className="lg:w-1/3 w-full ml-9 mt-4 lg:mt-0">
          <ProfileCard />
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Leave Summary</h3>
            <p className="text-gray-600">Used Leaves: {usedLeaves}</p>
            <p className="text-gray-600">Pending Leaves: {pendingLeaves}</p>
          </div>
        </div>
      </div>
    </div>
  );
};