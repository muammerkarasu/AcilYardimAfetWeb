import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../src/context/AuthContext";
import Button from "../../src/components/Button";
import {
  FaExclamationCircle,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const VolunteerRegister = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: user?.displayName || "",
    birthDate: "",
    idNumber: "",
    phone: "",
    email: user?.email || "",
    address: "",
    city: "",
    district: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    skills: [],
    otherSkill: "",
    availabilityType: "fulltime",
    availableDays: [],
    canTravel: false,
    hasVehicle: false,
    vehicleType: "",
    healthIssues: "",
    previousExperience: "",
    languages: [],
    otherLanguage: "",
    educationLevel: "",
    occupation: "",
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "agreeTerms") {
        setFormData({ ...formData, [name]: checked });
      } else if (name.startsWith("skills-")) {
        const skill = name.replace("skills-", "");
        const skills = [...formData.skills];

        if (checked) {
          skills.push(skill);
        } else {
          const index = skills.indexOf(skill);
          if (index !== -1) {
            skills.splice(index, 1);
          }
        }

        setFormData({ ...formData, skills });
      } else if (name.startsWith("day-")) {
        const day = name.replace("day-", "");
        const availableDays = [...formData.availableDays];

        if (checked) {
          availableDays.push(day);
        } else {
          const index = availableDays.indexOf(day);
          if (index !== -1) {
            availableDays.splice(index, 1);
          }
        }

        setFormData({ ...formData, availableDays });
      } else if (name.startsWith("lang-")) {
        const lang = name.replace("lang-", "");
        const languages = [...formData.languages];

        if (checked) {
          languages.push(lang);
        } else {
          const index = languages.indexOf(lang);
          if (index !== -1) {
            languages.splice(index, 1);
          }
        }

        setFormData({ ...formData, languages });
      } else {
        setFormData({ ...formData, [name]: checked });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Firebase'e veriyi kaydetme işlemi burada yapılacak
      console.log("Gönüllü kaydı oluşturuluyor:", {
        ...formData,
        userId: user.uid,
      });

      // Kaydın başarılı olduğu durumda
      setTimeout(() => {
        setLoading(false);
        navigate("/volunteer-dashboard");
      }, 1500);
    } catch (err) {
      setError("Gönüllü kaydı oluşturulurken bir hata oluştu: " + err.message);
      setLoading(false);
    }
  };

  // Yarınki tarihi minimum tarih olarak ayarla
  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 100,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];
  const maxDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  )
    .toISOString()
    .split("T")[0];

  const skillsOptions = [
    { id: "firstAid", label: "İlk Yardım" },
    { id: "search", label: "Arama Kurtarma" },
    { id: "healthcare", label: "Sağlık Hizmetleri" },
    { id: "socialWork", label: "Sosyal Hizmet" },
    { id: "psychology", label: "Psikolojik Destek" },
    { id: "logistics", label: "Lojistik" },
    { id: "driving", label: "Araç Kullanma" },
    { id: "construction", label: "İnşaat / Tamir" },
    { id: "cooking", label: "Yemek Yapma" },
    { id: "teaching", label: "Eğitim / Öğretim" },
    { id: "translation", label: "Çeviri" },
    { id: "it", label: "Bilişim Teknolojileri" },
  ];

  const languages = [
    { id: "turkish", label: "Türkçe" },
    { id: "english", label: "İngilizce" },
    { id: "arabic", label: "Arapça" },
    { id: "kurdish", label: "Kürtçe" },
    { id: "german", label: "Almanca" },
    { id: "french", label: "Fransızca" },
    { id: "russian", label: "Rusça" },
  ];

  const days = [
    { id: "monday", label: "Pazartesi" },
    { id: "tuesday", label: "Salı" },
    { id: "wednesday", label: "Çarşamba" },
    { id: "thursday", label: "Perşembe" },
    { id: "friday", label: "Cuma" },
    { id: "saturday", label: "Cumartesi" },
    { id: "sunday", label: "Pazar" },
  ];

  const educationLevels = [
    "İlkokul",
    "Ortaokul",
    "Lise",
    "Ön Lisans",
    "Lisans",
    "Yüksek Lisans",
    "Doktora",
  ];

  return (
    <Container>
      <FormWrapper>
        <Title>Gönüllü Kayıt Formu</Title>
        <Description>
          Afet zamanlarında yardım etmek için gönüllü olmak istediğiniz için
          teşekkür ederiz. Lütfen aşağıdaki formu eksiksiz doldurunuz.
          Verdiğiniz bilgiler sadece afet durumlarında yardım organizasyonu için
          kullanılacaktır.
        </Description>

        {error && (
          <ErrorMessage>
            <FaExclamationCircle /> {error}
          </ErrorMessage>
        )}

        <Form onSubmit={handleSubmit}>
          <FormSection>
            <SectionTitle>Kişisel Bilgiler</SectionTitle>

            <FormRow>
              <FormGroup>
                <Label htmlFor="fullName">Ad Soyad *</Label>
                <Input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="birthDate">Doğum Tarihi *</Label>
                <Input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  min={minDate}
                  max={maxDate}
                  required
                />
                <HelperText>18 yaşından büyük olmalısınız.</HelperText>
              </FormGroup>
            </FormRow>

            <FormRow>
              <FormGroup>
                <Label htmlFor="idNumber">T.C. Kimlik Numarası *</Label>
                <Input
                  type="text"
                  id="idNumber"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  pattern="[0-9]{11}"
                  placeholder="11 haneli TC kimlik numaranız"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Telefon Numarası *</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="05XX XXX XX XX"
                  required
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="email">E-posta *</Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="city">İl *</Label>
                <Input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="district">İlçe *</Label>
                <Input
                  type="text"
                  id="district"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="address">Adres *</Label>
              <TextArea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                required
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Acil Durum İletişim Bilgileri</SectionTitle>

            <FormRow>
              <FormGroup>
                <Label htmlFor="emergencyContactName">
                  Acil Durumda Ulaşılacak Kişi *
                </Label>
                <Input
                  type="text"
                  id="emergencyContactName"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="emergencyContactPhone">
                  Acil Durum Telefonu *
                </Label>
                <Input
                  type="tel"
                  id="emergencyContactPhone"
                  name="emergencyContactPhone"
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="05XX XXX XX XX"
                  required
                />
              </FormGroup>
            </FormRow>
          </FormSection>

          <FormSection>
            <SectionTitle>Beceriler ve Deneyim</SectionTitle>

            <FormGroup>
              <Label>
                Sahip Olduğunuz Beceriler (Birden fazla seçebilirsiniz) *
              </Label>
              <CheckboxGroup>
                {skillsOptions.map((skill) => (
                  <CheckboxItem key={skill.id}>
                    <Checkbox
                      type="checkbox"
                      id={`skills-${skill.id}`}
                      name={`skills-${skill.id}`}
                      checked={formData.skills.includes(skill.id)}
                      onChange={handleChange}
                    />
                    <CheckboxLabel htmlFor={`skills-${skill.id}`}>
                      {skill.label}
                    </CheckboxLabel>
                  </CheckboxItem>
                ))}
              </CheckboxGroup>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="otherSkill">Diğer Beceriler</Label>
              <Input
                type="text"
                id="otherSkill"
                name="otherSkill"
                value={formData.otherSkill}
                onChange={handleChange}
                placeholder="Yukarıda belirtilmeyen diğer becerileriniz"
              />
            </FormGroup>

            <FormGroup>
              <Label>Bildiğiniz Diller</Label>
              <CheckboxGroup>
                {languages.map((lang) => (
                  <CheckboxItem key={lang.id}>
                    <Checkbox
                      type="checkbox"
                      id={`lang-${lang.id}`}
                      name={`lang-${lang.id}`}
                      checked={formData.languages.includes(lang.id)}
                      onChange={handleChange}
                    />
                    <CheckboxLabel htmlFor={`lang-${lang.id}`}>
                      {lang.label}
                    </CheckboxLabel>
                  </CheckboxItem>
                ))}
              </CheckboxGroup>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="otherLanguage">Diğer Diller</Label>
              <Input
                type="text"
                id="otherLanguage"
                name="otherLanguage"
                value={formData.otherLanguage}
                onChange={handleChange}
                placeholder="Yukarıda belirtilmeyen diğer bildiğiniz diller"
              />
            </FormGroup>

            <FormRow>
              <FormGroup>
                <Label htmlFor="educationLevel">Eğitim Durumu</Label>
                <Select
                  id="educationLevel"
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleChange}
                >
                  <option value="">Seçiniz</option>
                  {educationLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="occupation">Meslek / Uzmanlık Alanı</Label>
                <Input
                  type="text"
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <Label htmlFor="previousExperience">
                Önceki Gönüllülük Deneyimleriniz
              </Label>
              <TextArea
                id="previousExperience"
                name="previousExperience"
                value={formData.previousExperience}
                onChange={handleChange}
                rows="3"
                placeholder="Daha önce katıldığınız gönüllülük faaliyetleri veya afet çalışmaları"
              />
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Uygunluk ve Sağlık Bilgileri</SectionTitle>

            <FormGroup>
              <Label>Uygunluk Durumu *</Label>
              <RadioGroup>
                <RadioItem>
                  <Radio
                    type="radio"
                    id="fulltime"
                    name="availabilityType"
                    value="fulltime"
                    checked={formData.availabilityType === "fulltime"}
                    onChange={handleChange}
                    required
                  />
                  <RadioLabel htmlFor="fulltime">
                    Tam zamanlı (Acil durumlarda her an hazır)
                  </RadioLabel>
                </RadioItem>
                <RadioItem>
                  <Radio
                    type="radio"
                    id="parttime"
                    name="availabilityType"
                    value="parttime"
                    checked={formData.availabilityType === "parttime"}
                    onChange={handleChange}
                  />
                  <RadioLabel htmlFor="parttime">
                    Yarı zamanlı (Belirli gün ve saatlerde)
                  </RadioLabel>
                </RadioItem>
                <RadioItem>
                  <Radio
                    type="radio"
                    id="weekend"
                    name="availabilityType"
                    value="weekend"
                    checked={formData.availabilityType === "weekend"}
                    onChange={handleChange}
                  />
                  <RadioLabel htmlFor="weekend">Sadece haftasonları</RadioLabel>
                </RadioItem>
              </RadioGroup>
            </FormGroup>

            {formData.availabilityType === "parttime" && (
              <FormGroup>
                <Label>Uygun Olduğunuz Günler</Label>
                <CheckboxGroup>
                  {days.map((day) => (
                    <CheckboxItem key={day.id}>
                      <Checkbox
                        type="checkbox"
                        id={`day-${day.id}`}
                        name={`day-${day.id}`}
                        checked={formData.availableDays.includes(day.id)}
                        onChange={handleChange}
                      />
                      <CheckboxLabel htmlFor={`day-${day.id}`}>
                        {day.label}
                      </CheckboxLabel>
                    </CheckboxItem>
                  ))}
                </CheckboxGroup>
              </FormGroup>
            )}

            <FormRow>
              <FormGroup>
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="canTravel"
                    name="canTravel"
                    checked={formData.canTravel}
                    onChange={handleChange}
                  />
                  <CheckboxLabel htmlFor="canTravel">
                    Gerektiğinde şehir dışına seyahat edebilirim
                  </CheckboxLabel>
                </CheckboxContainer>
              </FormGroup>

              <FormGroup>
                <CheckboxContainer>
                  <Checkbox
                    type="checkbox"
                    id="hasVehicle"
                    name="hasVehicle"
                    checked={formData.hasVehicle}
                    onChange={handleChange}
                  />
                  <CheckboxLabel htmlFor="hasVehicle">
                    Şahsi aracım var ve kullanabilirim
                  </CheckboxLabel>
                </CheckboxContainer>
              </FormGroup>
            </FormRow>

            {formData.hasVehicle && (
              <FormGroup>
                <Label htmlFor="vehicleType">Araç Tipi</Label>
                <Input
                  type="text"
                  id="vehicleType"
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleChange}
                  placeholder="Ör: Binek araç, SUV, Minivan, vb."
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="healthIssues">
                Sağlık Sorunları / Özel Durumlar
              </Label>
              <TextArea
                id="healthIssues"
                name="healthIssues"
                value={formData.healthIssues}
                onChange={handleChange}
                rows="3"
                placeholder="Bilmemiz gereken herhangi bir sağlık sorunu veya kısıtlama varsa belirtiniz"
              />
              <HelperText>
                Alerjileriniz veya gönüllülük çalışmalarını etkileyebilecek
                sağlık durumlarınız varsa lütfen belirtiniz.
              </HelperText>
            </FormGroup>
          </FormSection>

          <FormSection>
            <SectionTitle>Onay</SectionTitle>

            <InfoBox>
              <InfoIcon>
                <FaInfoCircle />
              </InfoIcon>
              <InfoContent>
                <InfoTitle>Kişisel Verilerin Korunması</InfoTitle>
                <InfoText>
                  Sağladığınız bilgiler, sadece afet durumlarında organizasyon
                  ve yardım amaçlarıyla kullanılacaktır. Kişisel verileriniz
                  gizli tutulacak ve üçüncü şahıslarla paylaşılmayacaktır.
                  Gönüllülük çalışmalarında sizinle iletişime geçmek ve gerekli
                  koordinasyonu sağlamak için bu bilgileri kullanacağız.
                </InfoText>
              </InfoContent>
            </InfoBox>

            <CheckboxContainer>
              <Checkbox
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <CheckboxLabel htmlFor="agreeTerms">
                Yukarıdaki bilgilerin doğru olduğunu ve gönüllü çalışma
                şartlarını kabul ettiğimi beyan ederim. *
              </CheckboxLabel>
            </CheckboxContainer>
          </FormSection>

          <FormActions>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/")}
              disabled={loading}
            >
              İptal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Kaydınız Oluşturuluyor..." : "Gönüllü Ol"}
            </Button>
          </FormActions>
        </Form>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const FormWrapper = styled.div`
  background-color: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 16px;
  color: var(--text-color);
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.4rem;
  color: var(--text-color);
  padding-bottom: 10px;
  border-bottom: 1px solid #e0e0e0;
`;

const FormRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 1rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: var(--border-radius);
  font-size: 1rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const HelperText = styled.p`
  font-size: 0.875rem;
  color: #888;
  margin-top: 4px;
`;

const CheckboxGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 12px;
  margin-top: 8px;
`;

const CheckboxItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Radio = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--primary-color);
`;

const RadioLabel = styled.label`
  color: var(--text-color);
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--primary-color);
`;

const CheckboxLabel = styled.label`
  color: var(--text-color);
`;

const InfoBox = styled.div`
  display: flex;
  gap: 16px;
  background-color: #e3f2fd;
  padding: 20px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
`;

const InfoIcon = styled.div`
  font-size: 1.5rem;
  color: #1976d2;
  flex-shrink: 0;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: #1976d2;
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: #333;
  line-height: 1.5;
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const ErrorMessage = styled.div`
  background-color: #ffebee;
  color: #c62828;
  padding: 16px;
  border-radius: var(--border-radius);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 1.2rem;
  }
`;

export default VolunteerRegister;
