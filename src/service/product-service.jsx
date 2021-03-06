import MUtil from 'util/mm.jsx';
const _mm = new MUtil();


class Product {
    //获取产品数据,区分是list还是search
    getProductList(listParam){  
        let url = '',
            data = {};
        if (listParam.listType === 'list') {
            url = '/manage/product/list.do';
            data.pageNum = listParam.pageNum;
        } else if (listParam.listType === 'search') {
            url = '/manage/product/search.do';
            data.pageNum = listParam.pageNum;
            data[listParam.searchType] = listParam.searchKeyword;
        }
        return _mm.request({
            type: 'post',
            url: url,
            data: data
        });   
    }
    // 改变产品状态
    setProductStatus(productInfo) {
        return _mm.request({
            type: 'post',
            url: '/manage/product/set_sale_status.do',
            data: productInfo
        });
    }
    // 检查保存商品的表单数据
    checkProduct(product) {
        let result = {
            status: true,
            msg : '验证通过'
        };
        // 判断商品名称不能为空
        if(typeof product.name !== 'string' || product.name.length === 0) {
            return {
                status: false,
                msg: '商品名称不能为空!'
            }
        }
        // 判断商品描述不能为空
        if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
            return {
                status: false,
                msg: '商品描述不能为空!'
            }
        }
        // 品类ID
        if (typeof product.categoryId !== 'number' || !(product.categoryId > 0)) {
            return {
                status: false,
                msg: '请选择商品品类!'
            }
        }
        // 判断商品价格为数字且大于0
        if (typeof product.price !== 'number' || !(product.price >= 0)) {
            return {
                status: false,
                msg: '请输入正确的商品价格!'
            }
        }
        // 判断库存为数字且大于0或等于0
        if (typeof product.stock !== 'number' || !(product.stock >= 0)) {
            return {
                status: false,
                msg: '请输入正确的库存数量!'
            }
        }
        
        return result;
    }

    // 保存商品
    saveProduct(product){
        return _mm.request({
            type: 'post',
            url: '/manage/product/save.do',
            data: product
        });
    }

    /*
        品类的操作
    */
   getCategoryList(parentCategoryId) {
       return _mm.request({
           type: 'post',
           url: '/manage/category/get_category.do',
           data: {
               categoryId: parentCategoryId || 0
           }
       });
   }
}

export default Product;