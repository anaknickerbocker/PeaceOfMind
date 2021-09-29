
import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Calendar, Card, Layout } from 'antd';
import {MehOutlined, SmileOutlined, FrownOutlined} from '@ant-design/icons';
import "antd/dist/antd.css";

export default function Tracking() {
  const {
    taskReminders
  } = useContext(AppContext)

  const { Footer } = Layout

  const meh = <MehOutlined style={{fontSize: '10px'}}/>
  const smile = <SmileOutlined style={{fontSize: '10px'}}/>
  const frown = <FrownOutlined style={{fontSize: '10px'}}/>


  function getListData(value: any) {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { content: meh },

        ];
        break;
        case 9:
        listData = [
          { content: smile },

        ];
        break;
        case 10:
        listData = [
          { content: frown },

        ];
        break;
        case 11:
        listData = [
          { content: meh },

        ];
        break;
      case 12:
        listData = [
          { content: smile },
        ];
        break;
        case 13:
        listData = [
          { content: frown },
        ];
        break;
        case 14:
        listData = [
          { content: smile },
        ];
        break;
      case 15:         
        listData = [
          { content: meh },
        ];
        break;
      default:
    }
    return listData || [];
  }
  
  function dateCellRender(value: any) {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map(item => (
          <div>
            {item.content}
          </div>
        ))}
      </ul>
    );
  }

  
  return (
    <div>
      <Card 
      style={{backgroundColor: '#E5C2F9', marginLeft: '400px', marginRight: '400px'}}
      >
        <Calendar
        dateCellRender={dateCellRender} 
        />
      </Card>
    <Footer style={{ textAlign: 'center', backgroundColor: '#E5C2F9', marginLeft: '500px', width: '500px'}}>
       “I have learned over the years that when one’s mind is made up, this diminishes fear; knowing what must be done does away with fear.” – Rosa Parks
    </Footer>
    </div>
  

  )
}
