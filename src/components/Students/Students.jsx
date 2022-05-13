import React, { useEffect, useState } from 'react'
import './students.css'
import { Table, Tag,Popconfirm } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import TopBar from '../Topbar/TopBar'
import SideBar from '../Sidebar/SideBar'

const Students = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);    
    const [name, setFullName] = useState("");
    const [level, setLevel] = useState("");
    const [entryDate, setDate_in] = useState("");
    const [numberOfSessions, setNumber_of_sessions] = useState("");
    const [phoneNumber, setTel_number] = useState("");
    const [group, setGroup] = useState([]);
    const [payment, setPayment] = useState("");
    const [editRow, setEditRow] = useState(false);
    const [editId, setEditId] = useState('');
    const [groupName, setGroupName] = useState("");



    const columns = [
        {
            key: '1',
            title: 'FullName',
            dataIndex: 'name',
        },
        {
            key: '2',
            title: 'Level',
            dataIndex: 'level',
        },
        {
            key: '3',
            title: 'Number of sessions',
            dataIndex: 'numberOfSessions',
            sorter : (record1, record2)=>{
                return record1.numberOfSessions - record2.numberOfSessions
            }
        },
        {
            key: '4',
            title: 'Date in',
            dataIndex: 'entryDate',
        },
        {
            key: '5',
            title: 'Tel number',
            dataIndex: 'phoneNumber',
        },
        {
            key: '6',
            title: 'Payment',
            dataIndex: 'payment',
            filters : [
                {text: 'true', value: true},
                {text: 'false', value: false},
            ],
            onFilter : (value, record) => 
            record.payment.includes(value),
            render: Payment => (
                  Payment === "true" ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>
            ),
        },
        {
            key: '7',
            title: 'Group',
            dataIndex: 'groupName',
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
        const id = editId;
        const newStudent = { id, name, level, entryDate, numberOfSessions, phoneNumber, payment, groupName };
        console.log(newStudent);
        console.log(editRow);
        if(editRow === false){
            axios.post('https://localhost:7100/api/Etudiant/', newStudent)
            .then(res => {
                setStudents([...students, res.data]);
            })
            .catch(err => console.log(err));
        }else{
            axios.put(`https://localhost:7100/api/Etudiant/`, newStudent)
            .then(res => {
                setStudents(students.map(
                    student => student.id === editId ? res.data : student
                    ));
                    setEditRow(false)
            })
            .catch(err => console.log(err));
        }
        setFullName("");
        setLevel("");
        setDate_in("");
        setNumber_of_sessions("");
        setTel_number("");
        setPayment("");
        setGroupName("");
        setGroup([]);
    }

        const handleEdit = (record) =>{
            const editStudent = {...record}
            setEditRow(true);
            setFullName(editStudent.name);
            setLevel(editStudent.level);
            setDate_in(editStudent.entryDate);
            setNumber_of_sessions(editStudent.numberOfSessions);
            setTel_number(editStudent.phoneNumber);
            setPayment(editStudent.payment)
            setGroupName(editStudent.groupName);
            setEditId(record.id)
        }
      
      const handleDelete = (key) => {
        axios.delete(`https://localhost:7100/api/Etudiant/${key}/`)
        const data = [...students];
        const index = data.findIndex(item => key === item.id);
        data.splice(index, 1);
        setStudents(data);
      };

      useEffect(() => {
        axios.get('https://localhost:7100/api/Etudiant/')
        .then(res => {
            setStudents(res.data);
        })
        .catch(err => console.log(err))
        }, [])


        
  useEffect(() => {
    axios.get('https://localhost:7100/api/Group/')
    .then(res => {
        setGroup(res.data);
    })
    .catch(err => console.log(err))
    }, [students])

  return (
    <>
    <TopBar />
    <div className='main-side'>
      <SideBar student="students"/>
    <div className="main-students">
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
                <input type="text" placeholder="Student name..." value={name} onChange={(e)=> setFullName(e.target.value)}/>
                <input type="number" placeholder="Level..." value={level} onChange={(e)=> setLevel(e.target.value)}/>
                <input type="number" placeholder="Number of sessions..."  value={numberOfSessions} onChange={(e)=> setNumber_of_sessions(e.target.value)}/>
                <input type="date" placeholder="Date in..."  value={entryDate} onChange={(e)=> setDate_in(e.target.value)}/>
                <input type="tel" placeholder="Tel_number..." value={phoneNumber} onChange={(e)=> setTel_number(e.target.value)} />
                {/* <input type="text" placeholder="Payment..."  value={payment} onChange={(e)=> setPayment(e.target.value)}/> */}
                <select value={payment} onChange={(e)=> setPayment(e.target.value)}>
                    <option value="nothing">Payment Yes/No ?</option>
                    <option key="1" value="true">Yes</option>
                    <option key="2" value="false">No</option>
                </select>
                <select value={ groupName } onChange={(e) => setGroupName(e.target.value)} required>
                  <option value="nothing">Select your group</option>
                    {group.map(group => (
                        <option key={group.id} value={group.groupName}>{group.groupName}</option>
                    ))}
                </select>                {
                    editRow ? <button type="submit" className='btn add-btn'>Edit</button>: <button type="submit" className='btn add-btn'>Add</button>
                }
            </form>
        </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Students