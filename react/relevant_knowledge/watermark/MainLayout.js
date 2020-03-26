import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { actions } from 'mirrorx';
import { Select, Label } from 'tinper-bee';
import FormItemPro from  'components/FormItemPro';
import { FormattedMessage} from 'react-intl';
import watermark from 'water-mark-oc';
import LocalePortal from  'components/LocalePortal';
import { getCookie } from 'utils';
import './index.less'

//这个文件引入到模块的启动文件后，起到设置国际化和添加水印效果的功能
class MainLayout extends Component {
    constructor(props){
        super(props)
        this.state = {
            value: 'zh_CN'
        }
    }
    componentDidMount() {
        let cookies = [];
        let code = '';
        let name = '';
        if(document.cookie){
            cookies = document.cookie.split(';');
            for(let i = 0,len = cookies.length;i<len;i++){
                let cookieArr = cookies[i].split('=');
                if(cookieArr[0].trim() === '_A_P_userName'){
                    name = decodeURI(decodeURI(cookieArr[1]));
                }
                if(cookieArr[0].trim() === '_A_P_userLoginName'){
                    code = cookieArr[1];
                }
            }
            if(name.includes('%')){
                name = getCookie('_A_P_userName');
                
            }
        }
        let tenantid = getCookie('tenantid');
        let watermarkText = '';
        if(tenantid&&tenantid === 'ifckxwyk') { //如果登录的是采购商
            watermarkText = `${code}${name}`;
        }else{
            watermarkText = `${name}`;
        }
        watermark({
            container:document.getElementById('app'),
            content: watermarkText,
            width:300,
            height:150,
            rotate:'-10',
            font:'15px Mi   crosoft YaHei',
            fillStyle:'rgba(184,184,184,0.4)'
        })
    }


    handleChange = value => {
        this.setState({value}, () => {
            actions.intl.setLocale(value);
        });
    };
    render() {
        let { children } = this.props;
        return (
            <div className="mainlayout">
                <div  className="form-panel hide">
                    {/*<div  className="form-panel">*/}
                    <FormItemPro>
                        <Label>
                            <LocalePortal>
                                <FormattedMessage
                                    id = 'Demo.seleteLang'
                                    defaultMessage = '选择语言'
                                />
                            </LocalePortal>
                        </Label>
                        <Select
                            value={this.state.value}
                            onChange={this.handleChange.bind(this)}
                        >
                            <Option value="zh_CN">中文</Option>
                            <Option value="en_US">英文</Option>
                        </Select>
                    </FormItemPro>
                </div>
                <LocalePortal>
                    {children}
                </LocalePortal>

            </div>

        )
    }
}

export default MainLayout;