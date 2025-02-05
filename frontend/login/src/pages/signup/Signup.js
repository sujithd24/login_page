import React, { useState } from 'react';
import './Signup.css';

function SignupPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        validateField(name, value);
    };

    const validateField = (fieldName, value) => {
        let error = '';
        
        if (fieldName === 'username') {
            if (value.trim() === '') {
                error = 'Username is required.';
            } else if (value.length < 4) {
                error = 'Username must be at least 4 characters.';
            }
        } else if (fieldName === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            error = 'Invalid email format.';
        } else if (fieldName === 'password') {
            if (value.length < 8) {
                error = 'Password must be at least 8 characters.';
            } else if (!/[A-Z]/.test(value)) {
                error = 'Password must contain at least one uppercase letter.';
            } else if (!/[a-z]/.test(value)) {
                error = 'Password must contain at least one lowercase letter.';
            } else if (!/[0-9]/.test(value)) {
                error = 'Password must contain at least one number.';
            } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
                error = 'Password must contain at least one special character.';
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.values(errors).every(error => error === '') &&
            Object.values(formData).every(field => field.trim() !== '')) {
            alert('Form submitted successfully!');
            // Here, you can handle the form submission, e.g., send data to a backend.
        } else {
            alert('Please fix the errors in the form.');
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Welcome Makkalae !</h2>
                <p>Please enter your details</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                        {errors.username && <span className="error">{errors.username}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                        {errors.password && <span className="error">{errors.password}</span>}
                    </div>
                    <button type="submit" className="btn-submit">Sign Up</button>
                </form>
                <p>Already have an account? <a href="/login">Log In</a></p>
            </div>
        </div>
    );
}

export default SignupPage;
