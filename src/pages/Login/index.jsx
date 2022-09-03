import './style.css'
import './mobile.css'

import * as React from "react";
import { useNavigate, Link } from 'react-router-dom'


import Header from "../../components/Header";
import Main from "../../components/Main";
import Container from "../../components/Container";
import Footer from "../../components/Footer";


export default function Login () {

    const navigate = useNavigate()
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    })

    const [warning, setWarning] = React.useState({
        show: false,
        message: ''
    });

    const handleChange = (e) => {
        setForm ({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        let users = []

        if(localStorage.getItem('users')) {
            users = JSON.parse(localStorage.getItem('users'))
            const user = users.find(u => u.email === form.email && u.password === form.password)
            
            if(user) {
                localStorage.setItem('token', user.email)
                setWarning({ show: false, message: '' });
                navigate('../loggedUser')
            } else {
                setWarning({ show: true, message: 'Usuário ou senha inválidos!!!' });
            }
        } else {
            setWarning({ show: true, message: 'Nenhum usuário cadastrado!' });
        }setTimeout(() => {
            setWarning({
                show: false,
                message: ''
            });
        }, 3000);
    }

    return (
        <Container>
        <Header />
        
        <h2 className="title__login">Login</h2>

        <form className="form-group" onSubmit={handleSubmit}>
            <fieldset className="form-group__login">
                <label htmlFor="user-email" className="label__text">Usuario</label>
                <i class="bi bi-envelope-fill login__icon"></i>
                <input type="email" 
                id="user-email" 
                className="user-login" 
                placeholder="Digite seu usuario" 
                name="email"
                value={form.email}
                onChange={handleChange}
                />
            </fieldset>

            <fieldset className="form-group__login">
                <label htmlFor="password" className="label__text">Senha</label>
                <i class="bi bi-lock-fill login__icon"></i>
                <input type="password" 
                id="password" 
                className="user-login" 
                placeholder="Digite uma senha segura"
                name="password" 
                value={form.password}
                onChange={handleChange}
                />
            </fieldset>

            <button className="btn-login">Entrar</button>

            {warning.show && <p className='login__failed'>{warning.message}</p>}

            <p className="registe">Não tem uma conta? <Link to="../SinUp" className="registre-count">Cadastre-se</Link></p>

            <p className='form__lgpd'>Coletamos suas informações pessoais para prestar e continuamente melhorar nossos produtos e serviços. Todos os seus dados estão protegidos e não seram divulgador</p>
        </form>
        
        <Footer />
    </Container>
    )
}
 