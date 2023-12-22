import PropTypes from 'prop-types';
import BoxProduct from '../Box-product';

import './style.scss';

function ListProduct({ products }) {
    return (
        <div className="list-product">
            {products.map((product) => (
                <BoxProduct key={product.id} {...product} />
            ))}
        </div>
    );
}

ListProduct.propTypes = {
    products: PropTypes.array.isRequired,
};

export default ListProduct;
