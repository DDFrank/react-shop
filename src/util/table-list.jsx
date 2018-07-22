import React from "react";

// 通用分页组件
class TableList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ifFirstLoading:true
        }
    }

    componentWillReceiveProps() {
        // 列表只有在第一次挂载的时候, isFirstLoading为true,其它情况均为false
        this.setState({
            ifFirstLoading : false
        });
    }

    render() {
        // 表头信息
        let tableHeader = this.props.tableHeaders.map((tableHead, index) => {
            if(typeof tableHead === 'object') {
                return (<th key={index} width={tableHead.width}>{tableHead.name}</th>)
            }else if(typeof tableHead === 'string'){
                return (<th key={index}>{tableHead}</th>)
            }
            
        });
        // 列表内容
        let listBody = this.props.children;
        // 列表信息
        let listInfo = (
            <tr>
                <td colSpan={this.props.tableHeaders.length} 
                    className="text-center">{this.state.ifFirstLoading ? '正在加载数据...' : '没有找到相应的结果~'
                }</td>
            </tr>
        );

        let tableBody = listBody.length >0 ? listBody : listInfo;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-striped table-bodered">
                                <thead>
                                    <tr>
                                        {tableHeader}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableBody}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TableList;