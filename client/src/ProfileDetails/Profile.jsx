import React from 'react'
import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
 import 
 { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } 
 from 'recharts';
 import Footer from '../components/Footer';
 import { Link } from 'react-router-dom';
 const userId = localStorage.getItem('userId');
 const name = localStorage.getItem('name');
 const description = localStorage.getItem('desc');
 const userImage = localStorage.getItem('image');

function Profile() {

    const data = [
        {
          name: 'Day 1',
          like: 4000,
          views: 2400,
          amt: 2400,
        },
        {
          name: 'Day 2',
          like: 3000,
          views: 1398,
          amt: 2210,
        },
        {
          name: 'Day 3',
          like: 2000,
          views: 9800,
          amt: 2290,
        },
        {
          name: 'Day 4',
          like: 2780,
          views: 3908,
          amt: 2000,
        },
        {
          name: 'Day 5',
          like: 1890,
          views: 4800,
          amt: 2181,
        },
        {
          name: 'Day 6',
          like: 2390,
          views: 3800,
          amt: 2500,
        },
        {
          name: 'Day 7',
          like: 3490,
          views: 4300,
          amt: 2100,
        },
      ];
     

  return (<div>
    <div>
      <ResponsiveContainer width="100%" height={300}>
        <div className='Profile-info d-flex'>
          <div>
          <img className='profile-image ' src={userImage} alt="upload profile" />
          <h3 className='profile-description d-flex'>Profile of {name} </h3>
          <Link className='profile-description d-flex' to={`/profile/dashboard/update/${userId}`}>Update Profile</Link>

          </div>
          <h3 className='profile-description d-flex'>Description: </h3>
          <p className='profile-description d-flex'> {description}</p>

        </div>

      </ResponsiveContainer>
      <br /><br /><br />
    </div>
    
    <main className='main-container'>
          

        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>POSTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>2</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>VIEWS</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>7</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>FRIENDS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>1</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>MESSAGES</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>0</h1>
            </div>
        </div>

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="like" fill="#8884d8" />
                <Bar dataKey="views" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="like" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="views" stroke="#82ca9d" />
                </LineChart>
            </ResponsiveContainer>

        </div>
    </main>
    <Footer />

    </div>
  )
}

export default Profile