import React, { useState, useEffect } from 'react'
import './cours.css'
import { Table, Popconfirm, Form } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import { Group } from 'antd/lib/avatar'

const Cours = () => {
  const [cours, setCours] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [courseName, setCoursName] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [editRow, setEditRow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form] = Form.useForm();



  const columns = [
      {
          key: '1',
          title: 'Cours name',
          dataIndex: 'courseName',
      },
      {
          key: '2',
          title: 'Level',
          dataIndex: 'courseLevel',
          filters : [
            {text: '1er annnee', value: 1},
            {text: '2eme annnee', value: 2},
            {text: '3eme annnee', value: 3},
            {text: '4eme annnee', value: 4},
        ],
        onFilter : (value, record) => record.courseLevel.includes(value)
      },
      {
          key: '3',
          title: 'Files',
          dataIndex: 'fileUrl',
      },
      {
          title: 'Action',
          key: 'action',
          render: (_, record) =>cours.length >= 1 ? (
            <div className='actionAddDelete'>
            <button className='btn btn-edit' onClick={() => handleEdit(record)}><AiOutlineEdit/></button>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                <button className='btn btn-delete'><AiOutlineDelete/></button>
            </Popconfirm>
            </div>
            ) : null,
      }
  ]

  useEffect(() => {
    axios.get('http://localhost:7100/Cour')
    .then(res => {
        setCours(res.data);
    })
    .catch(err => console.log(err))
    }, [])




  const handleSubmit = (e) => {
    e.preventDefault();
    const newCours = { courseName, courseLevel, fileUrl };
    if(editRow === false){
      axios.post('http://localhost:7100/Cour', newCours)
    .then(res => {
        setCours([...cours, res.data]);
        form.resetFields();
    })
    .catch(err => console.log(err))
  }else{
    axios.put(`http://localhost:7100/Cour/${editId}`, newCours)
    .then(res => {
        const newCours = res.data;
        const newCoursList = cours.map(cours => cours.id === newCours.id ? newCours : cours);
        setCours(newCoursList);
        setEditRow(false);
        form.resetFields();
    })
    .catch(err => console.log(err))
  }
  setCoursName('');
  setCourseLevel('');
  setFileUrl('');
}
  
  const handleEdit = (record) =>{
    const editCours = { ...record };
    setEditRow(true);
    setCoursName(editCours.courseName);
    setCourseLevel(editCours.courseLevel);
    setEditId(record.id);
  }



  const handleDelete = (key) => {
    axios.delete(`http://localhost:7100/Cour/${key}`)
    .then(res => {
        setCours(cours.filter(cour => cour.id !== key))
    })
    .catch(err => console.log(err))
  };



  return (
    <div className='cours-container'>
       <h1>Cours</h1>
     <div className='cours-content'>
    <Form  form={form} component={false}>
    <Table rowKey={record => record.id} columns={columns} bordered dataSource={cours} pagination={
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
      <div className="cours-footer">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Course name..." value={courseName} onChange={(e) => setCoursName(e.target.value) } required/>
            <input type="number" placeholder="Level..."  value={courseLevel} onChange={(e) => setCourseLevel(e.target.value) }  required/>
            <input type="file"  value={fileUrl} onChange={(e) => setFileUrl(e.target.value) } required/>
            {
                editRow === false ? <button className='btn btn-add' type="submit">Add</button> : <button className='btn btn-add' type="submit">Edit</button>
            }
        </form>
      </div>
    </div>
  )
}

export default Cours