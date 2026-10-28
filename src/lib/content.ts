import {
  Globe,
  Smartphone,
  Code2,
  Cloud,
  Bot,
  Boxes,
  Network,
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
    icon: Bot,
    t: "Agentes de IA",
    d: "Assistentes inteligentes que atendem clientes, respondem dúvidas e executam tarefas no seu negócio.",
  },
  {
    icon: Smartphone,
    t: "Aplicativos",
    d: "Apps para iOS e Android com experiência fluida e nativa.",
  },
  {
    icon: Bot,
    t: "Automação",
    d: "Integrações e fluxos que eliminam trabalho manual e reduzem erros nos seus processos.",
  },
  {
    icon: Globe,
    t: "Desenvolvimento Web",
    d: "Sites institucionais, landing pages e e-commerces rápidos e otimizados.",
  },
  { icon: Boxes, t: "ERP", d: "Sistemas de gestão empresarial personalizados para sua operação." },
  {
    icon: Network,
    t: "Integração de Sistemas",
    d: "Conectamos sistemas e plataformas para automatizar processos e simplificar operações.",
  },
  { icon: Cloud, t: "SaaS", d: "Plataformas de software como serviço, escaláveis e seguras." },
  {
    icon: Code2,
    t: "Software Personalizado",
    d: "Soluções sob medida para os processos específicos da sua empresa.",
  },
];

export const steps: Item[] = [
  { icon: Search, t: "Diagnóstico", d: "Entendemos seu problema e seus objetivos." },
  { icon: FileText, t: "Proposta", d: "Definimos escopo, prazo e investimento." },
  { icon: Code2, t: "Desenvolvimento", d: "Criamos a solução com entregas parciais." },
  { icon: Rocket, t: "Entrega e suporte", d: "Lançamos e acompanhamos a evolução do projeto." },
];

export const faqs: [string, string][] = [
  [
    "O que é uma software house?",
    "É uma empresa especializada em criar software sob encomenda, como sistemas, aplicativos, sites e plataformas. A VERIWEB faz isso de forma 100% online, do diagnóstico ao suporte depois do lançamento.",
  ],
  [
    "Quanto custa desenvolver um software sob medida?",
    "Depende do que o seu negócio precisa. Por isso o orçamento é gratuito: entendemos o seu projeto e entregamos uma proposta com escopo, prazo e investimento detalhados, sem surpresas no meio do caminho.",
  ],
  [
    "A VERIWEB atende empresas de qualquer cidade?",
    "Sim. Todo o projeto é feito online, por videochamada, WhatsApp e e-mail, então atendemos empresas de qualquer lugar do Brasil.",
  ],
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
