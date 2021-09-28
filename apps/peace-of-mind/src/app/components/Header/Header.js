import { Link } from 'react-router-dom';

import './Header.css';
import 'antd/dist/antd.css'


const HeaderLink = ({ page }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);
  return <Link to={`/${page}`} className='headerlink-title'> {title} </Link>
  
};

const Header = () => {
    return (
      <div className='header'>
        <HeaderLink page='profile' />
        <HeaderLink page='tasks' />
        <HeaderLink page='reminders' />
      </div>
    );
  };
  
  export default Header;