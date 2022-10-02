import React,{ useEffect, useState } from 'react'
import'./groupes.css'
import { Table, Popconfirm, Form  } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import SideBar from '../Sidebar/SideBar'
import TopBar from '../Topbar/TopBar'

const Groupes = () => {

    const [groupes, setGroupes] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [groupName, setGroup] = useState("");
    const [numberOfLearners, setNbrLearner] = useState("");
    const [groupLevel, setLevel] = useState("");
    const [groupSessionNumber, setNbrSession] = useState("");
    const [nextSessionDate, setNextSession] = useState("");
    const [hour, setHour] = useState("");
    const [editRow, setEditRow] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            key: '1',
            title: 'Name of the group',
            dataIndex: 'groupName',
        },
        {
            key: '2',
            title: 'Number Learners',
            dataIndex: 'numberOfLearners',
            sorter : (record1, record2)=>{
                return record1.numberOfLearners - record2.numberOfLearners
            }
        },
        {
            key: '3',
            title: 'Level',
            dataIndex: 'groupLevel',
            filters : [
                {text: '1er annnee', value: 1},
                {text: '2eme annnee', value: 2},
                {text: '3eme annnee', value: 3},
                {text: '4eme annnee', value: 4},
            ],
            onFilter : (value, record) => 
            record.groupLevel.includes(value)
        },
        {
            key: '4',
            title: 'Number of sessions',
            dataIndex: 'groupSessionNumber',
            sorter : (record1, record2)=>{
                return record1.groupSessionNumber - record2.groupSessionNumber
            }
        },
        {
            key: '5',
            title: 'Next session',
            dataIndex: 'nextSessionDate',
        },
        {
            key: '6',
            title: 'Hour',
            dataIndex: 'hour',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) =>
                    groupes.length >= 1 ? (
                    <div className='actionAddDelete'>
                    <button className='btn btn-edit' onClick={() => handleEdit(record)}><AiOutlineEdit/></button>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <button className='btn btn-delete'><AiOutlineDelete/></button>
                    </Popconfirm>
                    </div>
          ) : null,
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = editId;
        const newGroupe = { id, groupName, numberOfLearners, groupLevel, groupSessionNumber, nextSessionDate, hour };
        const addNewGroupe = { groupName, numberOfLearners, groupLevel, groupSessionNumber, nextSessionDate, hour };

        if(editRow === false){
           await axios.post('https://localhost:7100/api/Group/', addNewGroupe) 
            .then(res => {
                setGroupes([...groupes, res.data]);
                form.resetFields();
            })
            .catch(err => console.log(err))
        }else{
            await axios.put(`https://localhost:7100/api/Group/`, newGroupe)
            .catch(err => console.log(err))
        }
        setGroup("");
        setNbrLearner("");
        setLevel("");
        setNbrSession("");
        setNextSession("");
        setHour("");
      }


      
      const handleDelete = (key) => {
        axios.delete(`https://localhost:7100/api/Group/${key}/`)
        .then(res => {
            const newGroupes = groupes.filter(group => group.id !== key);
            setGroupes(newGroupes);
        })
        .catch(err => console.log(err))
      };

      const handleEdit = (record) => {
        const editGroupe = { ...record };
        setEditRow(true);
        setGroup(editGroupe.groupName);
        setNbrLearner(editGroupe.numberOfLearners);
        setLevel(editGroupe.groupLevel);
        setNbrSession(editGroupe.groupSessionNumber);
        setNextSession(editGroupe.nextSessionDate);
        setHour(editGroupe.hour);
        setEditId(record.id);
      };

      useEffect(() => {
        axios.get('https://localhost:7100/api/Group/')
        .then(res => {
            setGroupes(res.data);
        })
        .catch(err => console.log(err))
        }, [])


  return (
      <>
      <TopBar/>
      <div className='main-side'>
        <SideBar group="home"/>
        <div className="main-groupe">
        <div className='groupes-container'>
        <h1>Groupes</h1>
        <div className='groupes-content'>
        <Form form={form} component={false}>
        <Table 
        rowKey={record => record.id} 
        columns={columns} 
        bordered 
        dataSource={groupes} 
        rowClassName="editable-row"
        pagination={
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
        </Form>
        </div>
        <div className="groupes-footer">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Group name..." onChange={(e) => setGroup(e.target.value)} value={groupName} required/>
                <input type="number" placeholder="Number Learners..." onChange={(e) => setNbrLearner(e.target.value)} value={numberOfLearners} required/>
                <input type="number" placeholder="Level..." onChange={(e) => setLevel(e.target.value)} value={groupLevel} required/>
                <input type="number" placeholder="Number of sessions..." onChange={(e) => setNbrSession(e.target.value)} value={groupSessionNumber} required/>
                <input type="date" placeholder="Next session..." onChange={(e) => setNextSession(e.target.value)} value={nextSessionDate} required/>
                <input type="text" placeholder="Hour..." onChange={(e) => setHour(e.target.value)} value={hour} required/>
                {
                    editRow ? <button className='btn btn-add'>Edit</button> : <button className='btn btn-add'>Add</button>
                }
            </form>
        </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Groupes