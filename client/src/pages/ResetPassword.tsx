import { useState, type FormEvent } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      await axiosInstance.put(`/auth/reset-password/${token}`, { password });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "400px" }} className="py-5">
      <h2 className="brand-wordmark mb-4">SET NEW PASSWORD</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label className="tag-label">New Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            style={{ borderRadius: 0 }}
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label className="tag-label">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            minLength={6}
            style={{ borderRadius: 0 }}
          />
        </Form.Group>
        <Button type="submit" className="btn-ink w-100" disabled={loading}>
          {loading ? "RESETTING..." : "RESET PASSWORD"}
        </Button>
      </Form>
      <p className="mt-3 font-mono" style={{ fontSize: "0.8rem" }}>
        <Link to="/login">Back to login</Link>
      </p>
    </Container>
  );
};

export default ResetPassword;
