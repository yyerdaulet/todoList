import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [role,setRole] = useState("MANAGER");
    const [password,setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async () => {

        try {
        await axios.post("http://localhost:8080/register", {
            name,
            email,
            role,
            password
        });

        navigate("/login")
        }catch(error) {
            console.error(error);

        }



    };

    return (
            <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                            <form>


                              <p class="text-center">or:</p>


                              <div data-mdb-input-init class="form-outline mb-4">
                                <input type="text" id="registerName" class="form-control"
                                 placeholder="Name"
                                             onChange={(e) => setName(e.target.value)}
                                 />

                              </div>


                              <div data-mdb-input-init class="form-outline mb-4">
                                <input type="email" id="registerEmail" class="form-control"
                                        placeholder="Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                 />

                              </div>


                            <div data-mdb-input-init class="form-outline mb-4">
                                <select class="form-select" aria-label="Default select example" value={role} onChange = {(e) => setRole(e.target.value)}>
                                    <option value="MANAGER">MANAGER</option>
                                    <option value="ASSIGNEE">ASSIGNEE</option>

                                    </select>

                                    </div>


                              <div data-mdb-input-init class="form-outline mb-4">
                                <input type="password" id="registerPassword" class="form-control"
                                 placeholder="Password"
                                 onChange={(e) => setPassword(e.target.value)}
                                 />

                              </div>






                              <div class="form-check d-flex justify-content-center mb-4">
                                <input class="form-check-input me-2" type="checkbox" value="" id="registerCheck" checked
                                  aria-describedby="registerCheckHelpText" />
                                <label class="form-check-label" for="registerCheck">
                                  I have read and agree to the terms
                                </label>
                              </div>


                              <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-3" onClick={handleRegister}>Sign in</button>
                            </form>


        </div>
    );
}