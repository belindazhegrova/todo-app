import {
  DownloadOutlined,
  PlusOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Button, Col, Flex, Input, Layout, Row } from 'antd';
import React, { useState } from 'react';
import Categories from '../components/Categories/Categories';
import CustomButton from '../components/CustomButton/CustomButton';
import CustomModal from '../components/CustomModal/CustomModal';
import CustomTable from '../components/Table/CustomTable';
import { categories } from '../mockData/categories';

const {  Content } = Layout;

const Main = () => {
    const [data,setData] = useState(categories)
    const [selectedCategory,setSelectedCategory] = useState('')
    const [openModal, setOpenModal] = useState(false);
    const [editMode,setEditMode] = useState(false)
    const [modalData,setModalData] = useState({
      title:'',
      status:'',
      category:'',
      asignTo:'',
      notes:'',
    })

    const handleOpenModal = (category) => {
        setSelectedCategory(category)
        setOpenModal(true)
        setModalData({
          title:'',
          status:category ? category.status : '',
          category:'',
          asignTo:'',
          notes:'',
        })
        setEditMode(false)
    
    }
  
    const handleCategoryChange = (data) => {
         setSelectedCategory(data)
    }

    const handleEditMode = (data) => {
      setEditMode(true)
      setOpenModal(true)
      setModalData(data)
    }

    const handleSubmit = () => {
      const newItem = {
        title:modalData.title,
        status:modalData.status,
        category:modalData.category,
        asignTo:modalData.asignTo,
        notes:modalData.notes,
      }
      if (editMode) {
          const updatedItems = selectedCategory.items.map((item) => 
             item.status === modalData.status ? newItem : item
          );
          const updatedData = data.map((cat) =>
            cat.id === selectedCategory.id ? { ...cat, items: updatedItems } : cat
          );
          setData(updatedData);
          
        } else {
          const addedData = data.map((d) =>
            d.id === selectedCategory.id
              ? { ...d, items: [...d.items, newItem] }
            : d
          ); 
          setData(addedData);
          setEditMode(false)
          setModalData({
            title:'',
            category:'',
            asignTo:'',
            notes:''
          })
      }
      setOpenModal(false)
    }


    const handleDelete = (record) => {
    
      console.log('record',record)
      // const filterCategory = category.filter(cat => cat.status !== record.status)
      // const filteredCategory = category.filter((cat) => cat.status !== record.status)
      // const filteredCategory = category.filter((cat) => console.log('cat',cat))

      // const deletedData = data.map((d) => d.id === category.id ? {...d, items:filteredCategory} : d)
      // setData(deletedData);
    }




  return (
    <Content style={{backgroundColor:'#ffffff',margin:'20px',borderRadius:'10px',padding:'40px',minHeight:'80vh'}}>   
       <Categories categories={data} onChange={handleCategoryChange} />
        <Row justify='center' style={{margin:'20px'}}>
          <Col span={12}>  
            <Input size="large" placeholder="Search..." style={{width:'350px'}} prefix={<SearchOutlined style={{fontSize:"18px"}} />} />
          </Col>
          <Col  span={12}>
              <Flex justify='end'gap='small'>
                <Button type="primary" icon={<DownloadOutlined />} style={{width:'32px', height:'32px',backgroundColor:'#1264A3'}} />
                <CustomButton  icon={<PlusOutlined />} backgroundColor='#71CF48' title='Create New' onChange={() => handleOpenModal(selectedCategory)} />
              </Flex>
          </Col>
       </Row>
            <CustomTable selectedCategory={selectedCategory}  data={data}  handleEditMode={handleEditMode}  handleDelete={handleDelete} />
       <CustomModal 
          open={openModal}
          setOpen={setOpenModal}  
          handleSubmit={handleSubmit} 
          selectedCategory={selectedCategory}
          modalData={modalData} 
          setModalData={setModalData}/>
    
    </Content>
    
    
  )
}

export default Main