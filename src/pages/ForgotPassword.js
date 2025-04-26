import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Hook để điều hướng

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const response = await axios.post("http://localhost:8080/api/auth/reset-password", {
                email,
                phone,
                newPassword,
            });
            setMessage(response.data || "Password has been reset successfully.");
            // Điều hướng về trang login sau 2 giây
            setTimeout(() => navigate("/login"), 1000);
        } catch (err) {
            setMessage(err.response?.data || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ForgotPassword-pages">
            <div className="containerr">
                <div>
                    <Link to="/login">Back to Login</Link>
                </div>
                <div className="forgot-password">

                    <div className="forgot-password__content">
                        <h1>Reset Password</h1>
                        {message && (
                            <p style={{ color: message.includes("successfully") ? "green" : "red" }}>
                                {message}
                            </p>
                        )}

                        <form onSubmit={handleForgotPassword}>
                            <div className="forgot-password__box">
                                <label htmlFor="email">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Nhập email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="forgot-password__box">
                                <label htmlFor="phone">Phone:</label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Nhập SDT"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="forgot-password__box">
                                <label htmlFor="newPassword">New Password:</label>
                                <input
                                    type="password"
                                    id="newPassword"
                                    placeholder="Nhập password mới"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>

                            <button type="submit" className="login__button" disabled={loading}>
                                {loading ? "Processing..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
