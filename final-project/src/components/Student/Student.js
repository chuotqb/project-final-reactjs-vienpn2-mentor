import React from 'react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Student = () => {

    return (
        <div>
            <h1 className='text-center' text-color='success'>Quản Lý Học Viên Học ReactJS - FDN.SSG - VienPN2</h1>
            <Link className="btn btn-primary mx-2" to="/student/list">List Student</Link>
            <Link className="btn btn-primary mr-2" to="/student/add">Add New Student</Link>
            <Outlet />
        </div>

    )
}

export default Student;