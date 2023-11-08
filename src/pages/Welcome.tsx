import { PageContainer } from '@ant-design/pro-components';
import { Card, Row, Col } from 'antd';
import React from 'react';
import './Welcome.less';
import {SYSTEM_LOGO_WHITE} from "@/constant";


const Welcome: React.FC = () => {

  const bigDivStyle = {
    position: 'relative',
    height: '100%',
    width: '100%',
  }

  const cardsDivStyle = {
    position: 'absolute',
    bottom: '10vh',
    width: '100%',
  }

  return (
    <div style={bigDivStyle}>
      <div className="scStyle">
        StepCapsule
      </div>
      <div style={cardsDivStyle}>
        <Row gutter={10} style={{ marginBottom: '10px' }}>
          <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Card className="customCard">
              我看完了一部很棒的电影 📽️
            </Card>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start'}}>
            <Card className="customCard">
              我学会了烹饪 🥘
            </Card>
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: '10px' }}>
          <Col span={12} style={{ display: 'flex', justifyContent: 'flex-end'}}>
            <Card className="customCard">
              我完成了这个月的工作 🖥️
            </Card>
          </Col>
          <Col span={12} style={{ display: 'flex', justifyContent: 'flex-start'}}>
            <Card className="customCard">
              我养成了早睡的习惯 💤
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Welcome;
