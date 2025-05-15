import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaLock, FaUser, FaPhone } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone || !password || !confirmPassword) {
      return setError("Lütfen tüm alanları doldurun.");
    }

    if (password !== confirmPassword) {
      return setError("Şifreler eşleşmiyor.");
    }

    if (password.length < 6) {
      return setError("Şifre en az 6 karakter olmalıdır.");
    }

    try {
      setError("");
      setLoading(true);
      await register(email, password, {
        displayName: name,
        phone: phone,
        role: "user",
      });
      navigate("/");
    } catch (error) {
      console.error(error);

      // Firebase'den gelen hata mesajlarını Türkçe olarak göster
      if (error.code === "auth/email-already-in-use") {
        setError(
          "Bu e-posta adresi zaten kullanılıyor. Lütfen giriş yapın veya farklı bir e-posta adresi kullanın."
        );
      } else if (error.code === "auth/invalid-email") {
        setError(
          "Geçersiz e-posta adresi. Lütfen doğru bir e-posta adresi girin."
        );
      } else if (error.code === "auth/weak-password") {
        setError("Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin.");
      } else if (error.code === "auth/network-request-failed") {
        setError(
          "Ağ hatası oluştu. Lütfen internet bağlantınızı kontrol edin ve tekrar deneyin."
        );
      } else {
        setError(
          "Kayıt başarısız oldu: " +
            (error.message || "Bir hata oluştu. Lütfen tekrar deneyin.")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <RegisterContainer>
        <FormPanel>
          <Title>Hesap Oluştur</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormRow>
              <FormGroup>
                <Label>
                  <FaUser />
                  <span>Ad Soyad</span>
                </Label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ad ve soyadınız"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>
                  <FaPhone />
                  <span>Telefon</span>
                </Label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Telefon numaranız"
                  required
                />
              </FormGroup>
            </FormRow>

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

            <FormRow>
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

              <FormGroup>
                <Label>
                  <FaLock />
                  <span>Şifre Tekrar</span>
                </Label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Şifrenizi tekrar girin"
                  required
                />
              </FormGroup>
            </FormRow>

            <PrivacyPolicy>
              Kayıt olarak{" "}
              <PolicyLink href="#" target="_blank">
                Kullanım Koşulları
              </PolicyLink>{" "}
              ve
              <PolicyLink href="#" target="_blank">
                {" "}
                Gizlilik Politikası
              </PolicyLink>
              'nı kabul etmiş olursunuz.
            </PrivacyPolicy>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Kayıt Yapılıyor..." : "Kayıt Ol"}
            </SubmitButton>
          </Form>

          <LoginPrompt>
            Zaten hesabınız var mı? <LoginLink to="/login">Giriş Yap</LoginLink>
          </LoginPrompt>
        </FormPanel>

        <InfoPanel>
          <InfoContent>
            <InfoTitle>Acil Yardım Ağına Katılın</InfoTitle>
            <InfoText>
              Acil Yardım platformuna kaydolarak afet durumlarında yardım
              isteyebilir veya ihtiyacı olanlara yardım edebilirsiniz.
            </InfoText>

            <FeaturesList>
              <Feature>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>Yardım taleplerini görüntüleyin</FeatureText>
              </Feature>
              <Feature>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>Gönüllü olarak kaydolun</FeatureText>
              </Feature>
              <Feature>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>Bağış yapın ve takip edin</FeatureText>
              </Feature>
              <Feature>
                <FeatureIcon>✓</FeatureIcon>
                <FeatureText>Yardım talepleri oluşturun</FeatureText>
              </Feature>
            </FeaturesList>
          </InfoContent>
        </InfoPanel>
      </RegisterContainer>
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

const RegisterContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
  min-height: 600px;
  border-radius: var(--border-radius);
  overflow: hidden;
  box-shadow: var(--box-shadow);

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const FormPanel = styled.div`
  flex: 3;
  background-color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    padding: 30px 20px;
  }
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

const FormRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
    gap: 0;
  }
`;

const FormGroup = styled.div`
  flex: 1;
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

const PrivacyPolicy = styled.p`
  margin-bottom: 20px;
  font-size: 0.85rem;
  color: #757575;
`;

const PolicyLink = styled.a`
  color: var(--primary-color);
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

const LoginPrompt = styled.p`
  margin-top: 20px;
  text-align: center;
  font-size: 0.9rem;
  color: #757575;
`;

const LoginLink = styled(Link)`
  color: var(--primary-color);
  font-weight: 500;
  transition: color 0.3s;

  &:hover {
    color: var(--secondary-color);
    text-decoration: underline;
  }
`;

const InfoPanel = styled.div`
  flex: 2;
  background: linear-gradient(
    to right,
    var(--primary-color),
    var(--secondary-color)
  );
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const InfoContent = styled.div`
  max-width: 400px;
`;

const InfoTitle = styled.h2`
  font-size: 1.8rem;
  margin-bottom: 20px;
`;

const InfoText = styled.p`
  font-size: 1rem;
  margin-bottom: 30px;
  line-height: 1.6;
  opacity: 0.9;
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
`;

const FeatureIcon = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  font-size: 0.8rem;
`;

const FeatureText = styled.span`
  font-size: 0.95rem;
`;

export default Register;
