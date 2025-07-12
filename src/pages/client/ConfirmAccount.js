import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import {useClient} from "../../hooks/ClientContext";
import {authRoute} from "../../api";
import {useNotification} from "../../hooks/NotificationContext";
const waitingTime=5
const ConfirmEmail = () => {
    const [searchParams] = useSearchParams();
    const [email, setEmail] = useState(searchParams.get("email"));
    const [token, setToken] = useState(searchParams.get("token"));
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [countdown, setCountdown] = useState(waitingTime);
    const [canResend, setCanResend] = useState(false);
    const {addNotification}=useNotification()
    const {client,setClient}=useClient()
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);
    useEffect(() => {
        console.log("email is ",email,"\n token is",token)
        if(email && token){
                authRoute.get(`/confirm_client_email?token=${token}`)
                    .then(response=>{
                        addNotification("success","confirmation success","your account has been confirmed")
                        window.location.href="/"

                }).catch(e=>addNotification("error","Confirmation Error",e.response.data || e.message))
        }
    }, []);

    const resendEmail = async () => {
        setLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await axios.get(
                `http://localhost:8000/api/auth/resend_confirmation_email?email=${email}`, // Update with your backend URL

            );
            setMessage(response.data.message);
            setCountdown(waitingTime);
            setCanResend(false);
        } catch (err) {
            // setError(err.response?.data?.detail || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.header}>Email Confirmation</h2>
                <p style={styles.text}>
                    We've sent a confirmation email to your address. Please check your inbox
                    and click the confirmation link to activate your account.
                </p>
                <p style={styles.text}>
                    If you didn’t receive the email, you can resend the confirmation email below.
                </p>
                <button
                    onClick={resendEmail}
                    style={{
                        ...styles.button,
                        backgroundColor: canResend ? "black" : "gray",
                        cursor: canResend ? "pointer" : "not-allowed",
                    }}
                    disabled={!canResend || loading}
                >
                    {loading ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : canResend ? (
                        "Resend Confirmation Email"
                    ) : (
                        `Resend in ${countdown}s`
                    )}
                </button>

                {/*{message && <p style={styles.success}>{message}</p>}*/}
                {/*{error && <p style={styles.error}>{error}</p>}*/}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
    },
    card: {
        width: "400px",
        padding: "20px",
        backgroundColor: "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
    },
    header: {
        fontSize: "24px",
        marginBottom: "20px",
        color: "#333",
    },
    text: {
        fontSize: "16px",
        marginBottom: "20px",
        color: "#555",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "black",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px",
    },
    success: {
        marginTop: "10px",
        color: "green",
        fontSize: "14px",
    },
    error: {
        marginTop: "10px",
        color: "red",
        fontSize: "14px",
    },
};

export default ConfirmEmail;
