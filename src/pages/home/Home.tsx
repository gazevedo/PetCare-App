import './home.css';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Home() {
  return (
    <div className="container">
      {/* TOPO */}
      <header className="header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="menu-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
        <div style={{ width: 24 }} />
      </header>

      {/* BANNER */}
      <div className="banner-container">
        <img
          src="/banner.png" // Substitua pela URL ou caminho local correto
          alt="Banner de propaganda"
          className="banner"
        />
      </div>

      {/* LINHA DE ÍCONES */}
      <div className="icon-row">
        <WhatsAppIcon className="icon" />
        <LocationOnIcon className="icon" />
        <div className="logo-circle">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>
        <FacebookIcon className="icon" />
        <InstagramIcon className="icon" />
      </div>

      {/* TÍTULO CENTRALIZADO */}
      <span className="title">Meu App</span>

      {/* BOTOES EM ESTILO CARD */}
      <div className="card-container">
        <div className="card">Meu Pets</div>
        <div className="card">Agenda</div>
        <div className="card">Produtos</div>
        <div className="card">Serviços</div>
        <div className="card">Promoções</div>
        <div className="card">Bem-estar</div>
      </div>
    </div>
  );
}

