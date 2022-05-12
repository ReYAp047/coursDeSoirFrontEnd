import React, { useState } from 'react'
import './students.css'
import data from '../../students-list.json'
import { Table, Tag,Popconfirm } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'

const Students = () => {
    const [students, setStudents] = useState(data);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);    
    const [FullName, setFullName] = useState("");
    const [level, setLevel] = useState("");
    const [date_in, setDate_in] = useState("");
    const [number_of_sessions, setNumber_of_sessions] = useState("");
    const [Tel_number, setTel_number] = useState("");
    const [group, setGroup] = useState("");
    const [Payment, setPayment] = useState("");
    const [editRow, setEditRow] = useState('');
    const [editId, setEditId] = useState('');
    const [isPending, setIsPending] = useState(false)



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
            record.Payment.includes(value),
            render: Payment => (
                  Payment === "true" ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>
            ),
        },
        {
            key: '7',
            title: 'Group',
            dataIndex: 'group',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) =>students.length >= 1 ? (
                <div className='actionAddDelete'>
                <button className='btn btn-edit' onClick={() => handleEdit(record)}><AiOutlineEdit/></button>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                    <button className='btn btn-delete'><AiOutlineDelete/></button>
                </Popconfirm>
                </div>
            ) : null,
        }
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        const newStudent = { FullName, level, date_in, number_of_sessions, Tel_number, Payment, group  };

        if(editRow ===""){
            setStudents([...Students, newStudent]);
            setIsPending(true)
        }else{
            const data = [...students];
            const index = data.findIndex(item => editId === item.id);
            data.splice(index, 1, newStudent);
            setStudents(data)
            setEditRow(false)
        }
        setFullName("");
        setLevel("");
        setDate_in("");
        setNumber_of_sessions("");
        setTel_number("");
        setPayment("");
        setGroup("");
        setIsPending(false);
    }

        const handleEdit = (record) =>{
            const editStudent = {...record}
            setEditRow(true);
            setFullName(editStudent.FullName);
            setLevel(editStudent.level);
            setDate_in(editStudent.date_in);
            setNumber_of_sessions(editStudent.number_of_sessions);
            setTel_number(editStudent.Tel_number);
            setPayment(editStudent.Payment)
            setGroup(editStudent.group)
            setEditId(record.id)
        }
      
      const handleDelete = (key) => {
        const dataSource = [...students];
        setStudents(dataSource.filter(item => item.id !== key));
      };

  return (
    <div className='students-container'>
        <h1>Students</h1>
        <div className='students-content'>
        <Table rowKey={record => record.id} columns={columns} bordered dataSource={students}  pagination={
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
                <input type="text" placeholder="Student name..." value={FullName} onChange={(e)=> setFullName(e.target.value)}/>
                <input type="number" placeholder="Level..." value={level} onChange={(e)=> setLevel(e.target.value)}/>
                <input type="number" placeholder="Number of sessions..."  value={number_of_sessions} onChange={(e)=> setNumber_of_sessions(e.target.value)}/>
                <input type="date" placeholder="Date in..."  value={date_in} onChange={(e)=> setDate_in(e.target.value)}/>
                <input type="tel" placeholder="Tel_number..." value={Tel_number} onChange={(e)=> setTel_number(e.target.value)} />
                <input type="text" placeholder="Payment..."  value={Payment} onChange={(e)=> setPayment(e.target.value)}/>
                <input type="number" placeholder="Group..."  value={group} onChange={(e)=> setGroup(e.target.value)}/>
                {
                    editRow ? <button type="submit" className='btn add-btn'>Edit</button>: <button type="submit" className='btn add-btn'>Add</button>
                }
            </form>
        </div>
    </div>
  )
}

export default Students