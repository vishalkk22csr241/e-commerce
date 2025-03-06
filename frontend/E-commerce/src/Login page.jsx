import  { useState } from "react";
import { auth } from "../firebase"; // Import Firebase auth instance
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const AuthPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState("");

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Signup Successful");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login Successful");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>{isRegistering ? "Sign Up" : "Login"}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleAuth}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isRegistering ? "Sign Up" : "Login"}</button>
      </form>
      <p>
        {isRegistering ? "Already have an account?" : "Don't have an account?"} 
        <span onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: "pointer", color: "blue" }}>
          {isRegistering ? "Login" : "Sign Up"}
        </span>
      </p>
    </div>
  );
};

export default AuthPage;
