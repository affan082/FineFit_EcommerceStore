import { useState, type FormEvent } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "400px" }} className="py-5">
      <h2 className="brand-wordmark mb-4">LOGIN</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="tag-label">Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ borderRadius: 0 }}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="tag-label">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ borderRadius: 0 }}
          />
        </Form.Group>
        <p className="mb-4 font-mono" style={{ fontSize: "0.8rem" }}>
          <Link to="/forgot-password">Forgot password?</Link>
        </p>
        <Button type="submit" className="btn-ink w-100" disabled={loading}>
          {loading ? "Logging in..." : "LOGIN"}
        </Button>
      </Form>
      <p className="mt-3 font-mono" style={{ fontSize: "0.8rem" }}>
        No account? <Link to="/register">Register here</Link>
      </p>
    </Container>
  );
};

export default Login;
