import React from "react";
import PageTitle from "component/page-title/index.jsx";
import Pagination from 'util/pagination.jsx';

import { Link } from "react-router-dom"

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import ListSearch from './product-list-search.jsx';
import TableList from 'util/table-list.jsx';
 

import './product.scss'

const _mm = new MUtil();
const _product = new Product();



class ProductList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            pageNum: 1,
            listType: 'list'
        };
    }

    componentDidMount() {
        this.loadProductList();
    }
    // 加载商品列表,区分是list还是search
    loadProductList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 如果是search的话,多加两个参数:搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.searchKeyword = this.state.searchKeyword;
        }
        // 请求接口
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list: []
            });
            _mm.errorTips(errMsg);
        });
    }
    // 搜索功能
    onSearch(searchType, searchKeyword) {
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType: listType,
            pageNum: 1,
            searchType: searchType,
            searchKeyword: searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    // 页数发生变化的时候
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            // 更新完状态后重新加载数据
            this.loadProductList();
        });
    }
    // 改变商品状态，上架/下架
    onSetproductStatus(e, productId, currentStatus) {
        let newStatus = currentStatus == 1 ? 2 : 1,
            confirmTips = currentStatus == 1 ? '确定要下架该商品?' : '确认要上架该商品';
        
        if(window.confirm(confirmTips)) {
            _product.setProductStatus({
                productId: productId,
                status:newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(errMsg);
            });
        }
    }

    render() {
        let tableHeads = [
            {
                name: '商品ID', width: '10%'
            },
            {
                name: '商品信息', width: '50%'
            },
            {
                name: '价格', width: '10%'
            },
            {
                name: '状态', width: '15%'
            },
            {
                name: '操作', width: '15%'
            },
        ];
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表" />
                <ListSearch onSearch={(searchType, searchKeyword) => { this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeaders={tableHeads}>
                    {
                        this.state.list.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>{product.id}</td>
                                    <td>
                                        <p>{product.name}</p>
                                        <p>{product.subtitle}</p>
                                        
                                    </td>
                                    <td>￥{product.price}</td>
                                    <td>
                                        <p>{product.status == 1 ? '在售' : '已下架'}</p>
                                        <button 
                                            className="btn btn-warning btn-xs"
                                            onClick={(e) => {this.onSetproductStatus(e, product.id, product.status)}}>
                                            {product.status == 1 ? '下架' : '上架'}
                                        </button>
                                    </td>
                                    <td>
                                        <Link 
                                            className='opear'
                                            to={`/product/detail/${product.id}`}>详情</Link>
                                        <Link 
                                            className='opear'
                                            to={`/product/save/${product.id}`}>编辑</Link>
                                    </td>
                                </tr>
                            );
                        })   
                    }
                </TableList>
                <Pagination
                    current={this.state.pageNum}
                    total={this.state.total}
                    onChange={(pageNum) => { this.onPageNumChange(pageNum) }} />
            </div>
        );
    }
}

export default ProductList;