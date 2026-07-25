import { useState, type FormEvent } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "400px" }} className="py-5">
      <h2 className="brand-wordmark mb-4">RESET PASSWORD</h2>

      {submitted ? (
        <Alert variant="success">
          If that email is registered, a reset link has been sent. Check your
          inbox.
        </Alert>
      ) : (
        <>
          <p className="text-stone mb-4" style={{ fontSize: "0.9rem" }}>
            Enter your email and we'll send you a link to reset your password.
          </p>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="tag-label">Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ borderRadius: 0 }}
              />
            </Form.Group>
            <Button type="submit" className="btn-ink w-100" disabled={loading}>
              {loading ? "SENDING..." : "SEND RESET LINK"}
            </Button>
          </Form>
        </>
      )}

      <p className="mt-3 font-mono" style={{ fontSize: "0.8rem" }}>
        <Link to="/login">Back to login</Link>
      </p>
    </Container>
  );
};

export default ForgotPassword;
