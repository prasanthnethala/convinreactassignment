import React from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
const { Meta } = Card;

const Entertainment = ({ entertainmentData, deleteItem, showModal, handleHistory }) => {
  
  return (
    <div>
    <h1>Entertainment : </h1>
    <div className="card">
    {
         entertainmentData?.map(({ name, id, url, bucket }) => {
            return(
      <Card
      onClick={()=>handleHistory(name, id, url, bucket)}
      key={id}
    style={{
      width: 300,
      margin: 20,
    }}
    cover={
    //   <img
    //     alt="example"
    //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
    //   />
    
    <iframe width="560" height="315" src={url} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    }
    actions={[
        <EditOutlined key="edit" onClick={()=> showModal(bucket, id, name, url)} />,
      <DeleteOutlined key="delete" onClick={()=>deleteItem(bucket, id)} />,
    ]}
     >
    <Meta
      avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
      title={ name }
    />
  </Card>
)
})
}
</div>
    </div>
  )
}

export default Entertainment;


