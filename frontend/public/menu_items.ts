interface MenuItem {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
}

export const menu_salgados: MenuItem[] = [
  {
    name: "Crepe Francês vegetariano",
    description:
      "Queijo muçarela, cebola caramelizada, gorgonzola, nozes e manjericão.",
    imageUrl: "/salgados/vegetariano.avif",
    price: 31.9,
  },
  {
    name: "Crepe Bacon",
    description: "Cubos de bacon, milho e muçarela.",
    imageUrl: "/salgados/bacon.avif",
    price: 29.9,
  },
  {
    name: "Crepe Calabresa",
    description: "Cubos de calabresa e queijo muçarela.",
    imageUrl: "/salgados/calabresa.avif",
    price: 27.9,
  },
  {
    name: "Crepe Carne Desfiada",
    description:
      "Carne desfiada, cebola caramelizada, cheddar cremoso e muçarela.",
    imageUrl: "/salgados/carne_desfiada.avif",
    price: 32.9,
  },
  {
    name: "Crepe Frango Cremoso",
    description: `Frango cremoso com milho, batata palha, e queijo muçarela. Não é possível retirar o milho deste ítem.`,
    imageUrl: "/salgados/frango_cremoso.avif",
    price: 29.9,
  },
  {
    name: "Crepe Frango com Requeijão",
    description: "Queijo muçarela, frango desfiado e requeijão cremoso.",
    imageUrl: "/salgados/frango_requeijao.avif",
    price: 30.9,
  },
  {
    name: "Crepe Marguerita",
    description: "Cubos de tomate, muçarela, manjericão.",
    imageUrl: "/salgados/marguerita.avif",
    price: 23.9,
  },
  {
    name: "Crepe Pizza",
    description: "Cubos de tomate, muçarela, orégano e presunto.",
    imageUrl: "/salgados/pizza.jpg",
    price: 24.9,
  },
  {
    name: "Crepe Rúcula com Tomate seco",
    description: "Folhas de rúcula, tomate seco e queijo muçarela.",
    imageUrl: "/salgados/rucula_tomate_seco.jpg",
    price: 29.9,
  },
];

export const menu_doces: MenuItem[] = [
  {
    name: "Banana e doce de leite",
    description: "Crepe de rodelas de banana com doce de leite.",
    imageUrl: "/doces/banana_doce_leite.jpg",
    price: 23.9,
  },
  {
    name: "Banofee",
    description:
      "Doce de leite, farofinha especial, caramelo artesanal e banana.",
    imageUrl: "/doces/banofee.avif",
    price: 27.9,
  },
  {
    name: "Chocolate e Banana",
    description: "Rodelas de banana e chocolate preto.",
    imageUrl: "/doces/chocolate_banana.jpeg",
    price: 24.9,
  },
  {
    name: "Nutella e Banana",
    description: "Rodelas De Banana Com A Original Nutella.",
    imageUrl: "/doces/banana_nutella.jpg",
    price: 30.9,
  },
  {
    name: "Nutella e Morango",
    description: "Original Nutela E Rodelas De Morango.",
    imageUrl: "/doces/morango_nutella.jpg",
    price: 34.9,
  },
  {
    name: "Romeu e Julieta",
    description: "Queijo Muçarela e Goiabada.",
    imageUrl: "/doces/romeu_julieta.jpg",
    price: 25.9,
  },
  {
    name: "Sensação",
    description: "Morangos frescos e chocolate.",
    imageUrl: "/doces/sensacao.avif",
    price: 16.9,
  },
];
