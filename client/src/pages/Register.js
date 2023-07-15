import { useState } from 'react';
import '../App.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

export const Register = () => {
  const [showCreateUser, setShowCreateUser] = useState(false);

  const handleToggle = () => {
    setShowCreateUser(!showCreateUser);
  };

  return (
    <div className="auth">
      {!showCreateUser ? (
        <Login handleToggle={handleToggle} />
      ) : (
        <CreateUser handleToggle={handleToggle} />
      )}
    </div>
  );
};

// Login component
const Login = ({ handleToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [, setCookie] = useCookies(['access_token']);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:4000/auth/login", { username, password });

      console.log(res);
      setCookie('access_token', res.data.token);
      window.localStorage.setItem("userID", res.data.userID);
      navigate('/');
      alert('User Logged in');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='box-1'>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"LogIn"}
        onSubmit={onSubmit}
      />
      <button onClick={handleToggle} className="btn btn-primary">Create User</button>
    </div>
  );
};

// CreateUser component
const CreateUser = ({ handleToggle }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:4000/auth/register", { username, password });
      alert('Registration completed! Now login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='box-1'>
      <Form
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        label={"CreateAccount"}
        onSubmit={onSubmit}
      />
      <div> <button type="submit" onClick={handleToggle} className="btn btn-primary">Log In</button></div>
     
    </div>
  );
};

// Form component
const Form = ({ username, setUsername, password, setPassword, label, onSubmit }) => {
  return (
    <div className="box-1">
      <h1>{label}</h1>
      <form className='createUser' onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputUsername" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Register;
