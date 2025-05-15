import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../../src/context/AuthContext";
import { FaGoogle, FaEnvelope, FaLock } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return setError("Lütfen tüm alanları doldurun.");
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Giriş başarısız oldu. E-posta veya şifre hatalı.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    alert("Google ile giriş şu anda geliştirme aşamasındadır.");
  };

  return (
    <Container>
      <LoginContainer>
        <FormPanel>
          <LogoContainer>
            <LogoImage
              src="https://cdn-icons-png.flaticon.com/512/2991/2991231.png"
              alt="Acil Yardım Logo"
            />
            <LogoText>Acil Yardım</LogoText>
          </LogoContainer>

          <Title>Giriş Yap</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>
                <FaEnvelope />
                <span>E-posta</span>
              </Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresiniz"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>
                <FaLock />
                <span>Şifre</span>
              </Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifreniz"
                required
              />
            </FormGroup>

            <ForgotPassword to="/forgot-password">
              Şifremi Unuttum
            </ForgotPassword>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            </SubmitButton>
          </Form>

          <Divider>
            <DividerLine />
            <DividerText>veya</DividerText>
            <DividerLine />
          </Divider>

          <GoogleButton type="button" onClick={handleGoogleSignIn}>
            <FaGoogle />
            <span>Google ile Giriş Yap</span>
          </GoogleButton>

          <RegisterPrompt>
            Hesabınız yok mu?{" "}
            <RegisterLink to="/register">Kayıt Ol</RegisterLink>
          </RegisterPrompt>
        </FormPanel>

        <ImagePanel>
          <ImageOverlay>
            <WelcomeMessage>Hoş Geldiniz</WelcomeMessage>
            <WelcomeText>
              Afet ve acil durumlarda yardım ağına katılın. Birlikte daha
              güçlüyüz.
            </WelcomeText>
          </ImageOverlay>
        </ImagePanel>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 140px);
  padding: 20px;
`;

const LoginContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormPanel = styled.div`
  flex: 1;
  background-color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    padding: 30px 20px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
`;

const LogoImage = styled.img`
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const LogoText = styled.h1`
  font-size: 1.5rem;
  color: var(--primary-color);
`;

const Title = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--text-color);
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: var(--error-color);
  padding: 12px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);

  svg {
    margin-right: 8px;
    color: var(--primary-color);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const ForgotPassword = styled(Link)`
  align-self: flex-end;
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 20px;
  transition: color 0.3s;

  &:hover {
    color: var(--secondary-color);
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--secondary-color);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: #e0e0e0;
`;

const DividerText = styled.span`
  padding: 0 10px;
  color: #757575;
  font-size: 0.9rem;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background-color: white;
  color: #757575;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;

  svg {
    margin-right: 10px;
    color: #4285f4;
  }

  &:hover {
    background-color: #f5f5f5;
  }
`;

const RegisterPrompt = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #757575;
`;

const RegisterLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: var(--secondary-color);
    text-decoration: underline;
  }
`;

const ImagePanel = styled.div`
  flex: 1;
  background-image: url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80");
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(30, 60, 114, 0.85), rgba(42, 82, 152, 0.85));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  text-align: center;
`;

const WelcomeMessage = styled.h2`
  color: white;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const WelcomeText = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  line-height: 1.6;
`;

export default Login;
