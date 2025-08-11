import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Filter, Zap, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductsSection = () => {
  const [activeFilter, setActiveFilter] = useState("todos");
  const { toast } = useToast();

  const filters = [
    { id: "todos", label: "Todos", icon: Filter },
  ];

  const products = [
    {
      id: 1,
      name: "PACK 1000 TEMPLATES DE AUTOMAÇÃO + BÔNUS",
      category: "Todos",
      price: "19,99",
      old_price: "39,90",
      tools: [
        "ASSISTENTE DE ATENDIMENTO",
        "EMAIL MARKETING",
        "TRANSCRIÇÃO DE ÁUDIO",
        "E MUITO MAIS",
      ],
      description: "COMECE A DOMINAR O N8N COM NOSSO PACK DE 1000 TEMPLATES",
      featured: true,
    },
    {
      id: 2,
      name: "PACK DE 2000 TEMPLATES DE AUTOMAÇÃO + SUPER BÔNUS",
      category: "Todos",
      price: "29,99",
      old_price: "49,90",
      tools: [
        "BOTS DE VENDA",
        "AGENDAMENTO",
        "PROSPECÇÃO DE CLIENTE",
        "E MUITO MAIS",
      ],
      description: "DOMINE O N8N COM NOSSO PACK DE 2000 TEMPLATES",
      featured: true,
    },
  ];

  const filteredProducts =
    activeFilter === "todos"
      ? products
      : products.filter((product) => product.category === activeFilter);

  const handlePurchaseClick = async (product: any) => {
    try {
      // Enviar dados para o webhook n8n
      const formData = new FormData();
      formData.append("nome", "Cliente Visitante");
      formData.append("email", "leads@nextflow.com.br");
      formData.append(
        "descricao",
        `Cliente interessado no produto: ${product.name} - Valor: R$ ${product.price}`
      );
      formData.append("produto_id", product.id.toString());
      formData.append("produto_nome", product.name);
      formData.append("produto_preco", product.price);
      formData.append("tipo_contato", "interesse_compra");

      await fetch("https://webhook.kecs.com.br/webhook/coleta-formularios", {
        method: "POST",
        body: formData,
      });

      toast({
        title: "Redirecionando para pagamento...",
        description:
          "Você será direcionado para a página de compra. Nossa equipe entrará em contato via WhatsApp!",
      });

      setTimeout(() => {
        if (product.id === 1) {
          window.open(`https://pay.kiwify.com.br/B4ESihl`, "_blank");
        } else if (product.id === 2) {
          window.open(`https://pay.kiwify.com.br/mt8SsJb`, "_blank");
        }
      }, 1000);
    } catch (error) {
      console.error("Erro ao processar compra:", error);
      toast({
        title: "Erro",
        description:
          "Houve um problema. Tente novamente ou entre em contato pelo chat.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="produtos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl md:text-5xl font-bold">
            Explore Nossos{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Workflows Prontos
            </span>{" "}
            para Ação
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Templates testados e aprovados que você pode implementar em minutos
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={
                activeFilter === filter.id ? "default" : "outline-primary"
              }
              onClick={() => setActiveFilter(filter.id)}
              className="flex items-center gap-2"
            >
              <filter.icon className="w-4 h-4" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Grid de Produtos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-card rounded-xl p-6 glow-card hover:scale-105 transition-smooth group"
            >
              <div className="space-y-4">
                {/* Header do Card */}
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    {product.featured && (
                      <Badge className="bg-cta text-cta-foreground">
                        <Zap className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground line-through">
                      R$ {product.old_price}
                    </p>
                    <p className="text-2xl font-bold text-cta">
                      R$ {product.price}
                    </p>
                  </div>
                </div>

                {/* Descrição */}
                <p className="text-muted-foreground">{product.description}</p>

                {/* Ferramentas */}
                <div className="space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    Ferramentas integradas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {product.tools.map((tool, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Selo de Fácil Instalação */}
                <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <Package className="w-4 h-4 text-accent" />
                  <span className="text-sm font-medium text-accent">
                    Fácil Instalação
                  </span>
                </div>

                {/* Botão de Compra */}
                <Button
                  variant="cta"
                  className="w-full group"
                  onClick={() => handlePurchaseClick(product)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  Comprar por R$ {product.price}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
