import React, {Component} from 'react';
import ProductList from './../../components/ProductList/ProductList';
import ProductItem from './../../components/ProductItem/ProductItem';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {actFetchProductsRequest,actDeleteProductRequest} from './../../actions/index';

class ProductListPage extends Component {

    //life cycle hook
    componentDidMount() {
        this.props.fetchAllProducts();
    }

    // Khai bao phuong thuc onDelete -> truyen props vao productItem -> productItem
    // goi ham nay thuc thi
    onDelete = (id) => {
       /*  var {products} = this.state;
        callApi(`products/${id}`, 'DELETE', null).then(res => {
            if (res.status === 200) {
                var index = this.findIndex(products, id);
                if (index !== -1) {
                    products.splice(index, 1);
                    this.setState({products: products})
                }
            }
        }); */

              // goi den method de xoa product tren server
              this.props.onDeleteProduct(id);
    }

    /* findIndex = (products, id) => {
        var result = -1;
        products.forEach((product, index) => {
            if (product.id === id) {
                result = index;
            }
        });
        return result;
    } */

    render() {
        var {products} = this.props;
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Link to="/product/add" className="btn btn-info  mb-10">Them San Pham</Link>
                <ProductList>
                    {this.showProducts(products)}
                </ProductList>
            </div>

        );
    }
    showProducts = (products) => {
        var result = null;
        if (products.length > 0) {
            result = products.map((product, index) => {
                return (<ProductItem
                    key={index}
                    product={product}
                    index={index}
                    onDelete={this.onDelete}/>);
            })
        }
        return result;
    }
}

// lay tu server ve
const mapStateToProps = (state) => {
    return {products: state.products}
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        fetchAllProducts: () => {
            // Luu cai nay len store
            dispatch(actFetchProductsRequest());
        },
        onDeleteProduct : (id) => {
            dispatch(actDeleteProductRequest(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage);
