import { useState, useEffect } from "react";
import { X, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Tutorial = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Bem-vindo ao NextFlow!",
      description: "Vou te mostrar as principais funcionalidades da nossa plataforma de workflows de automação.",
      target: null,
      position: "center"
    },
    {
      title: "Explore Nossos Templates",
      description: "Aqui você encontra workflows prontos para usar. Filtre por categoria e encontre o que precisa.",
      target: "products-section",
      position: "center"
    },
    {
      title: "Workflow Personalizado",
      description: "Não encontrou o que precisa? Solicite um workflow customizado para sua necessidade específica.",
      target: "custom-form-section",
      position: "top"
    },
    {
      title: "Chat de Suporte",
      description: "Tire suas dúvidas através do nosso chat. Nossa equipe está pronta para te ajudar!",
      target: "floating-chat",
      position: "left"
    },
    {
      title: "Área de Login",
      description: "Faça login para acessar recursos exclusivos e acompanhar seus pedidos.",
      target: "floating-login",
      position: "left"
    }
  ];

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('nextflow-tutorial-seen');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('nextflow-tutorial-seen', 'true');
  };

  const handleSkip = () => {
    handleClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];

  const getModalPosition = () => {
    const target = currentStepData.target;
    if (!target || currentStepData.position === "center") {
      return "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }

    switch (currentStepData.position) {
      case "top":
        return "fixed top-20 left-1/2 transform -translate-x-1/2";
      case "left":
        return "fixed top-1/2 left-8 transform -translate-y-1/2";
      default:
        return "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }
  };

  const getTargetHighlight = () => {
    const target = currentStepData.target;
    if (!target) return null;

    return (
      <style>
        {`
          [data-tutorial-target="${target}"] {
            position: relative;
            z-index: 1001;
            box-shadow: 0 0 0 4px rgba(var(--primary-glow) / 0.8), 0 0 20px rgba(var(--primary) / 0.6);
            border-radius: 8px;
          }
        `}
      </style>
    );
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 z-[1000]" />
      
      {/* Highlight target element */}
      {getTargetHighlight()}

      {/* Tutorial Modal */}
      <div className={`${getModalPosition()} z-[1002] bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-2xl`}>
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground">
              {currentStep + 1} de {steps.length}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <h3 className="text-lg font-semibold mb-2 text-foreground">
          {currentStepData.title}
        </h3>
        <p className="text-muted-foreground mb-6">
          {currentStepData.description}
        </p>

        <div className="flex justify-between items-center">
          <Button
            variant="ghost"
            onClick={handleSkip}
            className="text-muted-foreground hover:text-foreground"
          >
            Pular tutorial
          </Button>
          
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={handlePrev}
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
            )}
            <Button
              onClick={handleNext}
              size="sm"
              className="bg-accent-glow hover:bg-accent text-background"
            >
              {currentStep === steps.length - 1 ? 'Finalizar' : 'Próximo'}
              {currentStep < steps.length - 1 && <ArrowRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 w-full bg-muted rounded-full h-1">
          <div 
            className="bg-accent-glow h-1 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default Tutorial;