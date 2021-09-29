
import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Calendar, Card, Badge } from 'antd';
import {MehOutlined, SmileOutlined, FrownOutlined} from '@ant-design/icons';
import "antd/dist/antd.css";

export default function Tracking() {
  const {
    taskReminders
  } = useContext(AppContext)

  const meh = <MehOutlined style={{fontSize: '30px'}}/>
  const smile = <SmileOutlined style={{fontSize: '30px'}}/>
  const frown = <FrownOutlined style={{fontSize: '30px'}}/>


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
            {/* {<MehOutlined style={{fontSize: '30px'}}/>} */}
            {item.content}
          </div>
        ))}
      </ul>
    );
  }
  
  // function getMonthData(value: any) {
  //   if (value.month() === 8) {
  //     return 1394;
  //   }
  // }
  
  function monthCellRender(value: any) {
    const num = 1394;
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  }

  
  return (
    <div>
      <Card 
      style={{backgroundColor: '#E5C2F9', marginLeft: '100px', marginRight: '100px'}}
      >
        <Calendar
        dateCellRender={dateCellRender} monthCellRender={monthCellRender}
        />
      </Card>
    </div>
  

  )
}
