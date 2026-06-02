import { useAuth } from "../context/auth.context.jsx";

const SignUp = () => {
    const { signUser } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { target } = e;

        const formData = {
            fullname: target.fullname.value,
            email: target.email.value,
            password: target.password.value
        };

        await signUser(formData);
    };

    return (
        <section>
            <h1>Sign Up</h1>

            <div>
                <h2>Fill in the form to sign up</h2>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="fullname"
                        required
                        placeholder="Enter your fullname"
                    />

                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                    />

                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter your password"
                    />

                    <button type="submit">Submit</button>
                </form>
            </div>
        </section>
    );
};

export default SignUp;