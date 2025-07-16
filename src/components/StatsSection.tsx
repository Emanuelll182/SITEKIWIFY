import { Clock, TrendingUp, Users } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Clock,
      value: "+95%",
      label: "de Redução no Tempo de Setup",
      description: "Configure automações em minutos, não horas"
    },
    {
      icon: TrendingUp,
      value: "+8h",
      label: "de Tempo Economizado por Semana",
      description: "Mais tempo para focar no que realmente importa"
    },
    {
      icon: Users,
      value: "+150",
      label: "Clientes Satisfeitos",
      description: "Profissionais que já aceleraram seus negócios"
    }
  ];

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center space-y-4 p-6 rounded-xl bg-card glow-card hover:scale-105 transition-smooth"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary mb-4">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-accent">{stat.value}</h3>
                <p className="text-lg font-semibold text-foreground">{stat.label}</p>
                <p className="text-muted-foreground">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;