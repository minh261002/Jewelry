import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './style.scss';
import Header from '../../Components/Header';

function DetailPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});

    useEffect(() => {
        axios.get(`https://api.lafutavn.store/api/v1/products/${id}`)
            .then(response => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='detail-page'>
            <Header />
            <div className="container">
                <div className="detail">
                    <div className="detail__image">
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="detail__info">
                        <h1 className="detail__info-name">{product.name}</h1>
                        <p className="detail__info-price">{product.price}đ</p>
                        <p className="detail__info-description">{product.description}</p>
                        <button className="detail__info-btn">Thêm vào giỏ hàng</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailPage;
