import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="mt-8 py-12 px-6 bg-background">
      <div className="font-forma container mx-auto max-w-5xl space-y-16 tracking-wide">
        <div className="text-center mb-4 tracking-wider">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
            İletişim
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 text-base text-muted-foreground">
          <div className="p-6 rounded-lg bg-background border shadow-sm">
            <p className="font-medium text-foreground mb-2">E-posta</p>
            <a
              href="mailto:myigitbilall@gmail.com"
              className="underline"
            >
              myigitbilall@gmail.com
            </a>
          </div>

          <div className="p-6 rounded-lg bg-background border shadow-sm">
            <p className="font-medium text-foreground mb-2">Telefon</p>
            <a
              href="tel:+905535643068"
              className="underline "
            >
              0553 564 30 68
            </a>
          </div>

      
        </div>

        {/* Alttaki Vurgu Cümlesi */}
      </div>
    </section>
  );
};

export default ContactSection;
