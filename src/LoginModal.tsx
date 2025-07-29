import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // instale com: npm i uuid
import { toast } from "@/components/ui/use-toast"; // ajuste o caminho conforme sua estrutura

// 🔐 Configure seu token e IDs aqui
const BASEROW_API_TOKEN = "iuClGZn0J6mpfP06T7RoaD1awCoPCPC3";
const TABLE_ID = "624104";
const API_URL = `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/?user_field_names=true`;

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [número, setNúmero] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [visitorId, setVisitorId] = useState("");
  const [ip, setIp] = useState("");
  const userAgent = navigator.userAgent;

  // Gera ou recupera o visitor ID
  useEffect(() => {
    let id = localStorage.getItem("visitor_id");
    if (!id) {
      id = uuidv4();
      localStorage.setItem("visitor_id", id);
    }
    setVisitorId(id);
  }, []);

  // Obtém o IP do visitante
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch(() => setIp("desconhecido"));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const timestamp = new Date().toISOString();

if (!isLogin) {
  // Cadastro
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Token ${BASEROW_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "Nome": name,
        "e-mail": email,
        "Senha": password,
        "Número de WhatsApp": número,
        "Visitor ID": visitorId,
        "IP": ip,
        "User Agent": userAgent,
        "Data Cadastro": timestamp,
      }),
    });

    if (!response.ok) throw new Error("Erro ao salvar no Baserow.");

    // 🔐 Auto login após cadastro
    localStorage.setItem("userName", name);
    localStorage.setItem("userToken", "autenticado");

    toast({
      title: `Bem-vindo, ${name}!`,
      description: "Conta criada e login realizado com sucesso.",
    });

    onClose();
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao salvar no Baserow.");
  }
} else {
      // Login real
      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Authorization": `Token ${BASEROW_API_TOKEN}`,
          },
        });

        if (!response.ok) throw new Error("Erro ao buscar usuários.");

        const data = await response.json();

        const user = data?.results?.find(
          (u: any) => u["e-mail"] === email && u["Senha"] === password
        );

  if (user) {
    toast({
  title: `Bem-vindo, ${user["Nome"]}!`,
  description: "Login realizado com sucesso.",
});

    // 👉 Aqui salvamos o nome e um "token" para simular login
    localStorage.setItem("userName", user["Nome"]);
    localStorage.setItem("userToken", "autenticado");

    onClose();
  } else {
    alert("E-mail ou senha incorretos.");
  }
} catch (error) {
  console.error("Erro:", error);
  alert("Erro ao realizar login.");
}
    }
  };

  const resetForm = () => {
    setEmail("");
    setNúmero("")
    setPassword("");
    setConfirmPassword("");
    setName("");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-foreground">
              {isLogin ? "Fazer Login" : "Criar Conta"}
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                type="text"
                placeholder="Seu nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
{!isLogin && (
          <div className="space-y-2">
            <Label htmlFor="número">Número de WhatsApp</Label>
            <Input
              id="número"
              type="número"
              placeholder="(11)99999-9990"
              value={número}
              onChange={(e) => setNúmero(e.target.value)}
              required
            />
          </div>
)}
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirme sua senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isLogin ? "Entrar" : "Criar Conta"}
          </Button>
        </form>

        <Separator className="my-4" />

        <div className="text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            {isLogin ? "Ainda não tem uma conta?" : "Já tem uma conta?"}
          </p>
          <Button variant="ghost" onClick={toggleMode} className="text-primary">
            {isLogin ? "Criar uma conta" : "Fazer login"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
