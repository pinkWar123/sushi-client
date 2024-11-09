import './Register.css';
import InputBox from '../../components/InputBox/InputBox';
import Button from '../../components/Button/Button';
import { useState } from 'react';

function Register() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        gender: '',
        phone: '',
        CCCD: '',
        address: '',
        password: '',
        reenterPassword: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form validation logic goes here
        console.log('Form submitted:', formData);
    };

    return (
        <div className="register">
            <div className="background"></div>
            <div className="container">
                <div className="register-title text-center text-8xl font-dancing">Register Page</div>
                <div className="form-container-register">
                    <form className='register-form' onSubmit={handleSubmit}>
                        <div className="box-container-register">
                            <InputBox 
                                id='fullName' 
                                label='Enter full-name' 
                                type='text' 
                                // name='fullName' 
                                // value={formData.fullName}
                                // onChange={handleChange} 
                            />
                            <InputBox 
                                id='email' 
                                label='Enter email' 
                                type='text' 
                                // name='email' 
                                // value={formData.email} 
                                // onChange={handleChange} 
                            />

                            <select
                                name="gender"
                                id="sex-select"
                                className="w-100"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="1">Male</option>
                                <option value="0">Female</option>
                            </select>

                            <div id="nums-data">
                                <InputBox 
                                    id='phone' 
                                    label='Enter phone' 
                                    type='tel'  // Changed to 'tel' to allow phone number formatting
                                    // name='phone' 
                                    // value={formData.phone} 
                                    // onChange={handleChange} 
                                    size={45} 
                                />
                                <InputBox 
                                    id='CCCD' 
                                    label='Enter CCCD' 
                                    type='text' // Changed to 'text' to allow long numbers with leading zeros
                                    // name='CCCD' 
                                    // value={formData.CCCD} 
                                    // onChange={handleChange} 
                                    size={45} 
                                />
                            </div>

                            <InputBox 
                                id='address' 
                                label='Enter address' 
                                type='text' 
                                // name='address' 
                                // value={formData.address} 
                                // onChange={handleChange} 
                            />
                            <InputBox 
                                id='password' 
                                label='Enter password' 
                                type='password' 
                                // name='password' 
                                // value={formData.password} 
                                // onChange={handleChange} 
                            />
                            <InputBox 
                                id='reenter-password' 
                                label='Re-enter password' 
                                type='password' 
                                // name='reenterPassword' 
                                // value={formData.reenterPassword} 
                                // onChange={handleChange} 
                            />
                        </div>
                        <div className="foot-panel w-full flex justify-center items-center flex-col">
                            <Button type='submit' content='Register' />
                            <div className="register-panel w-full flex justify-center mt-2">
                                <p>Already have an account?</p>
                                <a href="/login" className='ml-3'>Login</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
