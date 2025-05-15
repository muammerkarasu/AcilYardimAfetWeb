import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaHandHoldingHeart,
  FaHandsHelping,
  FaDonate,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Home = () => {
  return (
    <Container>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Acil Durumlarda Yardım Ağı</HeroTitle>
          <HeroSubtitle>
            Afet ve acil durumlarda yardım etmek ve yardım almak için buradayız.
          </HeroSubtitle>
          <HeroButtons>
            <PrimaryButton to="/help-requests">Yardım Talepleri</PrimaryButton>
            <SecondaryButton to="/volunteer-register">
              Gönüllü Ol
            </SecondaryButton>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <SectionTitle>Nasıl Yardım Edebiliriz?</SectionTitle>
        <FeaturesContainer>
          <FeatureCard>
            <FeatureIcon>
              <FaHandHoldingHeart size={40} />
            </FeatureIcon>
            <FeatureTitle>Yardım Talepleri</FeatureTitle>
            <FeatureDescription>
              İhtiyaç sahiplerinden gelen yardım taleplerini görüntüleyin ve
              destek olun.
            </FeatureDescription>
            <FeatureLink to="/help-requests">Talepleri Görüntüle</FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaHandsHelping size={40} />
            </FeatureIcon>
            <FeatureTitle>Gönüllü Ol</FeatureTitle>
            <FeatureDescription>
              Yeteneklerinizi ve zamanınızı paylaşarak ihtiyacı olanlara yardım
              edin.
            </FeatureDescription>
            <FeatureLink to="/volunteer-register">
              Gönüllü Başvurusu
            </FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaDonate size={40} />
            </FeatureIcon>
            <FeatureTitle>Bağış Yap</FeatureTitle>
            <FeatureDescription>
              Maddi destek sağlayarak afetzedelere ve ihtiyaç sahiplerine yardım
              edin.
            </FeatureDescription>
            <FeatureLink to="/donations">Bağış Yap</FeatureLink>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>
              <FaMapMarkerAlt size={40} />
            </FeatureIcon>
            <FeatureTitle>Yardım Haritası</FeatureTitle>
            <FeatureDescription>
              Yakınınızdaki yardım taleplerini ve dağıtım noktalarını haritada
              görüntüleyin.
            </FeatureDescription>
            <FeatureLink to="/help-map">Haritayı Görüntüle</FeatureLink>
          </FeatureCard>
        </FeaturesContainer>
      </FeaturesSection>

      <StatsSection>
        <StatBox>
          <StatNumber>500+</StatNumber>
          <StatLabel>Tamamlanan Yardım</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>300+</StatNumber>
          <StatLabel>Aktif Gönüllü</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>10K+</StatNumber>
          <StatLabel>Yardım Alan</StatLabel>
        </StatBox>
        <StatBox>
          <StatNumber>50+</StatNumber>
          <StatLabel>İl Kapsamı</StatLabel>
        </StatBox>
      </StatsSection>

      <CallToActionSection>
        <CTAContent>
          <CTATitle>Hemen Yardım Edin veya Yardım İsteyin</CTATitle>
          <CTADescription>
            Acil durumlar için hızlı ve etkili bir yardım ağı oluşturuyoruz. Siz
            de bu ağın bir parçası olabilirsiniz.
          </CTADescription>
          <CTAButtons>
            <CTAPrimaryButton to="/create-help-request">
              Yardım Talebi Oluştur
            </CTAPrimaryButton>
            <CTASecondaryButton to="/help-requests">
              Yardım Et
            </CTASecondaryButton>
          </CTAButtons>
        </CTAContent>
      </CallToActionSection>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const HeroSection = styled.section`
  height: 80vh;
  min-height: 500px;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url("https://images.unsplash.com/photo-1542181961-9590d0c79dab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")
      center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: white;
  padding: 0 20px;
`;

const HeroContent = styled.div`
  max-width: 800px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const PrimaryButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
  }

  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
`;

const SecondaryButton = styled(Link)`
  background-color: transparent;
  color: white;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  border: 2px solid white;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: var(--primary-color);
    transform: translateY(-3px);
  }

  @media (max-width: 576px) {
    width: 100%;
    text-align: center;
  }
`;

const FeaturesSection = styled.section`
  padding: 80px 20px;
  background-color: #f9f9f9;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.2rem;
  margin-bottom: 60px;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(
      to right,
      var(--primary-color),
      var(--secondary-color)
    );
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const FeaturesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FeatureCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  padding: 30px;
  box-shadow: var(--box-shadow);
  transition: transform 0.3s;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
  }
`;

const FeatureIcon = styled.div`
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 15px;
`;

const FeatureDescription = styled.p`
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const FeatureLink = styled(Link)`
  color: var(--primary-color);
  font-weight: bold;
  display: inline-block;
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: var(--primary-color);
    transition: width 0.3s;
  }

  &:hover:after {
    width: 100%;
  }
`;

const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  background-color: var(--primary-color);
  padding: 60px 20px;
  text-align: center;
  color: white;
`;

const StatBox = styled.div`
  padding: 20px;
`;

const StatNumber = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const CallToActionSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
    url("https://images.unsplash.com/photo-1594708767771-a5e9d3c6c244?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80")
      center/cover no-repeat;
  color: white;
  text-align: center;
`;

const CTAContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const CTATitle = styled.h2`
  font-size: 2.2rem;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const CTADescription = styled.p`
  font-size: 1.1rem;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CTAButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const CTAPrimaryButton = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: 12px 28px;
  border-radius: var(--border-radius);
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: var(--secondary-color);
    transform: translateY(-3px);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

const CTASecondaryButton = styled(Link)`
  background-color: transparent;
  color: white;
  padding: 12px 28px;
  border-radius: var(--border-radius);
  border: 2px solid white;
  font-weight: bold;
  transition: all 0.3s;

  &:hover {
    background-color: white;
    color: var(--primary-color);
    transform: translateY(-3px);
  }

  @media (max-width: 576px) {
    width: 100%;
  }
`;

export default Home;
