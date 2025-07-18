import { useState, useEffect } from "react";
import { LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import LoginModal from "../LoginModal";

const FloatingLoginButton = () => {
  const { toast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);

  // Verifica se o usuário já está logado ao carregar a página
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setUserName(savedName);
    }
  }, []);

  const handleLogin = () => {
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userToken");
    setUserName(null);
    toast({
      title: "Você saiu da conta.",
      description: "Login removido com sucesso.",
    });
  };

  return (
    <>
      <div className="fixed top-6 right-6 z-50 flex items-center gap-4"
      data-tutorial-target="floating-login">
        {userName ? (
          <>
            <span className="text-sm font-medium text-muted-foreground">
              Olá, {userName} 👋
            </span>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="shadow-elegant hover:shadow-glow transition-smooth"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </>
        ) : (
          <Button
            onClick={handleLogin}
            variant="outline-primary"
            size="default"
            className="shadow-elegant hover:shadow-glow transition-smooth"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login
          </Button>
        )}
      </div>

      {/* Modal de login */}
      <LoginModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          // Após login bem-sucedido no modal, recarregue o nome
          const nome = localStorage.getItem("userName");
          if (nome) setUserName(nome);
        }}
      />
    </>
  );
};

export default FloatingLoginButton;
