import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header';
import './style.scss';

import { toast, ToastContainer } from 'react-toastify';


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const loginUser = async (username, password) => {
        try {
            setLoading(true);
            const response = await fetch('https://api.lafutavn.store/api/v1/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const user = data.user;
                localStorage.setItem('user', JSON.stringify(user));
                toast.success('Đăng nhập thành công.');
                setTimeout(() => {
                    window.location.href = '/';
                }, 2000);
            } else {
                console.error('Đăng nhập thất bại', data.error);
                setError(data.error || 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Lỗi khi gửi yêu cầu đăng nhập', error);
            setError('Đã xảy ra lỗi, vui lòng thử lại sau');
        } finally {
            setLoading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (username.trim() === '') {
            document.getElementById('usernameErr').innerHTML = 'Vui lòng nhập tên đăng nhập';
        } else {
            document.getElementById('usernameErr').innerHTML = '';
        }
        if (password === '') {
            document.getElementById('passwordErr').innerHTML = 'Vui lòng nhập mật khẩu';
        } else {
            document.getElementById('passwordErr').innerHTML = '';
        }

        if (username.trim() !== '' && password.trim() !== '') {
            loginUser(username, password);
        }

    };

    return (
        <div className="login-page">
            <Header />
            <div className="container">
                <h3>Đăng Nhập</h3>

                <form className="form-custom" onSubmit={handleSubmit}>
                    <div className="form-group mb-3">
                        <label htmlFor="username">Tên Đăng Nhập</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <span className="err" id='usernameErr'></span>
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="password">Mật Khẩu</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="err" id='passwordErr'></span>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-group my-3">
                        <button type="submit" className="btn-custom" disabled={loading}>
                            {loading ?
                                <div className="spinner-grow spinner-grow-sm" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                                :
                                'Đăng Nhập'
                            }
                        </button>
                    </div>

                    <p>
                        Bạn chưa có tài khoản ?{' '}
                        <Link to="/dang-ky">Đăng Ký Ngay</Link>
                    </p>
                </form>
            </div>
            <ToastContainer />
        </div>
    );
}

export default LoginPage;
