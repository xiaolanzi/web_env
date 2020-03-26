/*
 * @Author: 张遥兰
 * @Date: 2020-03-26 22:00:08
 * @LastEditTime: 2020-03-26 22:02:45
 * @LastEditors: Please set LastEditors
 * @FilePath: \web_env\react\relevant_knowledge\watermark\index.js
 */

//这是react框架的启动文件 水印效果呈现每一个页面
import React from 'react';
import mirror, {
    render,
    Router,
    Route
} from 'mirrorx';
import 'utils/Tingyun';
import MainLayout from  'components/MainLayout';
import Routers from "./routes";
import 'static/css/tinper-bee.css';
import 'styles/styles.less';
mirror.defaults({
    historyMode: "hash"
});
render(

    <MainLayout >
        <Router>
            <Route  path={`/`} component={Routers}/>
        </Router>
    </MainLayout>
    ,
    document.getElementById('app')
);