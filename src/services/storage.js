export const signUpUser = (username, email, password) => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);
  
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
  
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
  
    return { success: true, message: 'User registered successfully' };
  };
  
  export const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
  
    if (user) {
      return { success: true, message: 'Login successful' };
    }
  
    return { success: false, message: 'Invalid email or password' };
  };

  
  