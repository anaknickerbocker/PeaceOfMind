import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Card, Steps, Row, Col, Divider, Switch } from 'antd';
import "antd/dist/antd.css";

import './Reminders.css';

export default function Reminders() {
  const {
    taskReminders
  } = useContext(AppContext)

  console.log(taskReminders)
  const taskList = JSON.stringify(taskReminders)

  
  return (
    <div style={{display: "flex", flex: "row", justifyContent: "center"}}>
    <div>
      <Divider orientation="left">Upcoming Task Alerts</Divider>
        <Row gutter={{ md: 24 }}>
          <Col className="gutter-row" span={8}>
          <Card
              title="Take a leisure Walk"
              style={{backgroundColor: '#E5C2F9'}}
              extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
            >
            <Steps
              current={1}
              size="small"
              direction="vertical"
              style={{marginLeft: '50px', paddingRight: '100px'}}
            >
              <Steps.Step title="Alert 1" description="1 minute"/>
              <Steps.Step title="Alert 2" description="2 minutes"/>
              <Steps.Step title="Alert 3" description="3 minutes"/>
            </Steps>
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
          <Card
              title="A minute of deep breathing"
              style={{backgroundColor: '#E5C2F9'}}
              extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
            >
            <p style={{marginTop: "20px", fontSize: 'large'}}></p>
            <Steps
              current={0}
              size="small"
              direction="vertical"
              style={{marginLeft: '50px', paddingRight: '100px'}}
            >
              <Steps.Step title="Alert 1" description="1 hours"/>
              <Steps.Step title="Alert 2" description="2 hours"/>
            </Steps>
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card
                title="Go for a walk"
                style={{backgroundColor: '#E5C2F9'}}
                extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
              >
              <p style={{marginTop: "20px", fontSize: 'large'}}></p>
              <Steps
                current={3}
                size="small"
                direction="vertical"
                style={{marginLeft: '50px', paddingRight: '100px'}}
              >
                <Steps.Step title="Alert 1" description="1 days"/>
                <Steps.Step title="Alert 2" description="2 days"/>
                <Steps.Step title="Alert 3" description="3 days"/>
              </Steps>
            </Card>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={{ md: 24 }}>
          <Col className="gutter-row" span={8}>
          <Card
              title="Eat vegetables"
              style={{backgroundColor: '#E5C2F9'}}
              extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
            >
            <Steps
              current={0}
              size="small"
              direction="vertical"
              style={{marginLeft: '50px', paddingRight: '100px'}}
            >
              <Steps.Step title="Alert 1" description="1 minute"/>
              <Steps.Step title="Alert 2" description="2 minutes"/>
              <Steps.Step title="Alert 3" description="3 minutes"/>
            </Steps>
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
          <Card
              title="Call a family member"
              style={{backgroundColor: '#E5C2F9'}}
              extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
            >
            <p style={{marginTop: "20px", fontSize: 'large'}}></p>
            <Steps
              current={2}
              size="small"
              direction="vertical"
              style={{marginLeft: '50px', paddingRight: '100px'}}
            >
              <Steps.Step title="Alert 1" description="1 hours"/>
              <Steps.Step title="Alert 2" description="2 hours"/>
              <Steps.Step title="Alert 3" description="3 hours"/>
              <Steps.Step title="Alert 4" description="10 minutes"/>
            </Steps>
            </Card>
          </Col>
          <Col className="gutter-row" span={8}>
            <Card
                title="Text a friend"
                style={{backgroundColor: '#E5C2F9'}}
                extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
              >
              <p style={{marginTop: "20px", fontSize: 'large'}}></p>
              <Steps
                current={2}
                size="small"
                direction="vertical"
                style={{marginLeft: '50px', paddingRight: '100px'}}
              >
                <Steps.Step title="Alert 1" description="1 days"/>
                <Steps.Step title="Alert 2" description="2 days"/>
                <Steps.Step title="Alert 3" description="3 days"/>
              </Steps>
            </Card>
          </Col>
        </Row>
      {/* <Card
          title="Take a leisure Walk"
          style={{backgroundColor: '#E5C2F9'}}
        >
        <Steps
          current={1}
          size="small"
          direction="vertical"
          style={{marginLeft: '50px', paddingRight: '100px'}}
        >
          <Steps.Step title="Alert 1" description="1 minute"/>
          <Steps.Step title="Alert 2" description="2 minutes"/>
          <Steps.Step title="Alert 3" description="3 minutes"/>
        </Steps>
        </Card>
        <Card
          title="A minute of deep Breathing"
          style={{backgroundColor: '#E5C2F9'}}
        >
        <p style={{marginTop: "20px", fontSize: 'large'}}></p>
        <Steps
          current={0}
          size="small"
          direction="vertical"
          style={{marginLeft: '50px', paddingRight: '100px'}}
        >
          <Steps.Step title="Alert 1" description="1 hours"/>
          <Steps.Step title="Alert 2" description="2 hours"/>
          <Steps.Step title="Alert 3" description="3 hours"/>
        </Steps>
        </Card>
        <Card
          title="Go for a walk"
          style={{backgroundColor: '#E5C2F9'}}
        >
        <p style={{marginTop: "20px", fontSize: 'large'}}></p>
        <Steps
          current={3}
          size="small"
          direction="vertical"
          style={{marginLeft: '50px', paddingRight: '100px'}}
        >
          <Steps.Step title="Alert 1" description="1 days"/>
          <Steps.Step title="Alert 2" description="2 days"/>
          <Steps.Step title="Alert 3" description="3 days"/>
        </Steps>
        </Card> */}
    </div>
    </div>
  

  )
}
