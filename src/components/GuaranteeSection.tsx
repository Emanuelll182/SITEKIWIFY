import { Shield, CheckCircle, Clock, CreditCard } from "lucide-react";

const GuaranteeSection = () => {
  const guaranteeFeatures = [
    {
      icon: Shield,
      title: "Garantia de 7 Dias",
      description: "Se não ficar satisfeito, devolvemos 100% do seu dinheiro"
    },
    {
      icon: CreditCard,
      title: "Pagamento Seguro",
      description: "Transações processadas pela Kiwify com segurança máxima"
    },
    {
      icon: CheckCircle,
      title: "Templates Testados",
      description: "Todos os workflows são testados e funcionam na vida real"
    },
    {
      icon: Clock,
      title: "Suporte Rápido",
      description: "Respondemos dúvidas em até 24 horas úteis"
    }
  ];

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Selo de Garantia Principal */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full gradient-primary mb-6 glow-primary">
              <Shield className="w-12 h-12 text-primary-foreground" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Sua Compra é <span className="gradient-cta bg-clip-text text-transparent">100% Segura</span> 
              e Sem Riscos
            </h2>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Todas as transações são processadas pela Kiwify e você tem uma garantia 
              incondicional de 7 dias. Se o workflow não atender às suas expectativas, 
              seu dinheiro será devolvido integralmente.
            </p>
          </div>

          {/* Features da Garantia */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guaranteeFeatures.map((feature, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card glow-card hover:scale-105 transition-smooth text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-4 group-hover:border-primary/40 transition-colors">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Texto de Confiança */}
          <div className="mt-12 p-6 rounded-xl bg-cta/10 border border-cta/20">
            <p className="text-lg font-medium text-cta">
              "Sua satisfação é nossa prioridade. Queremos que você tenha sucesso com nossos templates!"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;