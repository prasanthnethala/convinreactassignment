import React, { useEffect, useState } from 'react';
import Entertainment from './Entertainment';
import Education from './Education';
import { Button, Form, Input, Radio, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getPost, historyData } from '../redux/slices/DataSlice';


const AddItem = () => {

  const [ formVal, setFormVal ] = useState({
    name: '',
    url: '',
    bucket: '',
});

const [entertainmentData, setEntertainmentData ] = useState([]);
    const [educationData, setEducationData ] = useState([]);

const dispatch = useDispatch();
const { loading ,post } = useSelector((state) => (state.app))

    // Post request --->
 const postData =  async()=>{
    const { name, url, bucket } = formVal;
      let response =await fetch(`http://localhost:3000/${bucket}`, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    //make sure to serialize your JSON body
    body: JSON.stringify({
      name,
      url,
      bucket
    })
  })
  response = await response.json()
  return response;
  };

  // initial load function
  const initialLoad = async(bucket, setState)=>{
    let response = await fetch(`http://localhost:3000/${bucket}`)
        response =  await response.json();
        setState([...response])
        return response
  };

  // Add data handle change --->
    const handleChange = (e)=>{
        setFormVal({...formVal, [e.target.name]:e.target.value})
    };


    // Post Data click function --->
  const handleClick = ()=>{
        const { name, url, bucket } = formVal
        if(!name || !url  || !bucket){
          alert('please fill fields properly')
        }
        else{
          postData()
          dispatch(getPost(formVal.bucket));
          formVal.bucket === 'entertainment'? initialLoad('entertainment', setEntertainmentData) : initialLoad('education', setEducationData)
          setFormVal({
            name: '',
            url: '',
            bucket: '',
        })
        }
    };

    // Initial Load --->
    useEffect(()=>{
      if(entertainmentData.length===0){
        initialLoad('entertainment', setEntertainmentData)
      }
      if(educationData.length===0){
        initialLoad('education', setEducationData)
      }
    },[]);

    // Delete Method
      const deleteItem = async( bucket, id )=>{
        let response = await fetch(`http://localhost:3000/${bucket}/${id}`,{
          method: 'DELETE',
        })
        response =  await response.json();

        bucket === 'entertainment'? initialLoad('entertainment', setEntertainmentData) : initialLoad('education', setEducationData)
        
        return response
      };

 // Modal methods --->
      const [editVal, setEditVal] = useState({
        bucket:'',
        id:0,
        name: '',
        url: '',
      })

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (bucket, id, name, url) => {
    setEditVal({
      bucket, id, name, url
    });
    setIsModalOpen(true);
  };

  const handleOk = async() => {
    let response = await fetch(`http://localhost:3000/${editVal.bucket}/${editVal.id}`, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
       name : editVal.name,
       url: editVal.url
      })
    })
    response = await response.json();
    editVal.bucket === 'entertainment'? initialLoad('entertainment', setEntertainmentData) : initialLoad('education', setEducationData)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

const handleEdit = (e)=>{
  setEditVal({...editVal, [e.target.name] : e.target.value})
};



// History data --->
const [ history, setHistory ] = useState([]);

const handleHistory = (name, id, url, bucket)=>{

  console.log('add to history : ', name, id, url, bucket)
  let addHistory = {
    name,
    url,
  }
  setHistory([...history, addHistory]);
};

useEffect(()=>{
  dispatch(historyData(history));
},[history]);

  return (
    <>
    <div>  
      <h2>Add Content : </h2>
      <Form style={{display:'flex'}}>
      <Form.Item name="name" label="Name" rules={[{ required: true }]}>
        <Input placeholder='Enter name' value={formVal.name} onChange={handleChange} name='name' />
      </Form.Item>
      <Form.Item name="url" label="Url" rules={[{ required: true }]}>
        <Input placeholder='Enter Url' value={formVal.url} onChange={handleChange} name='url' />
      </Form.Item>
      <Radio.Group onChange={handleChange} name='bucket' value={formVal.bucket}>
      <Radio value={'entertainment'}>entertainment</Radio>
      <Radio value={'education'}>education</Radio>
    </Radio.Group>
      <Form.Item >
        <Button type="default" htmlType="submit" onClick={handleClick} ghost>
            Submit
        </Button>
      </Form.Item>
      </Form>
    </div>

<hr />

<Entertainment entertainmentData={entertainmentData} deleteItem={deleteItem} showModal={showModal} handleHistory={handleHistory}/>
<Education educationData={educationData} deleteItem={deleteItem} showModal={showModal} handleHistory={handleHistory}/>

{/*  Modal component */}
      <Modal title="Edit Fields : " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>

<input name={'name'} value={editVal.name} onChange={handleEdit} placeholder='Enter New Name' style={{fontSize:'20px', margin:'10px', width:'100%'}} />
<input name={'url'} value={editVal.url} onChange={handleEdit} placeholder='Enter New url' style={{fontSize:'20px', margin:'10px', width: '100%'}} />

</Modal>

</>
  )
}

export default AddItem;
