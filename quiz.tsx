import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './quiz.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  category: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "O que é um Tributo segundo o Direito Tributário Brasileiro?",
    options: [
      "Uma penalidade por ato ilícito",
      "Um pagamento monetário compulsório estabelecido por lei, não constituindo sanção",
      "Uma doação voluntária ao Estado",
      "Um empréstimo ao governo"
    ],
    correctAnswer: 1,
    explanation: "Tributo é um pagamento monetário compulsório estabelecido por lei, não constituindo sanção por ato ilícito, cobrado mediante atividade administrativa plenamente vinculada.",
    category: "Conceitos Fundamentais"
  },
  {
    id: 2,
    question: "Quantas espécies tributárias existem no sistema brasileiro?",
    options: ["3 espécies", "4 espécies", "5 espécies", "6 espécies"],
    correctAnswer: 2,
    explanation: "O sistema tributário brasileiro possui 5 espécies: Impostos, Taxas, Contribuição de Melhoria, Empréstimos Compulsórios e Contribuições Especiais.",
    category: "Espécies Tributárias"
  },
  {
    id: 3,
    question: "Qual princípio estabelece que não pode haver tributo sem lei?",
    options: [
      "Princípio da Anterioridade",
      "Princípio da Legalidade",
      "Princípio da Isonomia",
      "Princípio da Capacidade Contributiva"
    ],
    correctAnswer: 1,
    explanation: "O Princípio da Legalidade (nullum tributum sine lege) estabelece que nenhum tributo pode ser instituído ou aumentado sem lei que o estabeleça.",
    category: "Princípios Constitucionais"
  },
  {
    id: 4,
    question: "O que significa o Princípio da Anterioridade?",
    options: [
      "Tributos devem ser pagos antes do vencimento",
      "Tributos não podem ser cobrados no mesmo exercício fiscal em que foram criados",
      "Tributos devem ser anteriores à Constituição",
      "Tributos devem ser pagos antecipadamente"
    ],
    correctAnswer: 1,
    explanation: "O Princípio da Anterioridade estabelece que os tributos não podem ser cobrados no mesmo exercício fiscal em que a lei que os instituiu ou aumentou foi publicada.",
    category: "Princípios Constitucionais"
  },
  {
    id: 5,
    question: "Qual é a diferença principal entre Impostos e Taxas?",
    options: [
      "Impostos são federais e taxas são municipais",
      "Impostos não estão vinculados a atividade estatal específica, taxas estão",
      "Impostos são maiores que taxas",
      "Não há diferença entre eles"
    ],
    correctAnswer: 1,
    explanation: "Impostos são tributos não vinculados a qualquer atividade estatal específica, enquanto Taxas são vinculadas a serviços públicos específicos ou ao exercício do poder de polícia.",
    category: "Espécies Tributárias"
  },
  {
    id: 6,
    question: "Quais são os impostos de competência da União?",
    options: [
      "IPTU, ITBI, ISS",
      "ICMS, IPVA, ITCMD",
      "II, IE, IR, IPI, IOF, ITR, IGF",
      "Apenas IR e IPI"
    ],
    correctAnswer: 2,
    explanation: "São impostos federais: II (Importação), IE (Exportação), IR (Renda), IPI (Produtos Industrializados), IOF (Operações Financeiras), ITR (Territorial Rural) e IGF (Grandes Fortunas).",
    category: "Competência Tributária"
  },
  {
    id: 7,
    question: "Quais são os impostos de competência dos Estados?",
    options: [
      "IPTU, ITBI, ISS",
      "ICMS, IPVA, ITCMD",
      "IR, IPI, IOF",
      "II, IE, ITR"
    ],
    correctAnswer: 1,
    explanation: "Os Estados têm competência para instituir: ICMS (Circulação de Mercadorias e Serviços), IPVA (Propriedade de Veículos Automotores) e ITCMD (Transmissão Causa Mortis e Doação).",
    category: "Competência Tributária"
  },
  {
    id: 8,
    question: "Quais são os impostos de competência dos Municípios?",
    options: [
      "ICMS, IPVA, ITCMD",
      "IR, IPI, IOF",
      "IPTU, ITBI, ISS",
      "II, IE, ITR"
    ],
    correctAnswer: 2,
    explanation: "Os Municípios podem instituir: IPTU (Predial e Territorial Urbano), ITBI (Transmissão de Bens Imóveis) e ISS (Serviços de Qualquer Natureza).",
    category: "Competência Tributária"
  },
  {
    id: 9,
    question: "O que é o Fato Gerador no Direito Tributário?",
    options: [
      "O momento do pagamento do tributo",
      "A situação definida em lei que, ao ocorrer, gera a obrigação tributária",
      "O documento que comprova o pagamento",
      "A lei que cria o tributo"
    ],
    correctAnswer: 1,
    explanation: "Fato Gerador é a situação concreta definida abstratamente em lei que, ao ocorrer, faz nascer a obrigação tributária.",
    category: "Obrigação Tributária"
  },
  {
    id: 10,
    question: "O que é a Base de Cálculo de um tributo?",
    options: [
      "O valor total a ser pago",
      "A taxa de juros aplicada",
      "O valor sobre o qual se aplica a alíquota",
      "O prazo para pagamento"
    ],
    correctAnswer: 2,
    explanation: "Base de Cálculo é o valor sobre o qual se aplica a alíquota (percentual ou valor fixo) para determinar o montante do tributo a ser pago.",
    category: "Obrigação Tributária"
  },
  {
    id: 11,
    question: "Qual é o Código Tributário Nacional (CTN)?",
    options: [
      "Lei 5.172/1966",
      "Constituição Federal de 1988",
      "Lei 8.137/1990",
      "Decreto-Lei 200/1967"
    ],
    correctAnswer: 0,
    explanation: "O Código Tributário Nacional é a Lei 5.172/1966, que estabelece normas gerais de direito tributário aplicáveis à União, Estados e Municípios.",
    category: "Legislação Tributária"
  },
  {
    id: 12,
    question: "O que é Imunidade Tributária?",
    options: [
      "Perdão de dívidas tributárias",
      "Limitação constitucional que impede a criação de tributos sobre certas situações",
      "Redução de alíquotas",
      "Parcelamento de débitos"
    ],
    correctAnswer: 1,
    explanation: "Imunidade Tributária é uma limitação constitucional ao poder de tributar, impedindo que determinadas pessoas, bens ou situações sejam tributados.",
    category: "Imunidade e Isenção"
  },
  {
    id: 13,
    question: "Qual a diferença entre Imunidade e Isenção?",
    options: [
      "Não há diferença",
      "Imunidade é constitucional, Isenção é legal",
      "Imunidade é temporária, Isenção é permanente",
      "Imunidade é federal, Isenção é estadual"
    ],
    correctAnswer: 1,
    explanation: "Imunidade é uma vedação constitucional que impede a criação do tributo, enquanto Isenção é uma dispensa legal do pagamento de um tributo já existente.",
    category: "Imunidade e Isenção"
  },
  {
    id: 14,
    question: "O que é o Princípio da Capacidade Contributiva?",
    options: [
      "Todos pagam o mesmo valor de tributo",
      "Os tributos devem ser proporcionais à capacidade econômica do contribuinte",
      "Apenas empresas pagam tributos",
      "Tributos são opcionais"
    ],
    correctAnswer: 1,
    explanation: "O Princípio da Capacidade Contributiva estabelece que os tributos devem ser graduados conforme a capacidade econômica do contribuinte, respeitando a justiça fiscal.",
    category: "Princípios Constitucionais"
  },
  {
    id: 15,
    question: "O que é Contribuição de Melhoria?",
    options: [
      "Tributo para melhorar a educação",
      "Tributo cobrado em razão de obra pública que valoriza imóvel",
      "Contribuição para aposentadoria",
      "Taxa de fiscalização"
    ],
    correctAnswer: 1,
    explanation: "Contribuição de Melhoria é um tributo cobrado quando uma obra pública gera valorização imobiliária, sendo limitada ao acréscimo de valor do imóvel.",
    category: "Espécies Tributárias"
  },
  {
    id: 16,
    question: "O que são Empréstimos Compulsórios?",
    options: [
      "Empréstimos bancários obrigatórios",
      "Tributos excepcionais que devem ser restituídos",
      "Doações ao governo",
      "Financiamentos habitacionais"
    ],
    correctAnswer: 1,
    explanation: "Empréstimos Compulsórios são tributos de natureza excepcional, instituídos em situações específicas (guerra, calamidade, investimento público urgente), que devem ser restituídos ao contribuinte.",
    category: "Espécies Tributárias"
  },
  {
    id: 17,
    question: "O que é o Princípio da Anterioridade Nonagesimal?",
    options: [
      "Tributo só pode ser cobrado após 30 dias",
      "Tributo só pode ser cobrado após 60 dias",
      "Tributo só pode ser cobrado após 90 dias da publicação da lei",
      "Tributo só pode ser cobrado após 180 dias"
    ],
    correctAnswer: 2,
    explanation: "O Princípio da Anterioridade Nonagesimal (ou noventena) estabelece que deve haver um intervalo mínimo de 90 dias entre a publicação da lei e a cobrança do tributo.",
    category: "Princípios Constitucionais"
  },
  {
    id: 18,
    question: "O que é Competência Residual?",
    options: [
      "Competência dos Estados para criar taxas",
      "Poder da União de criar novos impostos não previstos na Constituição",
      "Competência dos Municípios para cobrar IPTU",
      "Poder de perdoar dívidas tributárias"
    ],
    correctAnswer: 1,
    explanation: "Competência Residual é o poder exclusivo da União de instituir novos impostos não previstos expressamente na Constituição, desde que sejam não-cumulativos e não tenham fato gerador ou base de cálculo próprios dos já discriminados.",
    category: "Competência Tributária"
  },
  {
    id: 19,
    question: "O que é o Princípio do Não-Confisco?",
    options: [
      "Proibição de cobrar tributos",
      "Proibição de tributos com efeito confiscatório que comprometam o patrimônio",
      "Obrigação de devolver tributos pagos",
      "Permissão para não pagar tributos"
    ],
    correctAnswer: 1,
    explanation: "O Princípio do Não-Confisco veda que os tributos tenham efeito confiscatório, ou seja, não podem comprometer substancialmente o patrimônio ou a atividade econômica do contribuinte.",
    category: "Princípios Constitucionais"
  },
  {
    id: 20,
    question: "Quem é o Sujeito Ativo da obrigação tributária?",
    options: [
      "O contribuinte que paga o tributo",
      "O Estado ou entidade com direito de exigir o tributo",
      "O advogado tributarista",
      "O contador da empresa"
    ],
    correctAnswer: 1,
    explanation: "Sujeito Ativo é o Estado (União, Estados, Municípios ou DF) ou a entidade que tem o direito de exigir o cumprimento da obrigação tributária.",
    category: "Obrigação Tributária"
  },
  {
    id: 21,
    question: "O que é Lançamento Tributário?",
    options: [
      "O pagamento do tributo",
      "Ato administrativo que constitui o crédito tributário",
      "A criação de uma nova lei tributária",
      "A fiscalização da empresa"
    ],
    correctAnswer: 1,
    explanation: "Lançamento é o ato administrativo que constitui o crédito tributário, verificando a ocorrência do fato gerador, determinando a matéria tributável, calculando o montante devido e identificando o sujeito passivo.",
    category: "Crédito Tributário"
  },
  {
    id: 22,
    question: "Quais são formas de extinção do crédito tributário?",
    options: [
      "Apenas o pagamento",
      "Pagamento, compensação, transação, remissão, prescrição, decadência",
      "Apenas a prescrição",
      "Não existe extinção de crédito tributário"
    ],
    correctAnswer: 1,
    explanation: "O crédito tributário pode ser extinto por: pagamento, compensação, transação, remissão, prescrição, decadência, conversão de depósito em renda, pagamento antecipado, consignação em pagamento, decisão administrativa irreformável, decisão judicial passada em julgado e dação em pagamento.",
    category: "Crédito Tributário"
  },
  {
    id: 23,
    question: "O que é Solidariedade na obrigação tributária?",
    options: [
      "Ajuda mútua entre contribuintes",
      "Quando várias pessoas são responsáveis pela mesma obrigação tributária",
      "Doação de tributos",
      "Parcelamento de dívidas"
    ],
    correctAnswer: 1,
    explanation: "Solidariedade ocorre quando duas ou mais pessoas são igualmente obrigadas pela mesma obrigação tributária, podendo o Fisco exigir de qualquer uma delas o total da dívida.",
    category: "Obrigação Tributária"
  },
  {
    id: 24,
    question: "O que caracteriza uma Taxa?",
    options: [
      "Tributo não vinculado a atividade estatal",
      "Tributo vinculado a serviço público específico ou poder de polícia",
      "Tributo sobre a renda",
      "Tributo sobre propriedade"
    ],
    correctAnswer: 1,
    explanation: "Taxa é um tributo vinculado, cobrado em razão do exercício regular do poder de polícia ou pela utilização, efetiva ou potencial, de serviço público específico e divisível.",
    category: "Espécies Tributárias"
  },
  {
    id: 25,
    question: "O que é Progressividade Tributária?",
    options: [
      "Tributo que aumenta com o tempo",
      "Alíquota que aumenta conforme aumenta a base de cálculo",
      "Tributo que diminui anualmente",
      "Taxa fixa para todos"
    ],
    correctAnswer: 1,
    explanation: "Progressividade é a técnica de tributação em que a alíquota aumenta à medida que aumenta a base de cálculo, respeitando o princípio da capacidade contributiva (exemplo: Imposto de Renda).",
    category: "Técnicas de Tributação"
  }
];

const QuizGame: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(questions.length).fill(false));
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [timeElapsed, setTimeElapsed] = useState<number>(0);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (!quizFinished) {
      const timer = setInterval(() => {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime, quizFinished]);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    if (answerIndex === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizFinished(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = (): string => {
    const percentage = (score / questions.length) * 100;
    if (percentage === 100) return "🏆 Perfeito! Você é um expert em Direito Tributário!";
    if (percentage >= 80) return "🎉 Excelente! Você domina bem o assunto!";
    if (percentage >= 60) return "👍 Muito bom! Continue estudando!";
    if (percentage >= 40) return "📚 Bom esforço! Revise os conceitos!";
    return "💪 Continue estudando! A prática leva à perfeição!";
  };

  if (quizFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <h1>📊 Resultado Final</h1>
        </div>
        <div className="quiz-result">
          <div className="result-score">
            <div className="score-circle">
              <svg viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="score-circle-bg" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  className="score-circle-fill"
                  style={{
                    strokeDasharray: `${percentage * 2.827}, 282.7`,
                    stroke: percentage >= 80 ? '#10b981' : percentage >= 60 ? '#f59e0b' : '#ef4444'
                  }}
                />
              </svg>
              <div className="score-text">
                <span className="score-number">{percentage}%</span>
                <span className="score-label">{score}/{questions.length}</span>
              </div>
            </div>
          </div>
          <h2>{getScoreMessage()}</h2>
          <div className="result-stats">
            <div className="stat-item">
              <span className="stat-icon">✅</span>
              <span className="stat-label">Acertos</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">❌</span>
              <span className="stat-label">Erros</span>
              <span className="stat-value">{questions.length - score}</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">⏱️</span>
              <span className="stat-label">Tempo</span>
              <span className="stat-value">{formatTime(timeElapsed)}</span>
            </div>
          </div>
          <button className="btn-restart" onClick={handleRestartQuiz}>
            🔄 Jogar Novamente
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>⚖️ Quiz de Direito Tributário</h1>
        <div className="quiz-info">
          <span className="quiz-timer">⏱️ {formatTime(timeElapsed)}</span>
          <span className="quiz-score">🎯 {score}/{questions.length}</span>
        </div>
      </div>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="question-card">
        <div className="question-header">
          <span className="question-number">Questão {currentQuestion + 1} de {questions.length}</span>
          <span className="question-category">{question.category}</span>
        </div>

        <h2 className="question-text">{question.question}</h2>

        <div className="options-container">
          {question.options.map((option, index) => {
            let optionClass = 'option';
            if (selectedAnswer !== null) {
              if (index === question.correctAnswer) {
                optionClass += ' correct';
              } else if (index === selectedAnswer) {
                optionClass += ' incorrect';
              } else {
                optionClass += ' disabled';
              }
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
                {selectedAnswer !== null && index === question.correctAnswer && (
                  <span className="option-icon">✓</span>
                )}
                {selectedAnswer === index && index !== question.correctAnswer && (
                  <span className="option-icon">✗</span>
                )}
              </button>
            );
          })}
        </div>

        {showExplanation && (
          <div className={`explanation ${selectedAnswer === question.correctAnswer ? 'correct' : 'incorrect'}`}>
            <h3>
              {selectedAnswer === question.correctAnswer ? '✅ Correto!' : '❌ Incorreto!'}
            </h3>
            <p>{question.explanation}</p>
          </div>
        )}

        {showExplanation && (
          <button className="btn-next" onClick={handleNextQuestion}>
            {currentQuestion < questions.length - 1 ? 'Próxima Questão →' : 'Ver Resultado 🎯'}
          </button>
        )}
      </div>

      <div className="quiz-footer">
        <p>📚 Baseado no conteúdo: Introdução ao Direito Tributário</p>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <QuizGame />
  </React.StrictMode>
);
