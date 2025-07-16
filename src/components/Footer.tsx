import { Instagram, Twitter, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  const contactInfo = [
    { icon: Mail, text: "contato@nextflow.com.br", href: "mailto:contato@nextflow.com.br" },
    { icon: Phone, text: "(47) 99768-1119", href: "tel:+5547997681119" }
  ];

  return (
    <footer className="bg-card/80 border-t border-border/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Logo e Descrição */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
              NextFlow
            </h3>
            <p className="text-muted-foreground">
              Templates profissionais de automação para acelerar seu negócio e dominar o n8n.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#produtos" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Ver Templates
                </a>
              </li>
              <li>
                <a 
                  href="#formulario" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Workflow Customizado
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Suporte
                </a>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Contato</h4>
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <contact.icon className="w-4 h-4 group-hover:text-accent transition-colors" />
                  {contact.text}
                </a>
              ))}
            </div>

            {/* Redes Sociais */}
            <div className="pt-4">
              <h5 className="text-sm font-medium text-foreground mb-3">Siga-nos</h5>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/50 mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            © 2024 NextFlow. Todos os direitos reservados. Desenvolvido com ❤️ para acelerar sua automação.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;