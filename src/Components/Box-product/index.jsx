import PropTypes from 'prop-types';
import './style.scss';
import { Link } from 'react-router-dom';

function BoxProduct({ id, name, image, price, sale }) {
    const baseUrl = 'https://api.lafutavn.store/';
    const img = baseUrl + image;

    return (
        <div className="box-product">
            <Link to={"/san-pham/" + id} className="box-product__link">
                <div className="box-product__img">
                    <img src={img} alt={name} />
                </div>

                <div className="box-product__info">
                    <p className="box-product__name">{name}</p>
                    <p className="box-product__price">
                        <span className="product-sale">
                            {(price - (price * sale) / 100).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                        <span className="product-price">
                            {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                    </p>
                </div>
            </Link>
            {sale > 0 && <div className="box-product-sale">{sale}% off</div>}
        </div>
    );
}

BoxProduct.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    sale: PropTypes.number.isRequired,
};

export default BoxProduct;
