import React, { useState } from "react";
import axios from "axios";
import { useNotification } from "../../hooks/NotificationContext";
import {useClient} from "../../hooks/ClientContext";

const LoginForm = () => {
    const {setToken} = useClient()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const { addNotification } = useNotification();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(""); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Hello world the form is submitted")
        try {
            console.log("trying to get the token")
            const response = await axios.post("http://localhost:8000/api/auth/client-token", {
                email: formData.email,
                password: formData.password,
            });

            setToken(response.data["access_token"])
            addNotification("success", "Login Success", `Welcome back!`);
            window.location.href = "/"; // Redirect after successful login
        }
        catch (error) {
            console.log("we hit the catch block")
            let message=error.response?.data?.detail || error.message
            setErrorMessage(message);
            addNotification("error", "Login Failed", message);
        }

    };

    return (
        <div className={"container"} style={styles.container}>
            {/* Left Half - Illustration */}
            <div style={styles.left}>
                <img
                    src="https://via.placeholder.com/500"
                    alt="Login illustration"
                    style={styles.image}
                />
            </div>

            {/* Right Half - Login Form */}
            <div style={styles.right}>
                <h1 style={styles.header}>Login</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
                <div style={styles.footer}>
                    <a href="/forgot-password" style={styles.link}>
                        Forgot Password?
                    </a>
                    <span style={styles.text}>
                        Don't have an account?{" "}
                        <a href="/register" style={styles.blueText}>
                            Register here
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        height:"100vh"
    },
    left: {
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
    },
    image: {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "cover",
    },
    right: {
        flex: 1,
        padding: "40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        backgroundColor: "#ffffff",
    },
    header: {
        fontSize: "32px",
        color: "#000",
        marginBottom: "20px",
    },
    form: {
        width: "100%",
    },
    field: {
        marginBottom: "15px",
        display: "flex",
        flexDirection: "column",
    },
    label: {
        marginBottom: "5px",
        color: "#000",
        fontWeight: "bold",
    },
    input: {
        padding: "10px",
        fontSize: "16px",
        border: "1px solid #000",
        borderRadius: "4px",
        outline: "none",
    },
    button: {
        marginTop: "20px",
        padding: "10px 15px",
        fontSize: "16px",
        backgroundColor: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    footer: {
        marginTop: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
    },
    text: {
        marginTop: "10px",
        color: "#000",
    },
    link: {
        color: "#007BFF",
        textDecoration: "none",
    },
    blueText: {
        color: "#007BFF",
        fontWeight: "bold",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
};

export default LoginForm;
