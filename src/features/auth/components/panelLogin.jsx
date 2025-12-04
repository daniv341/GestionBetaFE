import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { loginUser } from "../../../redux/action";
import googleLogo from "../../../assets/images/logoGoogle.png";
import facebookLogo from "../../../assets/images/logoFacebook.png";
import PanelRegister from "./panelRegister";
import { Link } from "react-router-dom";

function LoginPanel() {
    const redVariant = "danger";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        contraseña: "",
    });

    const [error, setError] = useState(null);

    const handleClose = () => {
        setShow(false);
        setError(null);
        setFormData({
            email: "",
            contraseña: "",
        });
    };

    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const resultAction = await dispatch(loginUser(formData));
            if (resultAction?.payload) {
                handleClose();
                navigate("/");
            } else {
                setError("Credenciales inválidas. Verifica tu email y contraseña.");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            setError("Ocurrió un error al iniciar sesión. Intenta nuevamente.");
        }
    };

    return (
        <>
            <Button className="btn-danger" onClick={handleShow}>
                LOGIN
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form onSubmit={handleSubmit}>

                        <Button
                            className="mt-3 d-flex align-items-center justify-content-center w-100 mb-3 py-2"
                            type="button"
                            style={{
                                backgroundColor: "transparent",
                                border: "1px solid #d1d1d1ff",
                                color: "#000000ff",
                            }}
                        >
                            <picture>
                                <img
                                    src={facebookLogo}
                                    alt="logo-google"
                                    style={{ width: "20px", height: "20px", marginRight: "8px" }}
                                />
                            </picture>
                            <span>Continue with Facebook</span>
                        </Button>

                        <Button
                            className="mt-3 d-flex align-items-center justify-content-center w-100 mb-3 py-2"
                            type="button"
                            style={{
                                backgroundColor: "transparent",
                                border: "1px solid #d1d1d1ff",
                                color: "#000000ff",
                            }}
                        >
                            <picture>
                                <img
                                    src={googleLogo}
                                    alt="logo-google"
                                    style={{ width: "20px", height: "20px", marginRight: "8px" }}
                                />
                            </picture>
                            <span>Continue with Google</span>
                        </Button>

                        <div className="d-flex align-items-center my-3">
                            <div className="flex-grow-1 border-bottom"></div>
                            <span className="mx-3 text-muted ">OR</span>
                            <div className="flex-grow-1 border-bottom"></div>
                        </div>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Ingresá tu email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                placeholder="Ingresá tu contraseña"
                                name="contraseña"
                                value={formData.contraseña}
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                type="checkbox"
                                label="Mostrar contraseña"
                                className="mt-2"
                                onChange={() => setShowPassword((prev) => !prev)}
                            />
                        </Form.Group>

                        {error && <Alert variant={redVariant}>{error}</Alert>}

                        <div className="d-flex justify-content-center mt-4 mb-3">
                            <Button className="w-100" type="submit" variant="danger">
                                Sign In
                            </Button>
                        </div>

                        <div className="text-center ">
                            <span className="text-muted">
                                Don’t have an account?{" "}
                                    <PanelRegister onClick={handleClose}/>
           
                            </span>
                        </div>
                    </Form>



                </Modal.Body>
            </Modal>
        </>
    );
}

export default LoginPanel;
