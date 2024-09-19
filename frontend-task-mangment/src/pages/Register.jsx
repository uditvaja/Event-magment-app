import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom'; 
import './from.css';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/'); 
    } catch (error) {
        console.error('Registration error: ', error.response ? error.response.data : error);
    }
  };

  return (
    <>
    
   
    
    <div className="container">
    <div className="title">Registration</div>
    <div className="content">
      <form onSubmit={handleSubmit}>
        <div className="user-details">

          <div className="input-box">
            <span className="details">Username</span>
            <input type="text"  value={username}
        onChange={(e) => setUsername(e.target.value)} placeholder="Enter your username" required/>
          </div>
          <div className="input-box">
            <span className="details">Email</span>
            <input type="text" value={email}
        onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required/>
          </div>
      
          <div className="input-box">
            <span className="details">Password</span>
            <input type="text"  value={password}
        onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required/>
          </div>
          <div className="input-box">
            <span className="details">Confirm Password</span>
            <input type="text" placeholder="Confirm your password" required/>
          </div>
        </div>
       
        <div className="button">
          <input type="submit"/>
        </div>
      </form>
    </div>
  </div>
</>
  );
};

export default Register;
