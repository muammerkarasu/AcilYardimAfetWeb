import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/Button";
import {
  FaUser,
  FaCalendarCheck,
  FaMapMarkerAlt,
  FaPhone,
  FaCheckCircle,
  FaExclamationTriangle,
  FaClock,
  FaInfoCircle,
  FaFileAlt,
} from "react-icons/fa";

const VolunteerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [volunteerData, setVolunteerData] = useState(null);
  const [assignments, setAssignments] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");

  // Örnek veri - gerçek uygulamada bu Firebase'den gelecek
  useEffect(() => {
    // Firebase'den veri çekme işlemi burada yapılacak
    setTimeout(() => {
      setVolunteerData({
        id: "v123",
        fullName: "Ahmet Yılmaz",
        email: user?.email || "ahmet.yilmaz@example.com",
        phone: "+90 555 123 4567",
        location: "İstanbul, Kadıköy",
        skills: ["İlk Yardım", "Arama Kurtarma", "Lojistik"],
        languages: ["Türkçe", "İngilizce"],
        availabilityType: "fulltime",
        canTravel: true,
        hasVehicle: true,
        vehicleType: "Binek Araç",
        registrationDate: "2023-05-01T10:30:00Z",
        status: "active",
      });

      setAssignments([
        {
          id: "a1",
          title: "Deprem Bölgesi Yardım Dağıtımı",
          location: "İzmir, Bornova",
          date: "2023-06-15T09:00:00Z",
          endDate: "2023-06-15T18:00:00Z",
          description:
            "Depremden etkilenen ailelere gıda ve temel ihtiyaç malzemelerinin dağıtımı yapılacaktır.",
          status: "upcoming",
          contactPerson: "Mehmet Demir",
          contactPhone: "+90 532 987 6543",
        },
        {
          id: "a2",
          title: "İlk Yardım Eğitimi",
          location: "İstanbul, Beşiktaş",
          date: "2023-06-10T13:00:00Z",
          endDate: "2023-06-10T17:00:00Z",
          description: "Gönüllülere temel ilk yardım eğitimi verilecektir.",
          status: "completed",
          contactPerson: "Zeynep Kaya",
          contactPhone: "+90 533 456 7890",
        },
        {
          id: "a3",
          title: "Sel Bölgesi Hasar Tespit Çalışması",
          location: "Rize, Merkez",
          date: "2023-06-20T08:00:00Z",
          endDate: "2023-06-22T18:00:00Z",
          description:
            "Sel felaketinden etkilenen bölgede hasar tespit çalışması yapılacaktır. Konaklama sağlanacaktır.",
          status: "upcoming",
          contactPerson: "Ali Yıldız",
          contactPhone: "+90 535 789 0123",
        },
      ]);

      setLoading(false);
    }, 1000);
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "upcoming":
        return { label: "Yaklaşan", color: "#1976d2", icon: <FaClock /> };
      case "completed":
        return {
          label: "Tamamlandı",
          color: "#388e3c",
          icon: <FaCheckCircle />,
        };
      case "cancelled":
        return {
          label: "İptal Edildi",
          color: "#d32f2f",
          icon: <FaExclamationTriangle />,
        };
      default:
        return { label: "Beklemede", color: "#f57c00", icon: <FaInfoCircle /> };
    }
  };

  if (loading) {
    return (
      <Container>
        <LoadingMessage>Gönüllü bilgileri yükleniyor...</LoadingMessage>
      </Container>
    );
  }

  return (
    <Container>
      <DashboardHeader>
        <WelcomeBox>
          <h1>Hoş Geldiniz, {volunteerData.fullName}</h1>
          <p>
            Gönüllü hesabınız aktif durumdadır. Aşağıda bilgilerinizi
            görüntüleyebilir ve size atanan görevleri takip edebilirsiniz.
          </p>
        </WelcomeBox>
        <StatusBadge status={volunteerData.status}>
          {volunteerData.status === "active"
            ? "Aktif Gönüllü"
            : "Onay Bekliyor"}
        </StatusBadge>
      </DashboardHeader>

      <TabsContainer>
        <TabButton
          active={activeTab === "profile"}
          onClick={() => setActiveTab("profile")}
        >
          <FaUser />
          Profil Bilgilerim
        </TabButton>
        <TabButton
          active={activeTab === "assignments"}
          onClick={() => setActiveTab("assignments")}
        >
          <FaCalendarCheck />
          Görevlerim
        </TabButton>
        <TabButton
          active={activeTab === "documents"}
          onClick={() => setActiveTab("documents")}
        >
          <FaFileAlt />
          Belgelerim
        </TabButton>
      </TabsContainer>

      <ContentContainer>
        {activeTab === "profile" && (
          <ProfileSection>
            <SectionTitle>Kişisel Bilgilerim</SectionTitle>

            <InfoCard>
              <InfoGroup>
                <InfoLabel>İsim Soyisim</InfoLabel>
                <InfoValue>{volunteerData.fullName}</InfoValue>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>E-posta</InfoLabel>
                <InfoValue>{volunteerData.email}</InfoValue>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>Telefon</InfoLabel>
                <InfoValue>{volunteerData.phone}</InfoValue>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>Konum</InfoLabel>
                <InfoValue>{volunteerData.location}</InfoValue>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>Kayıt Tarihi</InfoLabel>
                <InfoValue>
                  {formatDate(volunteerData.registrationDate)}
                </InfoValue>
              </InfoGroup>
            </InfoCard>

            <SectionTitle>Yetkinliklerim</SectionTitle>

            <InfoCard>
              <InfoGroup>
                <InfoLabel>Beceriler</InfoLabel>
                <SkillsList>
                  {volunteerData.skills.map((skill, index) => (
                    <SkillBadge key={index}>{skill}</SkillBadge>
                  ))}
                </SkillsList>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>Diller</InfoLabel>
                <SkillsList>
                  {volunteerData.languages.map((language, index) => (
                    <SkillBadge key={index}>{language}</SkillBadge>
                  ))}
                </SkillsList>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>Uygunluk Durumu</InfoLabel>
                <InfoValue>
                  {volunteerData.availabilityType === "fulltime"
                    ? "Tam Zamanlı"
                    : volunteerData.availabilityType === "parttime"
                    ? "Yarı Zamanlı"
                    : "Sadece Hafta Sonları"}
                </InfoValue>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>Seyahat Edebilir</InfoLabel>
                <InfoValue>
                  {volunteerData.canTravel ? "Evet" : "Hayır"}
                </InfoValue>
              </InfoGroup>

              <InfoGroup>
                <InfoLabel>Araç</InfoLabel>
                <InfoValue>
                  {volunteerData.hasVehicle
                    ? `Evet (${volunteerData.vehicleType})`
                    : "Hayır"}
                </InfoValue>
              </InfoGroup>
            </InfoCard>

            <ButtonGroup>
              <Button onClick={() => navigate("/volunteer-edit")}>
                Bilgilerimi Güncelle
              </Button>
            </ButtonGroup>
          </ProfileSection>
        )}

        {activeTab === "assignments" && (
          <AssignmentsSection>
            <SectionTitle>Görevlerim</SectionTitle>

            {assignments.length === 0 ? (
              <EmptyState>
                <p>Henüz size atanmış görev bulunmamaktadır.</p>
              </EmptyState>
            ) : (
              <AssignmentsList>
                {assignments.map((assignment) => (
                  <AssignmentCard key={assignment.id}>
                    <AssignmentHeader>
                      <h3>{assignment.title}</h3>
                      <StatusTag status={assignment.status}>
                        {getStatusLabel(assignment.status).icon}
                        <span>{getStatusLabel(assignment.status).label}</span>
                      </StatusTag>
                    </AssignmentHeader>

                    <AssignmentDetails>
                      <DetailItem>
                        <FaCalendarCheck />
                        <span>
                          {formatDate(assignment.date)} -{" "}
                          {formatDate(assignment.endDate)}
                        </span>
                      </DetailItem>

                      <DetailItem>
                        <FaMapMarkerAlt />
                        <span>{assignment.location}</span>
                      </DetailItem>

                      <DetailItem>
                        <FaUser />
                        <span>{assignment.contactPerson}</span>
                      </DetailItem>

                      <DetailItem>
                        <FaPhone />
                        <span>{assignment.contactPhone}</span>
                      </DetailItem>
                    </AssignmentDetails>

                    <AssignmentDescription>
                      {assignment.description}
                    </AssignmentDescription>

                    <AssignmentActions>
                      {assignment.status === "upcoming" && (
                        <>
                          <ActionButton primary>Görev Detayları</ActionButton>
                          <ActionButton>Katılamayacağım</ActionButton>
                        </>
                      )}

                      {assignment.status === "completed" && (
                        <ActionButton>Görev Raporunu Görüntüle</ActionButton>
                      )}
                    </AssignmentActions>
                  </AssignmentCard>
                ))}
              </AssignmentsList>
            )}
          </AssignmentsSection>
        )}

        {activeTab === "documents" && (
          <DocumentsSection>
            <SectionTitle>Belgelerim</SectionTitle>

            <InfoCard>
              <EmptyState>
                <p>Henüz yüklenmiş belge bulunmamaktadır.</p>
                <Button variant="outline">Belge Yükle</Button>
              </EmptyState>
            </InfoCard>
          </DocumentsSection>
        )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const DashboardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const WelcomeBox = styled.div`
  h1 {
    font-size: 2rem;
    margin-bottom: 8px;
    color: var(--text-color);
  }

  p {
    font-size: 1rem;
    color: #666;
    max-width: 800px;
  }
`;

const StatusBadge = styled.div`
  display: inline-block;
  padding: 8px 16px;
  font-weight: 600;
  font-size: 0.9rem;
  border-radius: 20px;
  background-color: ${(props) =>
    props.status === "active" ? "#e8f5e9" : "#fff8e1"};
  color: ${(props) => (props.status === "active" ? "#2e7d32" : "#f57c00")};
`;

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 30px;
  overflow-x: auto;

  @media (max-width: 576px) {
    justify-content: flex-start;
  }
`;

const TabButton = styled.button`
  padding: 12px 24px;
  background: none;
  border: none;
  border-bottom: 3px solid
    ${(props) => (props.active ? "var(--primary-color)" : "transparent")};
  color: ${(props) => (props.active ? "var(--primary-color)" : "#666")};
  font-weight: ${(props) => (props.active ? "600" : "normal")};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;

  &:hover {
    color: var(--primary-color);
  }

  svg {
    font-size: 1.1rem;
  }
`;

const ContentContainer = styled.div`
  min-height: 500px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
`;

const ProfileSection = styled.div``;

const InfoCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 24px;
  margin-bottom: 30px;
`;

const InfoGroup = styled.div`
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const InfoLabel = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  color: #555;
`;

const InfoValue = styled.div`
  color: var(--text-color);
`;

const SkillsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const SkillBadge = styled.div`
  background-color: #f5f5f5;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #555;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;
`;

const AssignmentsSection = styled.div``;

const AssignmentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AssignmentCard = styled.div`
  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const AssignmentHeader = styled.div`
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;

  h3 {
    margin: 0;
    font-size: 1.3rem;
    color: var(--text-color);
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const StatusTag = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: white;
  background-color: ${(props) => {
    // StatusTag'in kendi içinde getStatusLabel fonksiyonunu tanımlayalım
    const getStatusColor = (status) => {
      switch (status) {
        case "upcoming":
          return "#1976d2";
        case "completed":
          return "#388e3c";
        case "cancelled":
          return "#d32f2f";
        default:
          return "#f57c00";
      }
    };
    return getStatusColor(props.status);
  }};

  svg {
    font-size: 0.9rem;
  }
`;

const AssignmentDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  padding: 20px;
  background-color: #f9f9f9;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #555;

  svg {
    color: var(--primary-color);
  }
`;

const AssignmentDescription = styled.p`
  padding: 20px;
  color: #444;
  line-height: 1.6;
`;

const AssignmentActions = styled.div`
  padding: 20px;
  display: flex;
  gap: 12px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ActionButton = styled.button`
  padding: 10px 16px;
  border-radius: var(--border-radius);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  background-color: ${(props) =>
    props.primary ? "var(--primary-color)" : "white"};
  color: ${(props) => (props.primary ? "white" : "#555")};
  border: 1px solid
    ${(props) => (props.primary ? "var(--primary-color)" : "#e0e0e0")};

  &:hover {
    background-color: ${(props) =>
      props.primary ? "var(--primary-darker)" : "#f5f5f5"};
  }
`;

const DocumentsSection = styled.div``;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;

  p {
    color: #666;
    margin-bottom: 20px;
    font-size: 1.1rem;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 80px 20px;
  font-size: 1.2rem;
  color: var(--text-color);
`;

export default VolunteerDashboard;
