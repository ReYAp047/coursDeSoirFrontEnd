import React, { useState } from 'react'
import './cours.css'
import data from '../../students-list.json'
import { Table, Popconfirm } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'

const Cours = () => {
  const [cours, setCours] = useState([
    {
      "id":1,
      "nom_du_cours": "Anglais",
      "level": "1",
      "fichier": "C/aze/aze/aze.pdf",
    },
    {
      "id":2,
      "nom_du_cours": "Anglais",
      "level": "3",
      "fichier": "C/aze/aze/aze.pdf",
    },
    {
      "id":3,
      "nom_du_cours": "Anglais",
      "level": "4",
      "fichier": "C/aze/aze/aze.pdf",
    },
    {
      "id":4,
      "nom_du_cours": "Anglais",
      "level": "2",
      "fichier": "C/aze/aze/aze.pdf",
    }
  ]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const columns = [
      {
          key: '1',
          title: 'Cours name',
          dataIndex: 'nom_du_cours',
      },
      {
          key: '2',
          title: 'Level',
          dataIndex: 'level',
          filters : [
            {text: '1er annnee', value: 1},
            {text: '2eme annnee', value: 2},
            {text: '3eme annnee', value: 3},
            {text: '4eme annnee', value: 4},
        ],
        onFilter : (value, record) => record.level.includes(value)
      },
      {
          key: '3',
          title: 'Files',
          dataIndex: 'fichier',
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


  const handleSubmit = (e) => {
    e.preventDefault();

  }
  
  const handleEdit = (record) =>{
    
  }



  const handleDelete = (key) => {
    const dataSource = [...cours];
    setCours(dataSource.filter(item => item.id !== key));
  };



  return (
    <div className='cours-container'>
       <h1>Cours</h1>
     <div className='cours-content'>
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
    </div>
      <div className="cours-footer">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Course name..." />
            <input type="number" placeholder="Level..." />
            <input type="file"/>
            <button type="submit" className='btn add-btn'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default Cours