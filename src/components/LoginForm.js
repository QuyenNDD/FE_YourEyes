// export default function LoginForm() { return <form>Login Form</form>; }
const LoginForm = () => {
    return (
        <section className="Login-page">
            <ul>
                <li><a href="/Login">Đăng nhập</a></li>
                <li><a href="/Register">Đăng kí</a></li>
            </ul>
        </section>
    );

};
export default LoginForm;