import { NavLink, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './style.scss';
import Header from '../../Components/Header';
import ListProduct from '../../../src/Components/List-Product';

function ProductPage() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await fetch(`https://api.lafutavn.store/api/v1/categories/`);
                const categoriesData = await categoriesResponse.json();
                setCategories(categoriesData);

                if (id) {
                    const productsResponse = await fetch(`https://api.lafutavn.store/api/v1/products/category/${id}`);
                    const productsData = await productsResponse.json();
                    setProducts(productsData);
                } else {
                    const allProductsResponse = await fetch(`https://api.lafutavn.store/api/v1/products/`);
                    const allProductsData = await allProductsResponse.json();
                    setProducts(allProductsData);
                }

                setLoading(false);
            } catch (error) {
                console.error('Lỗi:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='product-page'>
            <Header />
            <div className="container my-5">
                <div className="product">
                    <ul className="category">
                        {categories.map((item, index) => (
                            <li key={index}>
                                <NavLink to={`/danh-muc/${item.id}`}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>

                    <ListProduct products={products} />
                </div>
            </div>
        </div>
    );
}

export default ProductPage;
