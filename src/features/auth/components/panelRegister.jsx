import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { newPostUser } from "../../../redux/action";


function PanelRegister() {
    const redVariant = "danger";
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        email: "",
        contraseña: "",
    });

    const [error, setError] = useState(null);

    const handleClose = () => {
        setShow(false);
        setError(null);
        setFormData({
            nombre: "",
            email: "",
            contraseña: "",
            direccion: "",
            
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
        console.log("Submitting form data:", formData);

        try {
            const resultAction = await dispatch(newPostUser(formData));
            if (resultAction?.payload) {
                handleClose();
                navigate("/");
            } else {
                setError("Credenciales inválidas.");
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            setError("Ocurrió un error al registrarse. Intenta nuevamente.");
        }
    };

    return (
        <>
            <a
                onClick={handleShow}
                className="text-primary"
                style={{ cursor: "pointer", fontWeight: 500 }}
            >
                Sign up
            </a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form onSubmit={handleSubmit}>

                        {/* 
                        <div className="d-flex align-items-center my-3">
                            <div className="flex-grow-1 border-bottom"></div>
                            <span className="mx-3 text-muted ">OR</span>
                            <div className="flex-grow-1 border-bottom"></div>
                        </div> */}

                        <Form.Group className="mb-3" controlId="formBasicNombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="nombre"
                                placeholder="Ingresá tu nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicDireccion">
                            <Form.Label>Dirección</Form.Label>
                            <Form.Control
                                type="direccion"
                                placeholder="Ingresá tu direccion"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

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
                            <Button  className="w-100" type="submit" variant="danger"  >
                                Sign up
                            </Button>
                        </div>
                    </Form>



                </Modal.Body>
            </Modal>
        </>
    );
}

export default PanelRegister;
