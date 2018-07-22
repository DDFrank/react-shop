import React from 'React';

import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new MUtil();
const _product = new Product();

import './category-selector.scss';

//品类选择器
class CategorySelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstCategoryList : [],
            firstCategoryId : 0,
            secondCategoryList: [],
            secondCategoryId : 0
        };
    }

    componentDidMount() {
        this.loadfirstCategory();
    }
    // 加载一级分类
    loadfirstCategory() {
        _product.getCategoryList().then(res => {
            this.setState({
                firstCategoryList : res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    // 加载二级分类
    loadSecondCategory() {
        _product.getCategoryList(this.state.firstCategoryId).then(res => {
            this.setState({
                secondCategoryList: res
            });
        }, errMsg => {
            _mm.errorTips(errMsg);
        });
    }
    // 选择了一级品类
    onFirstCategoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId : newValue,
            secondCategoryId : 0,
            secondCategoryList:[]
        }, () => {
            // 更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChnage();
        });
    }
    // 选择了二级品类
    onSecondCategoryChange(e) {
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId: newValue,
        }, () => {
            // 更新二级品类
            this.onPropsCategoryChnage();
        });
    }
    // 传给父组件选中的结果
    onPropsCategoryChnage(){
        // 判断Props里是否有可以调用的函数
        let categoryChangeable = typeof this.props.onCategoryChange === 'function';
        // 如果是有二级品类
        if(this.state.secondCategoryId) {
            categoryChangeable && this.props.onCategoryChange(this.state.firstCategoryId, this.state.secondCategoryId);
        }else{
         // 如果只有一级品类   
            this.props.onCategoryChange(this.state.firstCategoryId, 0);
        }
    }

    render() {
        return (
            <div className="col-md-10">
                <select 
                    className="form-control cate-select"
                    onChange={e => this.onFirstCategoryChange(e)}
                >
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map((category, index) => <option value={category.id} key={index}>{category.name}</option>)
                    }
                </select>
                {
                    this.state.secondCategoryList.length > 0 ?
                        (<select 
                            className="form-control cate-select"
                            onChange={e => this.onSecondCategoryChange(e)}
                            >
                            <option value="">请选择二级分类</option>
                            {
                                this.state.secondCategoryList.map((category, index) => <option value={category.id} key={index}>{category.name}</option>)
                            }
                        </select>) : ''
                }
            </div>
        );
    }
}

export default CategorySelector;