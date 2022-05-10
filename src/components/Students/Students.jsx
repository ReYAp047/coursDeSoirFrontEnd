import React, { useState } from 'react'
import './students.css'
import data from '../../students-list.json'
import { Table } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'

const Students = () => {
    const [students, setStudents] = useState(data);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const columns = [
        {
            key: '1',
            title: 'FullName',
            dataIndex: 'FullName',
        },
        {
            key: '2',
            title: 'Level',
            dataIndex: 'level',
        },
        {
            key: '3',
            title: 'Number of sessions',
            dataIndex: 'number_of_sessions',
            sorter : (record1, record2)=>{
                return record1.Nombre_de_séances - record2.Nombre_de_séances
            }
        },
        {
            key: '4',
            title: 'Date in',
            dataIndex: 'date_in',
        },
        {
            key: '5',
            title: 'Tel number',
            dataIndex: 'Tel_number',
        },
        {
            key: '6',
            title: 'Payment',
            dataIndex: 'Payment',
            filters : [
                {text: 'true', value: true},
                {text: 'false', value: false},
            ],
            onFilter : (value, record) => 
            record.Payment.includes(value)
        },
        {
            key: '7',
            title: 'Group',
            dataIndex: 'group',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return(
                <div className='action'>
                <button className='btn btn-edit'><AiOutlineEdit/></button>
                <button className='btn btn-delete'><AiOutlineDelete/></button>
                </div>
            )},
        }
    ]


    const handleSubmit = (e) => {
        e.preventDefault();

      }

  return (
    <div className='students-container'>
        <h1>Students</h1>
        <div className='students-content'>
        <Table columns={columns} dataSource={students} pagination={
            {
                pageSize: pageSize,
                current: page,
                onChange(page, pageSize) {
                setPage(page);
                setPageSize(pageSize);
                }
            }
        }>
            
        </Table>
        </div>
        <div className="students-footer">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Student name..." />
                <input type="text" placeholder="Level..." />
                <input type="text" placeholder="Number of sessions..." />
                <input type="text" placeholder="Date in..." />
                <input type="text" placeholder="Tel number..." />
                <input type="text" placeholder="Group..." />
                <button type="submit" className='btn add-btn'>Add</button>
            </form>
        </div>
    </div>
  )
}

export default Students