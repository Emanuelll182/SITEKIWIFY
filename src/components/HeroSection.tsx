import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import heroImage from "@/assets/hero-workflow.jpg";


const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden tech-grid">
      <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Conteúdo Principal */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold gradient-primary bg-clip-text text-transparent leading-tight">
                O Atalho Inteligente para Dominar a Automação
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl">
                Use templates profissionais como base para seus projetos, entre no mercado mais rápido 
                e aprenda com exemplos que <span className="text-accent font-semibold">realmente funcionam</span>.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="xl" 
                variant="cta"
                onClick={() => scrollToSection('produtos')}
                className="group"
              >
                <Zap className="w-5 h-5" />
                Ver Pacotes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="xl" 
                variant="hero"
                onClick={() => scrollToSection('formulario')}
              >
                Preciso de um Workflow Customizado
              </Button>
            </div>
          </div>
          
          {/* Imagem Hero */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden glow-card">
              <img 
                src={heroImage} 
                alt="Workflow automation visualization" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;