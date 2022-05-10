import React,{ useState } from 'react'
import'./groupes.css'
import data from '../../group-list.json'
import { Table } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'

const Groupes = () => {

    const [groupes, setGroupes] = useState(data);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const columns = [
        {
            key: '1',
            title: 'Nom_du_groupe',
            dataIndex: 'Nom_du_groupe',
        },
        {
            key: '2',
            title: 'Nombre_Apprenants',
            dataIndex: 'Nombre_Apprenants',
            sorter : (record1, record2)=>{
                return record1.Nombre_Apprenants - record2.Nombre_Apprenants
            }
        },
        {
            key: '3',
            title: 'Niveau',
            dataIndex: 'Niveau',
            filters : [
                {text: '1er annnee', value: 1},
                {text: '2eme annnee', value: 2},
                {text: '3eme annnee', value: 3},
                {text: '4eme annnee', value: 4},
            ],
            onFilter : (value, record) => 
            record.Niveau.includes(value)
        },
        {
            key: '4',
            title: 'Nombre_de_séances',
            dataIndex: 'Nombre_de_séances',
            sorter : (record1, record2)=>{
                return record1.Nombre_de_séances - record2.Nombre_de_séances
            }
        },
        {
            key: '5',
            title: 'Prochaine_séances',
            dataIndex: 'Prochaine_séances',
        },
        {
            key: '6',
            title: 'Heure',
            dataIndex: 'Heure',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => {
                return<div className='action'>
                <button className='btn btn-edit'><AiOutlineEdit/></button>
                <button className='btn btn-delete'><AiOutlineDelete/></button>
                </div>
            },
        }
    ]

    const handleFrom = () => {

    }

  return (
    <div className='groupes-container'>
        <h1>Groupes</h1>
        <div className='groupes-content'>
        <Table columns={columns} dataSource={groupes} pagination={
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
        <div className="groupes-footer">
            <form onSubmit={handleFrom}>
                <input type="text" placeholder="Nom du groupe" />
                <input type="text" placeholder="Niveau" />
                <button type="submit" className='btn add-btn'>Ajouter</button>
            </form>
        </div>
    </div>
  )
}

export default Groupes