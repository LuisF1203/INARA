import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword,onAuthStateChanged,signOut} from "firebase/auth";
import { AiOutlineLoading, AiOutlineCheckCircle } from "react-icons/ai";
import { MdOutlineReportGmailerrorred } from "react-icons/md";
import  AdminDashboard  from "../components/AdminDashboard";

function Admin() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [showAdminAlert, setShowAdminAlert] = useState(false);
    const [showLoginAlert, setShowLoginAlert] = useState(false);
    const [adminAlertContent, setAdminAlertContent] = useState({ message: '', color: '', icon: null });
    const [loginAlertContent, setLoginAlertContent] = useState({ message: '', color: '', icon: null });

    const [isSignUp, setIsSignUp] = useState(false); // Nuevo estado para gestionar el modo de registro
    const [pass,setPass]=useState()
    const [validPass,setValidPass]=useState(true);



    const [user,setUser]=useState()


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Usuario ha iniciado sesión
                var uid = user.uid;
                console.log("iniciado sesión");
                console.log(user)
                setUser(user)
                // ...
            } else {
                console.log("no hay sesión");
                // Usuario ha cerrado sesión
                // ...
            }
        });

        // Limpieza al desmontar el componente
        return () => unsubscribe();
    }, []);


    

    const updateAdminAlert = (isAdmin, message) => {
        setShowAdminAlert(true);
        setAdminAlertContent({
            message: message,
            color: isAdmin ? 'green' : 'red',
            icon: isAdmin ? <AiOutlineCheckCircle className="w-5 h-5 inline mr-3" /> : <MdOutlineReportGmailerrorred className="w-5 h-5 inline mr-3" />
        });
    };

    const updateLoginAlert = (loggedIn, message) => {
        setShowLoginAlert(true);
        setShowAdminAlert(false)
        setLoginAlertContent({
            message: message,
            color: loggedIn ? 'green' : 'red',
            icon: loggedIn ? <AiOutlineCheckCircle className="w-5 h-5 inline mr-3" /> : <MdOutlineReportGmailerrorred className="w-5 h-5 inline mr-3" />
        });
    };

    const handleVerifyAdmin = (el) => {
        el.preventDefault();
        const usLoginEmail = el.target.email.value;
        const usLoginPass = el.target.password.value;

        const fetchOrderData = async () => {
            try {
                const docRef = doc(db, "users", "admin");
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    let adminExists = false;
                    Object.entries(docSnap.data()).forEach(element => {
                        if (element[1].email === usLoginEmail) {
                            adminExists = true;
                            setIsAdmin(true);
                            updateAdminAlert(true, "Admin detected.");

                            if(!isSignUp){
                                handleLogin(usLoginEmail, usLoginPass);
                                setTimeout(() => {
                                    updateAdminAlert(true, "Verifying credentials...");
                                    setShowLoginAlert(false)
                                    
                                }, 700);
                            }else{
                                handleSignUp(usLoginEmail, usLoginPass);
                            }
                            
                        }
                    });
                    if (!adminExists) {
                        updateAdminAlert(false, "No admin found with provided credentials.");
                    }
                } else {
                    console.log("No se encontró ningún documento!");
                    updateAdminAlert(false, "No admin data available.");
                }
            } catch (error) {
                console.error("Error al obtener el documento:", error);
                updateAdminAlert(false, "Error fetching admin data.");
            }
        };

        fetchOrderData();
    };

    const handleLogin = (email, password) => {
        setTimeout(() => {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    var user = userCredential.user;
                    updateLoginAlert(true, "Admin verified and logged in successfully.");
                    setLoggedIn(true);
                    setTimeout(() => {
                        setShowLoginAlert(false)
                        showAdminAlert(false)
                    }, 1000);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    setLoggedIn(false)
                    updateLoginAlert(false, "Usuario no existente o credenciales incorrectas.");
                    setTimeout(() => {
                        setShowLoginAlert(false)
                        showAdminAlert(false)
                    }, 5000);
                });
        }, 5000);
    };


    const handleSignUp=(email, password)=>{
        if(validPass){
            setTimeout(() => {
            
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in 
                        var user = userCredential.user;
                        alert("usuario creado con exito")
                        // ...
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(error)
                        alert("error")
                        // ..
                    });
            }, 5000);
        }
    }


    const handleVerifyPass=(el)=>{
        let verPass=el.target.value;
        if(verPass==pass){
            console.log("contraseña valida")
            setValidPass(true)
        }else{
            console.log("invalida")
            setValidPass(false)
        }
    }

    const handlePass=(el)=>{
        setPass(el.target.value)
    }

    const handleSignOut=()=>{
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("sesión cerrada")
            location.reload()
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
    }

    return (
        <>
            {!user?            <div className="flex flex-wrap min-h-screen w-full content-center justify-center bg-gray-200">
                <div className="flex shadow-md">
                    <div className="flex flex-wrap content-center justify-center rounded-l-md bg-white" style={{ width: "24rem", height: "32rem" }}>
                        <div className="w-72">
                            <h1 className="text-xl font-semibold">Welcome back</h1>
                            <small className="text-gray-400">Welcome back! Please enter your details</small>

                            <form onSubmit={handleVerifyAdmin} className="mt-4">
                                <div className="mb-3">
                                    <label className="mb-2 block text-xs font-semibold">Email</label>
                                    <input type="email" name="email" required placeholder="Enter your email" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                                </div>


                                {
                                    isSignUp?
                                    <>
                                    <div className="mb-3">
                                        <label className="mb-2 block text-xs font-semibold">Password</label>
                                        <input type="password" name="password" onChange={handlePass} required placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                                    </div>
                                    <div className="mb-3">
                                        <label className="mb-2 block text-xs font-semibold">Verify Password</label>
                                        <input type="password" name="veriPassword" onChange={handleVerifyPass} required placeholder="*****" className={"block w-full rounded-md border py-1 px-1.5 text-gray-500" + (validPass ? " border-gray-300 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" : " border-red-300 focus:border-red-700 focus:outline-none focus:ring-1 focus:ring-red-700")}  />
                                    </div>
                                    </>:
                                    <div className="mb-3">
                                          <label className="mb-2 block text-xs font-semibold">Password</label>
                                          <input type="password" name="password" required placeholder="*****" className="block w-full rounded-md border border-gray-300 focus:border-purple-700 focus:outline-none focus:ring-1 focus:ring-purple-700 py-1 px-1.5 text-gray-500" />
                                    </div>
                                }


                                {!isSignUp&&
                                    <div className="mb-3 flex flex-wrap content-center">
                                        <a href="#" className="text-xs font-semibold text-purple-700">Forgot password?</a>
                                    </div>
                                }

                                <div className="mb-3">
                                    <button type="submit" className="mb-1.5 block w-full text-center text-white bg-purple-700 hover:bg-purple-900 px-2 py-1.5 rounded-md">{isSignUp?"Crear cuenta":"Iniciar sesión"} </button>
                                </div>

                            </form>

                            <div className="text-center">
                                <span className="text-xs text-gray-400 font-semibold">{isSignUp?"No tienes cuenta?":"Ya tienes cuenta?"}</span>
                                <a href="#" onClick={()=>setIsSignUp(!isSignUp)} className="text-xs font-semibold text-purple-700"> {isSignUp?"Iniciar sesión":"Crear cuenta"}</a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap content-center justify-center rounded-r-md" style={{ width: "24rem", height: "32rem" }}>
                        <img className="w-full h-full bg-center bg-no-repeat bg-cover rounded-r-md" src="https://i.imgur.com/9l1A4OS.jpeg" alt="Admin Page Background"/>
                    </div>
                </div>
            </div>
            :
            <div>
                <AdminDashboard/>
            </div>    
        }





 {showAdminAlert && (
                <div className={`fixed bottom-0 left-4 animate-pulse flex bg-${adminAlertContent.color}-500 rounded-lg p-4 mb-4 text-sm text-white`} role="alert">
                    {adminAlertContent.icon}
                    <div>
                        <span className="font-medium">{adminAlertContent.message}</span>
                    </div>
                </div>
            )}

            {showLoginAlert && (
                <div className={`fixed bottom-0 left-4 animate-pulse flex bg-${loginAlertContent.color}-500 rounded-lg p-4 mb-4 text-sm text-white`} role="alert">
                    {loginAlertContent.icon}
                    <div>
                        <span className="font-medium">{loginAlertContent.message}</span>
                    </div>
                </div>
            )}




        </>
    );
}

export default Admin;
