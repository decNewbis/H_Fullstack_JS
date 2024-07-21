import { useState } from 'react';

export const LoginForm2 = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      setError('');
      onLogin({ username, password });
    } else {
      setError('Username and password are required');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          data-testid="usernameInput"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          data-testid="passwordInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button data-testid="submitButton" type="submit">Login</button>
      {error && <p data-testid="errorMessage">{error}</p>}
    </form>
  );
};
