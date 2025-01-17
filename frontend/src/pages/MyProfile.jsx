import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets_frontend/assets';
import { toast } from 'react-toastify';
import axios from 'axios';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const dataToSend = {
        name: userData.name || '',
        phone: userData.phone || '',
        address: userData.address ? JSON.stringify(userData.address) : '{}',
        gender: userData.gender || 'male',
        dob: userData.dob || '',
        image: image ? image : undefined,
      };

      const { data } = await axios.post(backendUrl + '/api/user/update-profile', dataToSend, {
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
      });

      if (data.success) {
        toast.success(data.message);
        const updatedUserData = data.user || userData; 
        setUserData(updatedUserData); 

        await loadUserProfileData();
        
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message || "Error updating profile");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "An error occurred while updating profile.");
    }
  };

  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {/* Profile image section */}
      {
        isEdit
          ? <label htmlFor="image">
              <div className='inline-block relative cursor-pointer'>
                <img className='w-36 rounded opacity-75' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                <img className='w-10 absolute bottom-12 right-12' src={image ? '' : assets.upload_icon} alt="" />
              </div>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
          : <img className='w-36 rounded' src={userData.image} alt="" />
      }

      {/* User name */}
      {
        isEdit
          ? <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userData.name || ''} onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }

      <hr className='bg-zinc-400 h-[1px] border-none' />

      {/* Contact Information Section */}
      <div>
        <p className='text-neutral-500 underline mt-3'>CONTACT INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userData.email}</p>

          <p className='font-medium'>Phone:</p>
          {
            isEdit
              ? <input className='bg-gray-100 max-w-52' type="text" value={userData.phone || ''} onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
              : <p className='text-blue-500'>{userData.phone}</p>
          }

          <p className='font-medium'>Address:</p>
          <div>
            {
              isEdit
                ?
                <p>
                  <input className='bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address?.line1 || ''} type="text" />
                  <br />
                  <input className='bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address?.line2 || ''} type="text" />
                </p>
                :
                <p className='text-gray-400'>
                  {userData.address?.line1}
                  <br />
                  {userData.address?.line2}
                </p>
            }
          </div>
        </div>
      </div>

      {/* Basic Information Section */}
      <div>
        <p className='text-neutral-500 underline mt-3'>BASIC INFORMATION</p>

        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Gender:</p>
          {
            isEdit
              ?
              <select className='max-w-20 bg-gray-100' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender || ''}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              :
              <p className='text-gray-400'>{userData.gender}</p>
          }

          <p className='font-medium'>Birthday:</p>
          {
            isEdit
              ? <input className='max-w-28 bg-gray-100' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob || ''} />
              : <p className='text-gray-400'>{userData.dob}</p>
          }
        </div>
      </div>

      {/* Save or Edit Button */}
      <div className='mt-10'>
        {
          isEdit
            ? <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={() => updateUserProfileData()}>Save Information</button>
            : <button className='border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all duration-300' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  );
};

export default MyProfile;
