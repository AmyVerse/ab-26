# Authentication System - API Integration Guide

## Overview

This authentication system provides a complete solution for managing user authentication in React applications. It consists of three main components: the **AuthProvider** for global state management, the **useAuth** hook for accessing authentication functionality, and the **useAuthForm** hook for managing form state.

---

## Architecture

### AuthContext Provider

The `AuthProvider` component wraps your application and maintains authentication state across all components. It manages three core state variables:

- **user**: Stores the current user object (null when not authenticated)
- **isLoading**: Tracks loading states during async operations
- **isAuthenticated**: Boolean flag indicating login status

On application load, the provider automatically checks for existing authentication by retrieving stored tokens and user data from localStorage. If valid credentials are found, the user is automatically logged in.

```jsx
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Auto-login check on mount
  useEffect(() => {
    const token = authStorage.getToken();
    const savedUser = authStorage.getUser();
    if (token && savedUser) {
      setUser(savedUser);
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  // ... authentication methods
};
```

---

## API Integration Points

### 1. Sign In Endpoint

**Endpoint**: `POST /api/auth/signin`

The sign-in method accepts user credentials and communicates with your backend authentication service. Upon successful authentication, it stores the received token and user data in localStorage, then updates the application state.

```jsx
const signIn = async (credentials) => {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json();
  authStorage.setToken(data.token);
  authStorage.setUser(data.user);
  setUser(data.user);
  setIsAuthenticated(true);
};
```

**Expected Request Body**:

```json
{
  "email": "user@example.com",
  "password": "userPassword123"
}
```

**Expected Response**:

```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "123",
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

### 2. Sign Up Endpoint

**Endpoint**: `POST /api/auth/signup`

The registration method creates new user accounts. Unlike sign-in, it doesn't automatically log the user in—this allows for email verification workflows if needed.

```jsx
const signUp = async (userData) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  const data = await response.json();
  return { success: true, message: data.message };
};
```

**Expected Request Body**:

```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Expected Response**:

```json
{
  "message": "Account created successfully",
  "userId": "123"
}
```

---

### 3. Forgot Password Endpoint

**Endpoint**: `POST /api/auth/forgot-password`

This endpoint initiates the password reset process by sending reset instructions to the user's email. The backend should generate a reset token and send it via email.

```jsx
const forgotPassword = async (email) => {
  const response = await fetch("/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  return { success: true, message: "Reset instructions sent" };
};
```

**Expected Request Body**:

```json
{
  "email": "user@example.com"
}
```

---

### 4. Update Profile Endpoint

**Endpoint**: `PUT /api/auth/profile`

The profile update method allows authenticated users to modify their account information. It requires an authorization token in the request headers.

```jsx
const updateProfile = async (profileData) => {
  const response = await fetch("/api/auth/profile", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authStorage.getToken()}`,
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();
  authStorage.setUser(data.user);
  setUser(data.user);
};
```

**Expected Request Headers**:

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Expected Response**:

```json
{
  "user": {
    "id": "123",
    "name": "Updated Name",
    "email": "updated@example.com",
    "avatar": "https://..."
  }
}
```

---

### 5. Sign Out

The sign-out method is entirely client-side—it clears all stored authentication data and resets the application state. If your backend requires logout notification, add an API call here.

```jsx
const signOut = () => {
  authStorage.clear();
  setUser(null);
  setIsAuthenticated(false);
};
```

---

## Form Management Hook

The `useAuthForm` hook simplifies form handling for authentication interfaces. It provides reactive form state, error management, and field-level validation feedback.

```jsx
export const useAuthForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-clear errors when user types
  const updateField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };
};
```

**Key Features**:

- Automatic error clearing when fields are modified
- Centralized form state management
- Loading state tracking during submission
- Easy form reset functionality

---

## Usage Patterns

### Consuming the Auth Hook

```jsx
const { user, isAuthenticated, signIn, signOut } = useAuth();

// Check authentication status
if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

// Display user info
return <p>Welcome, {user.name}</p>;
```

### Using the Form Hook

```jsx
const { formData, errors, updateField, setFieldError } = useAuthForm({
  email: "",
  password: "",
});

// In your JSX
<input
  value={formData.email}
  onChange={(e) => updateField("email", e.target.value)}
/>;
{
  errors.email && <span>{errors.email}</span>;
}
```

---

## Error Handling

All API methods follow a consistent error handling pattern, returning objects with `success` and `error` properties:

```javascript
const result = await signIn(credentials);

if (result.success) {
  // Handle success - user is logged in
  navigate("/dashboard");
} else {
  // Handle error - display to user
  setFieldError("general", result.error);
}
```

---

## Storage Management

Authentication data is persisted using the `authStorage` utility, which wraps localStorage operations:

- `authStorage.setToken(token)` - Store JWT token
- `authStorage.getToken()` - Retrieve stored token
- `authStorage.setUser(user)` - Store user object
- `authStorage.getUser()` - Retrieve user object
- `authStorage.clear()` - Remove all auth data

---

## Security Considerations

1. **Token Storage**: Tokens are stored in localStorage. For enhanced security, consider httpOnly cookies.
2. **HTTPS Only**: Always use HTTPS in production to protect credentials in transit.
3. **Token Expiration**: Implement token refresh logic for long-lived sessions.
4. **Authorization Headers**: All authenticated requests include the Bearer token.

---

## Integration Checklist

- [ ] Replace placeholder API endpoints with your actual backend URLs
- [ ] Implement corresponding backend routes for each endpoint
- [ ] Configure CORS if frontend and backend are on different domains
- [ ] Set up JWT token generation and validation on the backend
- [ ] Implement email service for password reset functionality
- [ ] Add token refresh logic for extended sessions
- [ ] Configure error messages to match your backend responses
