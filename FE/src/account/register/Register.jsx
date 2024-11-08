import './Register.css'
import './../../index.css'
import InputBox from '../../assets/inputBox'
import Button from '../../assets/Button'

function Register() {
    return (
        <div className="register">
            <div className="background">
            </div>
            <div className="container">
                <div className="register-title text-center text-8xl font-dancing">Register Page</div>
                <div className="form-container-register">
                    <form className='register-form' action="">
                        <div className="box-container-register">
                            <InputBox id='fullName' label='Enter full-name' type='text' />
                            <InputBox id='email' label='Enter email' type='text' />

                            <select name="" id="sex-select" className="w-100">
                                <option value="" default selected disabled>Gender</option>
                                <option value="">Male</option>
                                <option value="">Female</option>
                            </select>

                            <div id="nums-data">
                                <InputBox id='phone' label='Enter phone' type='number' size='45' />
                                <InputBox id='CCCD' label='Enter CCCD' type='number' size='45' />
                            </div>

                            <InputBox id='address' label='Enter address' type='text' />
                            <InputBox id='password' label='Enter password' type='password' />
                            <InputBox id='reenter-password' label='Re-enter password' type='password' />
                        </div>
                        <div className="foot-panel w-full flex justify-center items-center flex-col">
                            <Button type='submit' content='register' />
                            <div className="register-panel w-full flex justify-center mt-2">
                                <p>Already have an account ?</p>
                                <a href="/login" className='ml-3'>Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )

}
export default Register