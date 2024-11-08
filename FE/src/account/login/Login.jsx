import './Login.css'
import './../../index.css'
import InputBox from '../../assets/inputBox'
import Button from '../../assets/Button'

function Login() {
    return (
        <div className="login">
            <div className="background">
            </div>
            <div className="container">
                <div className="login-title text-center text-8xl font-dancing ">Login Page</div>
                <div className="form-container-login">
                    <form className='login-form' action="">
                        <div className="box-container-login">
                            <InputBox id='userName' label='Enter email/phone' tyope='text' />
                            <InputBox id='password' label='Enter password' type='password' />
                            <div className="forget-password w-full flex justify-between items-center ">
                                <div className="flex justify-center items-center pl-1 pr-1">
                                    <input type="checkbox" id='rmb-checkbox' default='true' />
                                    <label htmlFor="rmb-checkbox" className='pl-2'>Remember me?</label>
                                </div>
                                <a href="#">Forget password ?</a>
                            </div>
                        </div>
                        <div className="foot-panel w-full flex justify-center items-center flex-col">
                            <Button type='submit' content='login' />
                            <div className="register-panel w-full flex justify-center mt-2">
                                <p>Don't have an account?</p>
                                <a href="/register" className='ml-3'>Register</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Login