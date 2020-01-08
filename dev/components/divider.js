import React, { Component } from 'react';
import Divider from '../../components/divider';

class DividerDev extends Component {

    render() {
        return (
            <div className='dev-section'>
                <h1 className='dev-title'>Divider</h1>

                <Divider/>
                <div style={{height: '32px'}}>
                    首页<Divider mode='vertical'/>菜单<Divider mode='vertical'/>导航<Divider mode='vertical'/>logout
                </div>
                <div style={{height: '32px', lineHeight: '32px'}}>
                    首页<Divider mode='vertical'/>菜单<Divider mode='vertical'/>导航<Divider mode='vertical'/>logout
                </div>

                <Divider dashed/>
                <Divider title='默认标题'/>
                <Divider dashed title='靠左标题' align='left'/>
                <Divider title='靠右标题' align='right'/>

                <div style={{height: 400}}>
                    <Divider title='垂直标题' mode='vertical'/>
                    <Divider title='垂直标题' mode='vertical' align='top'/>
                    <Divider title='垂直标题' mode='vertical' align='bottom'/>
                </div>
            </div>
        );
    }
}

export default DividerDev;
