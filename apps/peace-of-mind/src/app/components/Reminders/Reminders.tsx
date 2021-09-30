import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { Card, Steps, Row, Col, Divider, Switch, Layout } from 'antd';
import "antd/dist/antd.css";
import { Image } from 'antd';
const { Footer } = Layout

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
        <Row>
          <Col className="gutter-row">
            <Card
                title="Take a leisure Walk"
                style={{backgroundColor: '#FFF6EE'}}
                extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
              >
              <Steps
                current={1}
                size="small"
                direction="vertical"
                style={{width: '350px'}}
              >
                <Steps.Step title="Alert 1" description="1 minute"/>
                <Steps.Step title="Alert 2" description="2 minutes"/>
                <Steps.Step title="Alert 3" description="3 minutes"/>
              </Steps>
              </Card>
            </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
          <Col className="gutter-row">
          <Card
              title="A minute of deep breathing"
              style={{backgroundColor: '#FFF6EE'}}
              extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
            >
            <p style={{marginTop: "20px", fontSize: 'large'}}></p>
            <Steps
              current={0}
              size="small"
              direction="vertical"
              style={{width: '350px'}}
            >
              <Steps.Step title="Alert 1" description="1 hours"/>
              <Steps.Step title="Alert 2" description="2 hours"/>
            </Steps>
            </Card>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
          <Col className="gutter-row">
            <Card
                title="Go for a walk"
                style={{backgroundColor: '#FFF6EE'}}
                extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
              >
              <p style={{marginTop: "20px", fontSize: 'large'}}></p>
              <Steps
                current={3}
                size="small"
                direction="vertical"
                style={{width: '350px'}}
              >
                <Steps.Step title="Alert 1" description="1 days"/>
                <Steps.Step title="Alert 2" description="2 days"/>
                <Steps.Step title="Alert 3" description="3 days"/>
              </Steps>
            </Card>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row>
          <Col className="gutter-row">
          <Card
              title="Eat vegetables"
              style={{backgroundColor: '#FFF6EE'}}
              extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
            >
            <Steps
              current={0}
              size="small"
              direction="vertical"
              style={{width: '350px'}}
            >
              <Steps.Step title="Alert 1" description="1 minute"/>
              <Steps.Step title="Alert 2" description="2 minutes"/>
              <Steps.Step title="Alert 3" description="3 minutes"/>
            </Steps>
            </Card>
          </Col>
          </Row>
          <Divider orientation="left"></Divider>
          <Row>
          <Col className="gutter-row">
          <Card
              title="Call a family member"
              style={{backgroundColor: '#FFF6EE'}}
              extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
            >
            <p style={{marginTop: "20px", fontSize: 'large'}}></p>
            <Steps
              current={2}
              size="small"
              direction="vertical"
              style={{width: '350px'}}
            >
              <Steps.Step title="Alert 1" description="1 hours"/>
              <Steps.Step title="Alert 2" description="2 hours"/>
              <Steps.Step title="Alert 3" description="3 hours"/>
              <Steps.Step title="Alert 4" description="10 minutes"/>
            </Steps>
            </Card>
          </Col>
          </Row>
          <Divider orientation="left"></Divider>
          <Row>
          <Col className="gutter-row">
            <Card
                title="Text a friend"
                style={{backgroundColor: '#FFF6EE'}}
                extra={<Switch defaultChecked checkedChildren="Alert on" unCheckedChildren="Alert off"/>}
              >
              <p style={{marginTop: "20px", fontSize: 'large'}}></p>
              <Steps
                current={2}
                size="small"
                direction="vertical"
                style={{width: '350px'}}
              >
                <Steps.Step title="Alert 1" description="1 days"/>
                <Steps.Step title="Alert 2" description="2 days"/>
                <Steps.Step title="Alert 3" description="3 days"/>
              </Steps>
            </Card>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Footer style={{ textAlign: 'center', backgroundColor: '#FFF6EE', width: '400px'}}>
          “Think like a queen. A queen if not afraid to fail. Failure is another stepping stone to greatness.” – Oprah Winfrey
        </Footer>
    </div>
    </div>
  

  )
}
