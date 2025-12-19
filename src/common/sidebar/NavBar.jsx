import { useState, useRef, useEffect } from "react";

const NavBar = () => {
    const [openUser, setOpenUser] = useState(false);
    const userRef = useRef(null);

    useEffect(() => {
        const onClickOutside = (e) => {
            if (userRef.current && !userRef.current.contains(e.target)) {
                setOpenUser(false);
            }
        };
        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light border border-top py-1">
            <a className="navbar-brand ms-3" href="#">
                Navbar
            </a>

            <button
                className="navbar-toggler me-3"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            <div
                className="collapse navbar-collapse justify-content-end me-3"
                id="navbarNav"
            >
                <ul className="navbar-nav align-items-center gap-4">

                    <li className="nav-item ">
                        <i class="bi bi-chat-dots fs-5"></i>
                    </li>

                    <li className="nav-item">
                       <i class="bi bi-bell fs-5"></i>
                    </li>

                    <li className="nav-item">
                       <i class="bi bi-question-circle fs-5"></i>
                    </li>

                    {/* USUARIO */}
                    <li className="nav-item dropdown me-3">
                        <button
                            className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                            onClick={() => setOpenUser(!openUser)}
                            aria-expanded={openUser}
                        >
                            <img
                                src="https://i.pravatar.cc/28"
                                width="28"
                                height="28"
                                className="rounded-circle"
                                alt="avatar"
                            />
                            <span className="fw-semibold">Pablo</span>
                        </button>

                        <ul
                            className={`dropdown-menu dropdown-menu-end ${openUser ? "show" : ""}`}
                        >
                            <li><button className="dropdown-item">Mi perfil</button></li>
                            <li><button className="dropdown-item">Configuración</button></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item text-danger">Cerrar sesión</button></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
