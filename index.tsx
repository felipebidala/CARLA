import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI, Chat } from "@google/genai";

import './index.css';

// --- Funções Auxiliares de CPF ---
function validateCpf(cpf: string): boolean {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  let sum = 0;
  let remainder;
  for (let i = 1; i <= 9; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(9, 10))) return false;
  sum = 0;
  for (let i = 1; i <= 10; i++) sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  remainder = (sum * 10) % 11;
  if ((remainder === 10) || (remainder === 11)) remainder = 0;
  if (remainder !== parseInt(cpf.substring(10, 11))) return false;
  return true;
}

const formatCpf = (value: string): string => {
  return value
    .replace(/\D/g, '') // Remove caracteres não numéricos
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o 3º dígito
    .replace(/(\d{3})(\d)/, '$1.$2') // Adiciona ponto após o 6º dígito
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2') // Adiciona traço antes dos últimos 2 dígitos
    .substring(0, 14); // Limita o comprimento
};


// --- Componente do Chatbot ---
const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ sender: 'user' | 'lia'; text: string }[]>([
        { sender: 'lia', text: 'Olá! Sou a LIA, sua assistente virtual. Como posso ajudar com a legalização da sua empresa?' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isLiaTyping, setIsLiaTyping] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const chatBodyRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initChat = async () => {
            try {
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
                const newChat = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: "Você é LIA (LegalizaTech Inteligência Artificial), uma assistente virtual profissional e prestativa. Sua especialidade é responder perguntas sobre os serviços da LegalizaTech, focando em Abertura de MEI, obtenção de CNPJ e Alvarás. Seja concisa, clara e amigável. Se a pergunta for complexa ou fora do escopo, oriente o usuário a preencher o formulário de contato para falar com um especialista.",
                    },
                });
                setChat(newChat);
            } catch (error) {
                console.error("Erro ao inicializar o chatbot:", error);
                setMessages(prev => [...prev, { sender: 'lia', text: 'Desculpe, estou com problemas para conectar. Tente novamente mais tarde.' }]);
            }
        };
        initChat();
    }, []);

    useEffect(() => {
        chatBodyRef.current?.scrollTo(0, chatBodyRef.current.scrollHeight);
    }, [messages, isLiaTyping]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || !chat) return;

        const userMessage = { sender: 'user' as const, text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLiaTyping(true);

        try {
            const response = await chat.sendMessage({ message: userMessage.text });
            const liaMessage = { sender: 'lia' as const, text: response.text };
            setMessages(prev => [...prev, liaMessage]);
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
            setMessages(prev => [...prev, { sender: 'lia', text: 'Ocorreu um erro ao processar sua mensagem. Por favor, preencha nosso formulário de contato.' }]);
        } finally {
            setIsLiaTyping(false);
        }
    };

    return (
        <>
            <button className="fab" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir chat">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V4c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>
            </button>
            <div className={`chat-window ${isOpen ? 'open' : ''}`}>
                <div className="chat-header">
                    <h3>Fale com a LIA</h3>
                    <button className="close-chat-btn" onClick={() => setIsOpen(false)}>&times;</button>
                </div>
                <div className="chat-body" ref={chatBodyRef}>
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                        </div>
                    ))}
                    {isLiaTyping && <div className="message-bubble lia typing">LIA está digitando...</div>}
                </div>
                <form className="chat-footer" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        className="chat-input"
                        placeholder="Digite sua mensagem..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button type="submit" className="send-btn" aria-label="Enviar mensagem">
                       <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2 .01 7z"/></svg>
                    </button>
                </form>
            </div>
        </>
    );
};

// --- Componente Principal da Aplicação ---
function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    message: ''
  });
  const [cpfError, setCpfError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === 'cpf') {
      const formattedCpf = formatCpf(value);
      setFormData(prev => ({ ...prev, cpf: formattedCpf }));
      
      if (formattedCpf && !validateCpf(formattedCpf)) {
        setCpfError('Por favor, insira um CPF válido.');
      } else {
        setCpfError('');
      }
    } else {
       setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.cpf && !validateCpf(formData.cpf)) {
      setCpfError('Por favor, insira um CPF válido.');
      return;
    }
    // Lógica de envio do formulário aqui
    console.log('Formulário enviado:', formData);
    alert('Obrigado pelo seu contato!');
  };

  return (
    <>
      <header className="header">
        <nav className="container header-nav">
          <a href="#" className="logo">LegalizaTech</a>
          <ul className="nav-list">
            <li><a href="#about">Sobre Nós</a></li>
            <li><a href="#services">Serviços</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Descomplique a burocracia. Seu negócio legalizado.</h1>
            <p>Assessoria completa para abertura de MEI, CNPJ e obtenção de alvarás.</p>
            <a href="#contact" className="btn btn-primary">Comece Agora</a>
          </div>
        </section>

        <section id="services" className="section">
          <div className="container">
            <h2 className="section-title">Nossos Serviços</h2>
            <p className="section-subtitle">Soluções ágeis e eficientes para a sua empresa.</p>
            <div className="services-grid">
              <div className="service-card">
                <div className="icon">📄</div>
                <h3>Abertura de MEI</h3>
                <p>Formalize seu negócio como Microempreendedor Individual de forma rápida e segura.</p>
              </div>
              <div className="service-card">
                <div className="icon">🏢</div>
                <h3>Obtenção de CNPJ</h3>
                <p>Cuidamos de todo o processo para que sua empresa tenha um Cadastro Nacional da Pessoa Jurídica.</p>
              </div>
              <div className="service-card">
                <div className="icon">📜</div>
                <h3>Alvarás e Licenças</h3>
                <p>Garantimos todas as licenças e alvarás necessários para a operação do seu negócio.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="container">
            <h2 className="section-title">Fale Conosco</h2>
            <p className="section-subtitle">Preencha o formulário abaixo e nossa equipe entrará em contato.</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nome Completo</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
               <div className="form-group">
                <label htmlFor="phone">Telefone</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                <input 
                  type="text" 
                  id="cpf" 
                  name="cpf" 
                  value={formData.cpf} 
                  onChange={handleInputChange} 
                  className={cpfError ? 'input-error' : ''}
                  placeholder="000.000.000-00"
                  required 
                />
                {cpfError && <p className="error-message">{cpfError}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleInputChange} required></textarea>
              </div>
              <button type="submit" className="btn-submit" disabled={!!cpfError}>Enviar</button>
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 LegalizaTech. Todos os direitos reservados.</p>
        </div>
      </footer>

      <Chatbot />
    </>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}