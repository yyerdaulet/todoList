import { useState } from "react";
import { useNavigate } from "react-router-dom"
import api from "../api"


function Login( { setIsAuth }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleLogin = async () => {

        try{
        const response = await api.post(
            "/login",
            {email,password}
            );

            localStorage.setItem("id",response.data.id);
            localStorage.setItem("token", response.data.jwt);
            const id = response.data.id;

            const hasProfile = await api.get(
                `/login/${id}/check`
                )
            setIsAuth(true);
            if(hasProfile.data){
                navigate(`/profiles/${id}`)
                }
            else{
                navigate(`/profiles`)
                }


        }catch(error){
            console.error(error);
            }


    };

    return (
        <div class="w-40 p-3 h-50 d-inline-block position-absolute top-50 start-50 translate-middle">

            <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
              <li class="nav-item" role="presentation">
                <a class="nav-link active" id="tab-login" data-mdb-pill-init href="#pills-login" role="tab"
                  aria-controls="pills-login" aria-selected="true"s>Login</a>
              </li>
              <li class="nav-item" role="presentation">
                <a class="nav-link" id="tab-register" data-mdb-pill-init href="#pills-register" role="tab"
                  aria-controls="pills-register" aria-selected="false">Register</a>
              </li>
            </ul>



            <div class="tab-content">
              <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                <form>
                  <div class="text-center mb-3">

                  </div>




                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="email" id="loginName" class="form-control" placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}/>
                  </div>


                  <div data-mdb-input-init class="form-outline mb-4">
                    <input type="password" id="loginPassword" class="form-control" type="password"
                        placeholder="Password"
                         onChange={(e) => setPassword(e.target.value)} />

                  </div>


                  <div class="row mb-4">
                    <div class="col-md-6 d-flex justify-content-center">

                      <div class="form-check mb-3 mb-md-0">
                        <input class="form-check-input" type="checkbox" value="" id="loginCheck" checked />
                        <label class="form-check-label" for="loginCheck"> Remember me </label>
                      </div>
                    </div>

                    <div class="col-md-6 d-flex justify-content-center">

                      <a href="#!">Forgot password?</a>
                    </div>
                  </div>


                  <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-block mb-4" onClick={handleLogin} >Sign in</button>

                  <div class="text-center">
                    <p>Not a member? <a href="/register"  >Register</a></p>
                  </div>
                </form>
              </div>

              </div>
            </div>





        );

    }

export default Login;