import { Rocket, Target, BookOpen } from "lucide-react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: Rocket,
      title: "Agilidade Imediata",
      description: "Lance em minutos, não semanas. Nossos templates são plug-and-play para resultados instantâneos.",
      color: "text-cta"
    },
    {
      icon: Target,
      title: "Entrada Rápida no Mercado",
      description: "Comece a oferecer automações para clientes hoje mesmo. Seja o especialista que todos procuram.",
      color: "text-accent"
    },
    {
      icon: BookOpen,
      title: "Acelere seu Aprendizado",
      description: "Aprenda na prática com workflows reais. Cada template é uma masterclass em automação.",
      color: "text-primary"
    }
  ];

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Lance em <span className="gradient-accent bg-clip-text text-transparent">Minutos</span>, 
            Aprenda por <span className="gradient-primary bg-clip-text text-transparent">Meses</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Você vai conseguir implementar automações profissionais sem a curva de aprendizado tradicional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="text-center space-y-6 p-8 rounded-2xl bg-card glow-card hover:scale-105 transition-smooth group"
            >
              <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-background to-card border-2 border-primary/20 group-hover:border-primary/40 transition-colors`}>
                <benefit.icon className={`w-10 h-10 ${benefit.color}`} />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-accent font-medium">
            "Imagine ter isso pronto hoje" • "É mais simples do que parece"
          </p>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;