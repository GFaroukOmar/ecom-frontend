import React, { useState } from "react";
import axios from "axios";
import { useNotification } from "../../hooks/NotificationContext";
import {useClient} from "../../hooks/ClientContext";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const {setToken} = useClient()
    const { addNotification } = useNotification();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrorMessage(""); // Clear error message on input change
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/auth/register-client", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
            });
            setToken(response.data["access_token"])
            addNotification("success", "Registration Success", "Please confirm your email.");
            window.location.href = `/confirm?email=${formData.email}`;
        } catch (error) {
            addNotification("error", "Registration Error", error.response?.data?.detail || "An error occurred.");
        }
    };

    const redirectToLogin = () => {
        window.location.href = "/login"; // Navigate to the login page
    };

    return (
        <div className="container" style={styles.container}>
            {/* Left Half - Image */}
            <div style={styles.left}>
                <img
                    src="https://via.placeholder.com/500"
                    alt="Registration illustration"
                    style={styles.image}
                />
            </div>

            {/* Right Half - Form */}
            <div style={styles.right}>
                <h1 style={styles.header}>Register</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div className="d-flex justify-content-between">
                        <div style={styles.field}>
                            <label style={styles.label}>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                style={styles.input}
                                required
                            />
                        </div>
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
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
                            required
                        />
                    </div>
                    <div style={styles.field}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                    <button type="submit" style={styles.button}>
                        Register
                    </button>
                </form>
                <div style={styles.footer}>
                    <p style={styles.text}>Already have an account?</p>
                    <button onClick={redirectToLogin} style={styles.linkButton}>
                        Go to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
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
        marginBottom: "10px",
        color: "#000",
    },
    linkButton: {
        padding: "10px 15px",
        fontSize: "16px",
        backgroundColor: "#007BFF",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    error: {
        color: "red",
        marginTop: "10px",
    },
};

export default RegistrationForm;
