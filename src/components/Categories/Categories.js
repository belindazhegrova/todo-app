import { Button, Col, Row, Typography } from 'antd';
import React from 'react';
const { Text } = Typography;

const Categories = ({categories,onChange}) => {
  return (
    <Row justify='center' gutter={8}>
     {categories.map(cat => {
       return (
         <Col span={4} key={cat.id}>
            <Button onClick={() => onChange(cat)} style={{backgroundColor: cat.backgroundColor,borderRadius:'5px',width:"100%",height:'110px'}}>
                <div>          
                  <Text style={{fontSize:'55px',lineHeight:'unset',color:'#ffffff',fontWeight:600}}>{cat.total}</Text><br />
                  <Text style={{fontSize:'14px',color:'#ffffff'}}>{cat.status}</Text>
                </div>
            </Button>
         </Col>
  )
})}
  </Row>
  )
}

export default Categories