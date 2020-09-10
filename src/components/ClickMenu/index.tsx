import React, {ReactNode} from 'react';
import PropTypes, {object} from 'prop-types'
import assign from 'object-assign'
import {Props,Menu} from './index.type';

import './index.less'
import _ from 'lodash'

/***
 * 右键菜单,继承React.Component组件并传入Props接口作为属性的校验值，传入的属性必须在{@link Props}Props中定义
 */
export default class Index<RecordType> extends React.Component<Props>{

    /**使用prop-types校验传入属性的类型*/
    static propTypes = {
        style: PropTypes.object,
        menus:PropTypes.array,
        onClickVideoAudioSpeedBtn: PropTypes.func,
    }

    /**设置属性的默认值*/
    static defaultProps = {
        style: {},
        menus:[],
        onClickVideoAudioSpeedBtn: _.noop,
    }

    state = {
        visible: false,
        activeRecord:{}
    }

    root:HTMLDivElement|null;

    constructor(props:any){
        super(props);
    }

    componentDidMount() {
        // 添加右键点击、点击事件监听
        // document.addEventListener('contextmenu', this.handleContextMenu)
        document.addEventListener('click', this.handleClick)
    }

    componentWillUnmount() {
        // 移除事件监听
        // document.removeEventListener('contextmenu', this.handleContextMenu)
        document.removeEventListener('click', this.handleClick)
    }

    /***
     * 右键菜单事件，计算菜单显示的位置以及显示菜单
     * @param event
     * @param record
     */
    handleContextMenu = (event:React.MouseEvent,record:RecordType) => {
        event.preventDefault()

        this.setState({ visible: true,activeRecord:record })

        if(this.root == null){
            return;
        }

        /**clientX/Y 获取到的是触发点相对于浏览器可视区域左上角距离*/
        const clickX = event.clientX
        const clickY = event.clientY
        /**window.innerWidth/innerHeight 获取的是当前浏览器窗口的视口宽度/高度*/
        const screenW = window.innerWidth
        const screenH = window.innerHeight
        /**获取自定义菜单的宽度/高度*/
        const rootW = this.root.offsetWidth
        const rootH = this.root.offsetHeight

        /**right为true，说明鼠标点击的位置到浏览器的右边界的宽度可以放下菜单。否则，菜单放到左边。*/
        /**bottom为true，说明鼠标点击位置到浏览器的下边界的高度可以放下菜单。否则，菜单放到上边。*/
        const right = (screenW - clickX) > rootW
        const left = !right
        const bottom = (screenH - clickY) > rootH
        const top = !bottom

        if (right) {
            this.root.style.left = `${clickX}px`
        }

        if (left) {
            this.root.style.left = `${clickX - rootW}px`
        }

        if (bottom) {
            this.root.style.top = `${clickY}px`
        }
        if (top) {
            this.root.style.top = `${clickY - rootH}px`
        }

    };

    /***
     * 鼠标单击事件，当鼠标在任何地方单击时，设置菜单不显示
     */
    handleClick = () => {
        const { visible } = this.state
        if (visible) {
            this.setState({ visible: false })
        }
    };

    /***
     * 点击菜单事件，点击后调用配置menus的点击事件以及调用handleClick函数隐藏菜单
     * @param menu
     */
    onMenuClick = (menu:Menu) =>{
        menu.click(this.state.activeRecord);
        this.handleClick();
    }

    /***
     * 获取通过props传入的menus，渲染菜单
     */
    renderMenus = () =>{
        const {menus} = this.props;

        return menus.map((menu) => {
            return (<div className="contextMenu-option" onClick={this.onMenuClick.bind(this,menu)}>{menu.context}</div>)
        })
    }


    render() {
        /**获取visible变量判断右键菜单是否显示*/
        const { visible } = this.state;
        const display = visible ? 'block':'none';
        /**将父组件传递的样式与默认样式合并，右边样式优先级更高*/
        const wrapStyles = assign({display:display}, this.props.style);
        /**从属性中获取父组件配置的信息*/
        const {children} = this.props;

        return (
/*            visible && (*/
                <div ref={(ref) => { this.root = ref }} className="contextMenu-wrap" style={wrapStyles}>
                    {/*<div className="contextMenu-option">输入文字</div>
                    <div className="contextMenu-option">网络连接监控</div>
                    <div className="contextMenu-option">教室权限控制</div>
                    <div className="contextMenu-separator" />
                    <div className="contextMenu-option">设置...</div>
                    <div className="contextMenu-option">全局设置...</div>*/}
                    {this.renderMenus()}
                    {children}
                </div>
/*            )*/
        )
    }
    
}