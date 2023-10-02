import './App.css';
import { Layout } from 'antd';
import AddItem from './components/AddItem';
import { useNavigate } from 'react-router-dom';
const { Header, Footer, Content } = Layout;


function App() {

  const headerStyle = {
    display:'flex',
    color: '#fff',
    height: 64,
    paddingInline: 50,
    lineHeight: '64px',
    backgroundColor: 'black',
  };
  const contentStyle = {
    padding:'5%',
    textAlign: 'center',
    minHeight: 120,
    lineHeight: '120px',
    color: 'black',
    fontWeight:'bold',
    backgroundColor: '#b3c6c8',
  };
  const footerStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'black',
  };

  const navigate = useNavigate();

  return (
    <div className="App">
      <Layout>
      <Header style={headerStyle}>
        
        <h2 style={{marginLeft:'20px', cursor:'pointer'}} onClick={()=> navigate('/history')}>History</h2>
      </Header>
      <Content style={contentStyle}>

        <AddItem/>
        
      </Content>
      <Footer style={footerStyle}>
        All Rights Are Reserved To @ Vid-Lib
      </Footer>
    </Layout>
    </div>
  );
}

export default App;
