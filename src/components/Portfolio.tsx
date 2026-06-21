import Navigation from "@/components/Navigation"
import AboutSection from "@/components/About"
import Areas from "@/components/Areas"
import Programs from "@/components/Programs"
import References from "@/components/References"
import { Works } from "@/components/Works"
import ContactSection from "@/components/Contact"
import Footer from "@/components/Footer"

const Portfolio = () => (
  <div className="min-h-screen bg-background">
    <Navigation />
    <AboutSection />
    <Areas />
    <Programs />
    <References />
    <Works />
    <ContactSection />
    <Footer />
  </div>
)

export default Portfolio