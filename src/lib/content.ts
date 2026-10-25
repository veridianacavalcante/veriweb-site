import {
  Globe,
  Smartphone,
  Code2,
  Cloud,
  Bot,
  Boxes,
  Search,
  FileText,
  Rocket,
  type LucideIcon,
} from "lucide-react";

// Textos do site. Para mudar um texto, edite aqui.

// [rótulo do menu, id da seção]
export const nav = [
  ["Início", "inicio"],
  ["Serviços", "servicos"],
  ["Como trabalhamos", "processo"],
  ["FAQ", "faq"],
  ["Contato", "contato"],
] as const;

type Item = { icon: LucideIcon; t: string; d: string };

export const services: Item[] = [
  {
    icon: Globe,
    t: "Desenvolvimento Web",
    d: "Sites institucionais, landing pages e e-commerces rápidos e otimizados.",
  },
  {
    icon: Smartphone,
    t: "Aplicativos",
    d: "Apps para iOS e Android com experiência fluida e nativa.",
  },
  {
    icon: Code2,
    t: "Software Personalizado",
    d: "Soluções sob medida para os processos específicos da sua empresa.",
  },
  { icon: Cloud, t: "SaaS", d: "Plataformas de software como serviço, escaláveis e seguras." },
  { icon: Bot, t: "Automação e IA", d: "Automação de processos, integrações e agentes de IA." },
  { icon: Boxes, t: "ERP", d: "Sistemas de gestão empresarial personalizados para sua operação." },
];

export const steps: Item[] = [
  { icon: Search, t: "Diagnóstico", d: "Entendemos seu problema e seus objetivos." },
  { icon: FileText, t: "Proposta", d: "Definimos escopo, prazo e investimento." },
  { icon: Code2, t: "Desenvolvimento", d: "Criamos a solução com entregas parciais." },
  { icon: Rocket, t: "Entrega e suporte", d: "Lançamos e acompanhamos a evolução do projeto." },
];

export const faqs: [string, string][] = [
  [
    "Como funciona o atendimento online?",
    "Todo o projeto é feito de forma 100% digital, por videochamadas, WhatsApp e e-mail. Assim, você acompanha cada etapa de onde estiver, com total comodidade e sem precisar se deslocar.",
  ],
  [
    "Qual o prazo médio de entrega?",
    "O prazo varia conforme a necessidade do seu projeto: sites institucionais e páginas de vendas costumam ficar prontos em poucas semanas. Já sistemas e aplicativos maiores são divididos em etapas. Definimos e alinhamos o prazo exato com você antes de iniciar qualquer trabalho.",
  ],
  [
    "Como é definido o orçamento?",
    "Primeiro entendemos a sua necessidade em um diagnóstico. Depois, preparamos uma proposta personalizada com o escopo, o prazo e o investimento detalhados, garantindo total transparência e sem surpresas no meio do caminho.",
  ],
  [
    "Vocês oferecem suporte e acompanhamento após o lançamento?",
    "Sim! Não deixamos você na mão após a entrega. Oferecemos planos de suporte, atualizações e melhorias contínuas para garantir que o seu projeto continue seguro, rápido e pronto para crescer junto com a sua empresa.",
  ],
];

// Opções do campo "Serviço de interesse" do formulário
export const serviceOptions = [...services.map((s) => s.t), "Outro"];
