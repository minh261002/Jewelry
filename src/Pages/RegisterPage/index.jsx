import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.scss';

function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const registerUser = async (formData) => {
        try {
            setLoading(true);

            const response = await fetch('https://api.lafutavn.store/api/v1/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const responseJson = await response.json();

            if (response.ok) {
                toast.success('Đăng ký thành công.');
                setTimeout(() => {
                    window.location.href = '/dang-nhap';
                }, 2000);
            } else {
                if (responseJson.error) {
                    console.error('Đăng ký thất bại', responseJson.error);
                    setError(responseJson.error);
                } else {
                    setError('Đăng ký thất bại');
                }
            }
        } catch (error) {
            setError('Đã xảy ra lỗi, vui lòng thử lại sau.');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.username.trim() === '') {
            document.getElementById('usernameErr').innerHTML = 'Vui lòng nhập tên đăng nhập';
        } else {
            document.getElementById('usernameErr').innerHTML = '';
        }
        if (formData.email.trim() === '') {
            document.getElementById('emailErr').innerHTML = 'Vui lòng nhập email';
        } else {
            document.getElementById('emailErr').innerHTML = '';
        }
        if (formData.password === '') {
            document.getElementById('passwordErr').innerHTML = 'Vui lòng nhập mật khẩu';
        } else {
            document.getElementById('passwordErr').innerHTML = '';
        }
        if (formData.password2 === '') {
            document.getElementById('password2Err').innerHTML = 'Vui lòng nhập lại mật khẩu';
        } else if (formData.password2 !== formData.password) {
            document.getElementById('password2Err').innerHTML = 'Mật khẩu không khớp';
        } else {
            document.getElementById('password2Err').innerHTML = '';
        }

        if (formData.username.trim() !== '' && formData.email.trim() !== '' && formData.password.trim() !== '' && formData.password2.trim() !== '' && formData.password === formData.password2) {
            registerUser(formData);
        }
    };

    return (
        <div className="register-page">
            <Header />
            <div className="container">
                <h3>Đăng Ký</h3>

                <form className="form-custom" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Tên Đăng Nhập</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <span className="err" id="usernameErr"></span>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="email">Địa Chỉ Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <span className="err" id="emailErr"></span>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Mật Khẩu</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span className='err' id='passwordErr'></span>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password2">Nhập Lại Mật Khẩu</label>
                        <input
                            type="password"
                            name="password2"
                            id="password2"
                            className="form-control"
                            value={formData.password2}
                            onChange={handleChange}
                        />
                        <span className='err' id='password2Err'></span>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group my-3">
                        <button type="submit" className="btn-custom" disabled={loading}>
                            {loading ?
                                <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                : 'Đăng Ký'
                            }
                        </button>
                    </div>

                    <p>
                        Bạn đã có tài khoản ? <Link to="/dang-nhap">Đăng Nhập Ngay</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default RegisterPage;
