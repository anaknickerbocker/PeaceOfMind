import { Link } from 'react-router-dom';
import {Menu, Layout, Button} from 'antd';
import {BellOutlined, HeartOutlined, UserOutlined, FolderAddOutlined} from '@ant-design/icons';

import './Header.css';
import 'antd/dist/antd.css'


const HeaderLink = ({ page }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);
  let image = ''
  if (page == 'reminders') {
    image = <BellOutlined/>
  }
  if (page == 'tasks') {
    image = <FolderAddOutlined/>
  }
  if (page == 'profile') {
    image = <UserOutlined/>
  }
  if (page == 'tracking') {
    image = <HeartOutlined/>
  }

  return (
    <Link to={`/${page}`} className='headerlink-title'>     
      <Button 
        shape='circle'
        size='large'
        style={{
          backgroundColor: '#FFF6EE'
        }}
        type="default"
      >
        {image}
      </Button >
    </Link> 
  )
  
};

const Header = () => {
    return (
      <div style={{ paddingTop: '30px'}}>
      <div className='header'>
        <HeaderLink page='tasks' />
        <HeaderLink page='reminders' />
        <HeaderLink page='profile' />
        <HeaderLink page='tracking' />
      </div>
      </div>
    );
  };
  
  export default Header;