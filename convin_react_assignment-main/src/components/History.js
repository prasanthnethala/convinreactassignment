import React, { useEffect, useState } from 'react';
import { Layout } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Col, Row } from 'antd';
const { Header, Footer, Content } = Layout;



const History = () => {

  const [historyData, setHistoryData] = useState([])
const { post } = useSelector((state) => (state.app));
const navigate = useNavigate();

    const headerStyle = {
        display:'flex',
        color: '#fff',
        height: 64,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: 'black',
      };
      const contentStyle = {
        padding:'15%',
        textAlign: 'center',
        minHeight: 120,
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#b3c6c8',
        height:'85vh'
      };
      const footerStyle = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: 'black',
      };

      useEffect(()=>{
        // setHistoryData([...historyData,post])
        console.log('inside history', post[post.length-1].name)
        setHistoryData(post[post.length-1].name)
      },[])


  return (
    <div>

<Layout>
      <Header style={headerStyle}>
        <h2 style={{marginLeft:'20px', cursor:'pointer'}} onClick={()=>navigate('/')}>Home</h2>
      </Header>
      <Content style={contentStyle}>


{
  historyData.length>0? 
  historyData?.map((ele, i )=>
  <Row key={i}>
  <Col span={24} style={{border:'1px solid white', justifyContent:'space-evenly', display:'flex'}}>
    <li>Title : { ele.name }</li> |
    <li>Url : { ele.url }</li> 
  </Col>
</Row>): 
<h2>Currently No History Available</h2>
}

        
      

      </Content>
      <Footer style={footerStyle}>
        All Rights Are Reserved To @ Vid-Lib
      </Footer>
    </Layout>
    </div>
  )
}

export default History
