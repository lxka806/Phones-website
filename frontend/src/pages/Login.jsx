import { useState } from "react";
import { useAuth } from "../context/auth.context.jsx";

const LogIn = () => {
    const [formData, setFormData] = useState({});
    const {logUser} = useAuth()

    const handleSubmit = async e => {
        e.preventDefault();

        const { target } = e;

        const formData = {
            email: target.email.value,
            password: target.password.value
        };

        await logUser(formData)
    }

    return (
        <section>
            <h1>Log in</h1>

            <div>
                <h2>Fill in the form to log in</h2>

                <form onSubmit={handleSubmit}>
                    <input type="email" name="email" required placeholder="Enter your email" />

                    <input type="password" name="password" required placeholder="Enter your password" />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    )
};

export default LogIn;