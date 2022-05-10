import React, { useState } from 'react'
import './cours.css'
import data from '../../students-list.json'
import { Table } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'

const Cours = () => {
  const [students, setStudents] = useState([
    {
      "nom_du_cours": "Anglais",
      "level": "1",
      "fichier": "C/aze/aze/aze.pdf",
    },
    {
      "nom_du_cours": "Anglais",
      "level": "3",
      "fichier": "C/aze/aze/aze.pdf",
    },
    {
      "nom_du_cours": "Anglais",
      "level": "4",
      "fichier": "C/aze/aze/aze.pdf",
    },
    {
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
      },
      {
          key: '3',
          title: 'Files',
          dataIndex: 'fichier',
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
    <div className='cours-container'>
       <h1>Cours</h1>
     <div className='cours-content'>
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
      <div className="cours-footer">
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Course name..." />
            <input type="text" placeholder="Level..." />
            <input type="file"/>
            <button type="submit" className='btn add-btn'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default Cours