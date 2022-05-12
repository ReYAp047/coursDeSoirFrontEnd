import React,{ useState } from 'react'
import'./groupes.css'
import data from '../../group-list.json'
import { Table, Input, InputNumber, Popconfirm, Form, Typography  } from 'antd'
import "antd/dist/antd.css"
import { AiOutlineEdit } from 'react-icons/ai'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'

const Groupes = () => {

    const [groupes, setGroupes] = useState(data);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);
    const [Nom_du_groupe, setGroup] = useState("");
    const [Nombre_Apprenants, setNbrLearner] = useState("");
    const [Niveau, setLevel] = useState("");
    const [Nombre_de_séances, setNbrSession] = useState("");
    const [Prochaine_séances, setNextSession] = useState("");
    const [Heure, setHour] = useState("");
    const [isPending, setIsPending] = useState(false);
    const [editRow, setEditRow] = useState(false);
    const [editId, setEditId] = useState(null);
    const [form] = Form.useForm();

    const columns = [
        {
            key: '1',
            title: 'Name of the group',
            dataIndex: 'Nom_du_groupe',
        },
        {
            key: '2',
            title: 'Number Learners',
            dataIndex: 'Nombre_Apprenants',
            sorter : (record1, record2)=>{
                return record1.Nombre_Apprenants - record2.Nombre_Apprenants
            }
        },
        {
            key: '3',
            title: 'Level',
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
            title: 'Number of sessions',
            dataIndex: 'Nombre_de_séances',
            sorter : (record1, record2)=>{
                return record1.Nombre_de_séances - record2.Nombre_de_séances
            }
        },
        {
            key: '5',
            title: 'Next session',
            dataIndex: 'Prochaine_séances',
        },
        {
            key: '6',
            title: 'Hour',
            dataIndex: 'Heure',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) =>
                    groupes.length >= 1 ? (
                    <>
                    <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                        <button className='btn btn-delete'><AiOutlineDelete/></button>
                    </Popconfirm>
                    <button className='btn btn-edit' onClick={() => handleEdit(record)}><AiOutlineEdit/></button>
                    </>
          ) : null,
        }
    ]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newGroupe = { Nom_du_groupe, Nombre_Apprenants, Niveau, Nombre_de_séances, Prochaine_séances, Heure };
        if(editRow === false){
            setGroupes([...groupes, newGroupe]);
            setIsPending(true);
        }
        else{
            const newData = [...groupes];
            const index = newData.findIndex(item => editId === item.id);
            newData.splice(index, 1, newGroupe);
            setGroupes(newData);
            setEditRow(false);
        }
        setGroup("");
        setNbrLearner("");
        setLevel("");
        setNbrSession("");
        setNextSession("");
        setHour("");
        setIsPending(false);
      }



      const handleDelete = (key) => {
        const dataSource = [...groupes];
        setGroupes(dataSource.filter(item => item.id !== key));
      };


      const handleEdit = (record) => {
        const editGroupe = { ...record };
        setEditRow(true);
        setGroup(editGroupe.Nom_du_groupe);
        setNbrLearner(editGroupe.Nombre_Apprenants);
        setLevel(editGroupe.Niveau);
        setNbrSession(editGroupe.Nombre_de_séances);
        setNextSession(editGroupe.Prochaine_séances);
        setHour(editGroupe.Heure);
        setEditId(record.id);
      };


  return (
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
                <input type="text" placeholder="Group name..." onChange={(e) => setGroup(e.target.value)} value={Nom_du_groupe} required/>
                <input type="number" placeholder="Number Learners..." onChange={(e) => setNbrLearner(e.target.value)} value={Nombre_Apprenants} required/>
                <input type="number" placeholder="Level..." onChange={(e) => setLevel(e.target.value)} value={Niveau} required/>
                <input type="number" placeholder="Number of sessions..." onChange={(e) => setNbrSession(e.target.value)} value={Nombre_de_séances} required/>
                <input type="date" placeholder="Next session..." onChange={(e) => setNextSession(e.target.value)} value={Prochaine_séances} required/>
                <input type="number" placeholder="Hour..." onChange={(e) => setHour(e.target.value)} value={Heure} required/>
                {
                    editRow ? <button className='btn btn-add'>Edit</button> : <button className='btn btn-add'>Add</button>
                }
            </form>
        </div>
    </div>
  )
}

export default Groupes