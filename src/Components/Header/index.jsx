import './style.scss'
import logo from '../../../public/images/logo.png';
import { Link, NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

function Header() {

    //gọi api lấy danh sách category
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await fetch('https://api.lafutavn.store/api/v1/categories');
                const responseJson = await response.json();
                setCategories(responseJson);
            } catch (error) {
                console.error('Lỗi:', error);
            }
        };
        getCategories();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast.success('Đăng xuất thành công.');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }

    const handleIconBar = () => {
        const iconBar = document.querySelector('.icon-bar');
        const headerMenuMobile = document.querySelector('.header__menu-mobile');
        const overlay = document.querySelector('.overlay');

        iconBar.classList.toggle('active');
        headerMenuMobile.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    const userInfor = JSON.parse(localStorage.getItem('user'));

    return (
        <header className="header">
            {/*header pc */}
            <div className="header__pc">
                <div className="header__top">
                    <div className="container">

                        <div className="header__logo">
                            <Link to="/"><img src={logo} alt="logo" /></Link>
                        </div>
                        <div className="header__search">
                            <input type="text" placeholder="Tìm kiếm sản phẩm" className='searchInput' />
                            <button type="submit"><box-icon name='search-alt-2'></box-icon></button>
                            <div className="searchResult">
                            </div>
                        </div>
                        <div className="header__other">
                            <div className="header__other-cart">
                                <box-icon name='shopping-bags' type='solid' ></box-icon>
                                <span>0</span>
                            </div>
                            <div className="header__other-user">
                                <box-icon name='user' type='solid'></box-icon>
                                {userInfor ?
                                    <div className="dropdown">
                                        <p className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            {userInfor.username}
                                        </p>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><Link className="dropdown-item" to="/thong-tin-tai-khoan">Thông Tin Tài Khoản</Link></li>
                                            <li><Link className="dropdown-item" to="/lich-su-mua-hang">Lịch Sử Mua Hàng</Link></li>
                                            <li><Link className="dropdown-item" onClick={handleLogout}>Đăng Xuất</Link></li>
                                        </ul>
                                    </div>
                                    :
                                    <div className="dropdown">
                                        <p className="dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                            Tài Khoản
                                        </p>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li><Link className="dropdown-item" to="/dang-ky">Đăng Ký</Link></li>
                                            <li><Link className="dropdown-item" to="/dang-nhap">Đăng Nhập</Link></li>
                                        </ul>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <ul className="header__menu">
                    <div className="container">
                        <li>
                            <NavLink to="/" >Trang Chủ</NavLink>
                        </li>
                        <li>
                            <NavLink to="/gioi-thieu" >Giới Thiệu</NavLink>
                        </li>

                        {/*dropdown bootstrap*/}
                        <li className="parent-menu">
                            <NavLink to='/san-pham'>Sản Phẩm <box-icon name='chevron-down' color="white"></box-icon></NavLink>
                            <ul className="sub-menu">
                                {categories.map((category, id) => (
                                    <li key={id}><Link to={`/danh-muc/${category.id}`}>{category.name}</Link></li>
                                ))}

                            </ul>
                        </li>

                        <li>
                            <NavLink to="/tin-tuc" >Tin Tức</NavLink>
                        </li>
                        <li>
                            <NavLink to="/lien-he" >Liên Hệ</NavLink>
                        </li>
                        <li>
                            <NavLink to="/tuyen-dung" >Tuyển Dụng</NavLink>
                        </li>
                    </div>
                </ul >
            </div >

            {/*header mobile */}
            <div className="header__mobile" >
                <div className="container">
                    <div className="icon-bar" onClick={handleIconBar}>
                        <box-icon name='menu' color="#fff"></box-icon>
                        <ul className="header__menu-mobile">
                            <li>
                                <NavLink to="/" >Trang Chủ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/gioi-thieu" >Giới Thiệu</NavLink>
                            </li>
                            {/*dropdown bootstrap*/}
                            <li className="parent-menu dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Sản Phẩm
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link className="dropdown-item" to="san-pham">Sản Phẩm</Link></li>
                                    <li><Link className="dropdown-item" to="chi-tiet-san-pham">Chi Tiết Sản Phẩm</Link></li>
                                </ul>
                            </li>

                            <li>
                                <NavLink to="/tin-tuc" >Tin Tức</NavLink>
                            </li>
                            <li>
                                <NavLink to="/lien-he" >Liên Hệ</NavLink>
                            </li>
                            <li>
                                <NavLink to="/tuyen-dung" >Tuyển Dụng</NavLink>
                            </li>
                            <div className="close-menu">
                                <box-icon name='x' color="#fff"></box-icon>
                            </div>
                        </ul>
                    </div>
                    <div className="header__icon">
                        <box-icon name='search-alt-2' color="#fff"></box-icon>
                        <box-icon name='shopping-bags' type="solid" color="#fff"></box-icon>
                        <box-icon name='user' color="#fff"></box-icon>
                    </div>
                </div>
            </div >
        </header >
    );
}

export default Header;