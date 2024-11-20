import { CheckOutlined, CloseOutlined, InfoCircleTwoTone } from '@ant-design/icons';
import styled from "@emotion/styled";
import {
  Col, Flex,
  Input,
  Modal,
  Row, Select, Typography
} from 'antd';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomButton from '../CustomButton/CustomButton';


const { Title } = Typography;

const StyledDiv = styled.div`
   width: 128px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
   background: ${props => props.color};
   color:white;
   cursor:pointer;

:after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid white;
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
:before {
  content: "";
  position: absolute;
  right: -20px;
  bottom: 0;
  width: 0;
  height: 0;
  border-left: 20px solid  ${(props) => props.color};
  border-top: 20px solid transparent;
  border-bottom: 20px solid transparent;
}
`

const CustomModal = ({open,setOpen,data,selectedCategory,handleSubmit,modalData,setModalData}) => {
console.log('modalData',modalData.status)
  return (
    <Modal
        title={<div style={{height:'45px',backgroundColor:'#F8F8FA',display:'flex',alignItems:'center',paddingLeft:'10px'}}>New Task</div>}
        centered
        open={open}
        onCancel={() => {
          setOpen(false)
          setModalData({title:'',category:'',asignTo:'',notes:''})
        }}
        closable={true}
        width={1000}
        footer={false}
      >
        <div style={{margin:"30px"}}>
            <Flex gap='small' align='center' justify='center'>
              <InfoCircleTwoTone /> <Title style={{fontSize:"14px"}}>Here you're creating a new task, please be careful while filling the information below,make sure to select a satus</Title>
            </Flex>
            <Row  align='center' style={{gap:'15px'}}>
               <StyledDiv  style={{  opacity:modalData.status === 'New' ? 1 : 0.2}} onClick={() => setModalData((prev) => ({...prev,status:'New'}))} color="#EE8A35">New</StyledDiv>
               <StyledDiv style={{  opacity:modalData.status === 'in Progress' ? 1 : 0.2}} onClick={() => setModalData((prev) => ({...prev,status:'in Progress'}))} color="#F6CB52">In Progress</StyledDiv>
               <StyledDiv style={{  opacity:modalData.status === 'on Hold' ? 1 : 0.2}}  onClick={() => setModalData((prev) => ({...prev,status:'on Hold'}))} color="#E9C466">On Hold</StyledDiv>
               <StyledDiv style={{  opacity:modalData.status === 'Canceled' ? 1 : 0.2}} onClick={() => setModalData((prev) => ({...prev,status:'Canceled'}))} color="#E75651">Canceled</StyledDiv>
               <StyledDiv  style={{  opacity:modalData.status === 'Completed' ? 1 : 0.2}}  onClick={() => setModalData((prev) => ({...prev,status:'Completed'}))} color="#7AC14D">Completed</StyledDiv>
            </Row>
            <Row align='center' gutter={16}>
              <Col span={8}>
              
                  <Typography.Title style={{fontSize:'18px'}}>Task Title</Typography.Title>
                  <Input
                    value={modalData.title}
                    onChange={(e) => setModalData((prev) => ({...prev,title:e.target.value}))}
                    placeholder='Write Title'
                  />
            
              </Col>
              <Col span={8}> 
                  <Typography.Title style={{fontSize:'18px'}}>Category</Typography.Title>
                  <Select
                      defaultValue="Select task category"
                      style={{ width: '100%' }}
                      value={modalData.category}
                      onChange={(value) => setModalData((prev) => ({...prev,category:value}))}
                      options={[
                        { value: 'test1', label: 'Test 1' },
                        { value: 'test2', label: 'Test 2' },
                        { value: 'test3', label: 'Test 3' },
                  
                      ]}
                  />
              </Col>
              <Col span={8}>    
                  <Typography.Title style={{fontSize:'18px'}}>Asign To</Typography.Title>
                  <Select
                      defaultValue="Select user"
                      style={{ width: '100%' }}
                      value={modalData.asignTo}
                      onChange={(value) => setModalData((prev) => ({...prev,asignTo:value}))}
                      options={[
                        { value: 'test1', label: 'User 1' },
                        { value: 'test2', label: 'User 2' },
                        { value: 'test3', label: 'User 3' },
                  
                      ]}
                  />
              </Col>
              <Col span={24}>
                <Typography.Title style={{fontSize:'18px'}}>Note</Typography.Title>
                <ReactQuill theme="snow"
                  value={modalData.notes} 
                  onChange={(value) => setModalData((prev) => ({...prev,notes:value}))}/>
              </Col>
            </Row>
            <Flex style={{marginTop:'40px'}} justify='space-between'>
                <CustomButton title='Close & Dont Save' backgroundColor='#EB4345' icon={<CloseOutlined />}
                    onChange={() => {
                          setOpen(false)
                          setModalData({title:'',category:'',asignTo:'',notes:''})
                    }}/>  
                <CustomButton onChange={handleSubmit} title='Save Changes' backgroundColor='#71CF48' icon={<CheckOutlined />} />   
            </Flex>
          </div>
    </Modal>
  )
}

export default CustomModal