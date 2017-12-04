import React, {Component} from 'react';
import callApi from './../../utils/apiCaller';
import {Link} from 'react-router-dom';
import {actAddProductRequest, actGetProductRequest,actUpdateProductRequest} from './../../actions/index';
import {connect} from 'react-redux';
class ProductActionPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            txtName: '',
            txtPrice: '',
            chkbStatus: ''
        }
    }
    // Thao tac voi form
    onChange = (e) => {
        var target = e.target;
        var name = target.name;
        var value = target.type === 'checkbox'
            ? target.checked
            : target.value;
        // set gia tri cho 1 mang
        this.setState({[name]: value})
    }

    componentDidMount() {
        console.log('componentDidMount');
        var {match} = this.props;
        if (match) {
            var id = match.params.id;
            /* callApi(`products/${id}`, 'GET', null).then(res => {
                console.log(res.data);
                var data = res.data;
                this.setState({id: data.id, txtName: data.name, txtPrice: data.price, chkbStatus: data.status});
            }) */
            this.props.onEditProduct(id);
        }
    }

    componentWillReceiveProps(nextProps) {
       // console.log('componentWillReceiveProps');
       if (nextProps && nextProps.itemEditing){
           var {itemEditing} = nextProps;
           this.setState({
            id: itemEditing.id,
            txtName: itemEditing.name,
            txtPrice: itemEditing.price,
            chkbStatus: itemEditing.status
           })
       }
    }
    

    onSave = (e) => {
        e.preventDefault();
        var {id, txtName, txtPrice, chkbStatus} = this.state;
        var {history} = this.props;
        var product = {
            id :id,
            name : txtName,
            price: txtPrice,
            status: chkbStatus
        }
        if (id) {
            // update
           /*  console.log("Updating");
            callApi(`products/${id}`, 'PUT', {
                name: txtName,
                price: txtPrice,
                status: chkbStatus
            }).then(res => {
                history.goBack();
            }); */
            this.props.onUpdateProduct(product);
           
        } else {
           this.props.onAddProduct(product);
        }
        history.goBack();
        // console.log(this.state);
    }

    render() {
        var {txtName, txtPrice, chkbStatus} = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">

                <form onSubmit={this.onSave}>
                    <div className="form-group">
                        <label >Ten San Pham</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Input field"
                            name="txtName"
                            value={txtName}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label >Gia</label>
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Input field"
                            name="txtPrice"
                            value={txtPrice}
                            onChange={this.onChange}/>
                    </div>
                    <div className="form-group">
                        <label >Trang thai</label>
                    </div>

                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="chkbStatus"
                                value={chkbStatus}
                                onChange={this.onChange}
                                checked
                                ={chkbStatus}/>
                            Con hang
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Luu Lai</button>
                    <Link to="/product-list" className="btn btn-default">Tro Lai</Link>
                </form>

            </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProduct: (product) => {
            dispatch(actAddProductRequest(product));
        },
        onEditProduct: (id) => {
            dispatch(actGetProductRequest(id));
        },
        onUpdateProduct: (product) =>  {
            dispatch(actUpdateProductRequest(product));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductActionPage);
