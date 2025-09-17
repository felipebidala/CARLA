import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const App = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    birthDate: '',
    email: '',
    phone: '',
    companyName: '',
    serviceType: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      console.log('Form Data Submitted:', formData);
    }, 1500);
  };

  return (
    <div className="app-container">
      <header className="header">
        <div className="container">
          <h1>LegalizaTech</h1>
          <p>Sua empresa em conformidade, sem burocracia.</p>
        </div>
      </header>

      <main className="container">
        <section id="hero" className="hero-section">
          <h2>Simplifique a Burocracia. Abra sua Empresa sem Complicações.</h2>
          <p>Oferecemos consultoria completa para legalizar seu negócio de forma rápida e segura. Foco no que você faz de melhor, e deixe a papelada com a gente.</p>
          <a href="#contact-form" className="cta-button">Quero Iniciar Agora</a>
        </section>

        <section id="services" className="services-section">
          <h3>Nossos Serviços</h3>
          <div className="service-cards">
            <div className="card">
              <h4>Abertura de MEI</h4>
              <p>Formalize-se como Microempreendedor Individual de maneira ágil.</p>
            </div>
            <div className="card">
              <h4>Alvarás e Licenças</h4>
              <p>Obtenção de alvarás de funcionamento e outras licenças necessárias.</p>
            </div>
          </div>
        </section>
        
        <section id="contact-form" className="form-section">
          <h3>Solicite sua Consultoria</h3>
          <p>Preencha o formulário abaixo e nossa equipe entrará em contato em breve.</p>
          
          {isSubmitted ? (
            <div className="success-message" role="alert">
              <h4>Obrigado!</h4>
              <p>Sua solicitação foi enviada com sucesso. Entraremos em contato em breve!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} aria-labelledby="form-title">
              <div className="form-group">
                <label htmlFor="fullName">Nome Completo</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input type="text" id="cpf" name="cpf" placeholder="000.000.000-00" value={formData.cpf} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="birthDate">Data de Nascimento</label>
                  <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-row">
                 <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="seuemail@exemplo.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefone / WhatsApp</label>
                  <input type="tel" id="phone" name="phone" placeholder="(00) 90000-0000" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="companyName">Nome Fantasia da Empresa (Opcional)</label>
                <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="serviceType">Qual serviço você precisa?</label>
                <select id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} required>
                  <option value="" disabled>Selecione uma opção</option>
                  <option value="MEI">Abertura de MEI</option>
                  <option value="Alvaras">Obtenção de Alvarás e Licenças</option>
                  <option value="Outro">Outra Dúvida</option>
                </select>
              </div>

              <button type="submit" className="submit-button" disabled={isLoading}>
                {isLoading ? 'Enviando...' : 'Enviar Solicitação'}
              </button>
            </form>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} LegalizaTech. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);