import axios from 'axios';
import Carousel from "../../Components/Carousel";
import Header from "../../Components/Header";
import { useEffect, useState } from 'react';
import './style.scss';
import ListProduct from "../../Components/List-Product";
import b1 from '../../../public/images/b1.jpg';

function HomePage() {

    const [products, setProducts] = useState([]);
    const [hotProducts, setHotProducts] = useState([]);

    useEffect(() => {
        axios.get('https://api.lafutavn.store/api/v1/products/')
            .then(response => {
                setProducts(response.data);

                const hotProducts = response.data.filter(product => product.hot === 1);
                setHotProducts(hotProducts);

                //sản phẩm mới xếp theo id lấy 5 sp
                const newProducts = response.data.sort((a, b) => b.id - a.id).slice(0, 5);
                setProducts(newProducts);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    return (
        <div className="home-page">
            <Header />
            <Carousel />
            <section className="home_other">
                <div className="container">
                    <div className="other-item">
                        <img src="https://tleejewelry.vn/wp-content/uploads/2022/06/icon4.png" alt="icon1" />
                        <p>Freeship đơn hàng từ 99k</p>
                    </div>
                    <div className="other-item">
                        <img src="https://tleejewelry.vn/wp-content/uploads/2022/06/icon6.png" alt="icon2" />
                        <p>Ship COD toàn quốc</p>
                    </div>
                    <div className="other-item">
                        <img src="https://tleejewelry.vn/wp-content/uploads/2022/06/icon3.png" alt="icon3" />
                        <p>Đổi trả chỉ cần số điện thoại</p>
                    </div>
                    <div className="other-item">
                        <img src="https://tleejewelry.vn/wp-content/uploads/2022/06/icon1.png" alt="icon4" />
                        <p>Hoàn tiền trong vòng 24h</p>
                    </div>
                </div>
            </section>

            <section className="home_hot">
                <div className="container">
                    <img src={b1} alt="" width="100%" />
                    <ListProduct products={hotProducts} />
                </div>
            </section>

            <section className="home_new">
                <div className="container">
                    <h2>Sản phẩm mới</h2>
                    <ListProduct products={products} />
                </div>
            </section>

        </div>
    );
}

export default HomePage;