// Conteúdo modular de serviços. Troque NEXT_PUBLIC_NICHE (ou `activeNiche`)
// para alternar entre estética facial/corporal e cirurgia estética sem tocar nos componentes.
//
// Campos de cada serviço:
//   id, title, category, description, duration, priceFrom (opcional),
//   image (URL opcional)  -> se ausente, usa o `tone` (gradiente) como fundo.
//   tone: 'rose' | 'nude' | 'pearl' | 'gold'

export const servicesByNiche = {
  estetica: [
    {
      id: "micropigmentacao",
      title: "Micropigmentação",
      category: "Sobrancelhas",
      description:
        "Design personalizado que valoriza o formato do seu rosto, com acabamento natural e delicado.",
      duration: "2h",
      priceFrom: "R$ 650",
      image: null,
      tone: "rose",
    },
    {
      id: "lash-lifting",
      title: "Lash Lifting",
      category: "Cílios",
      description:
        "Curvatura, volume e definição para um olhar aberto e luminoso, sem extensões.",
      duration: "1h15",
      priceFrom: "R$ 220",
      image: null,
      tone: "nude",
    },
    {
      id: "harmonizacao",
      title: "Harmonização Facial",
      category: "Face",
      description:
        "Equilíbrio entre estrutura e expressão, respeitando a sua identidade e proporções.",
      duration: "1h30",
      priceFrom: "R$ 1.200",
      image: null,
      tone: "gold",
    },
    {
      id: "skinbooster",
      title: "Skinbooster",
      category: "Pele",
      description:
        "Hidratação profunda e viço imediato, com protocolo desenhado para o seu tipo de pele.",
      duration: "1h",
      priceFrom: "R$ 890",
      image: null,
      tone: "pearl",
    },
  ],

  cirurgia: [
    {
      id: "rinoplastia",
      title: "Rinoplastia",
      category: "Cirurgia facial",
      description:
        "Refinamento do nariz com planejamento digital e foco em naturalidade e função.",
      duration: "Consulta 1h",
      priceFrom: null,
      image: null,
      tone: "rose",
    },
    {
      id: "blefaroplastia",
      title: "Blefaroplastia",
      category: "Cirurgia facial",
      description:
        "Rejuvenescimento do olhar com recuperação cuidadosa e resultado discreto.",
      duration: "Consulta 1h",
      priceFrom: null,
      image: null,
      tone: "nude",
    },
    {
      id: "lipo-hd",
      title: "Lipoaspiração de Alta Definição",
      category: "Cirurgia corporal",
      description:
        "Contorno corporal esculpido de forma anatômica, com acompanhamento completo.",
      duration: "Consulta 1h",
      priceFrom: null,
      image: null,
      tone: "gold",
    },
    {
      id: "mamoplastia",
      title: "Mamoplastia",
      category: "Cirurgia corporal",
      description:
        "Planejamento individualizado para harmonia, simetria e segurança em cada etapa.",
      duration: "Consulta 1h",
      priceFrom: null,
      image: null,
      tone: "pearl",
    },
  ],
};

export const activeNiche = process.env.NEXT_PUBLIC_NICHE || "estetica";

export const services = servicesByNiche[activeNiche] ?? servicesByNiche.estetica;

export const servicesCopy = {
  estetica: {
    eyebrow: "Tratamentos",
    title: "Cuidados pensados para você",
    subtitle: "Cada protocolo é desenhado de forma individual, do planejamento ao pós.",
  },
  cirurgia: {
    eyebrow: "Procedimentos",
    title: "Precisão, segurança e naturalidade",
    subtitle: "Planejamento detalhado e acompanhamento próximo em cada etapa.",
  },
}[activeNiche] ?? {
  eyebrow: "Tratamentos",
  title: "Cuidados pensados para você",
  subtitle: "Cada protocolo é desenhado de forma individual, do planejamento ao pós.",
};
