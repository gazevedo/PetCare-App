import {
  Bell,
  Castle as CastleIcon,
  ChevronRight,
  Compass,
  Crown,
  Map,
  MessageSquare,
  Settings,
  Shield,
  Swords,
  Trophy,
} from "lucide-react";
import "./Home.css";
import WorldScene from "./WorldScene";

type StrongholdProps = {
  name: string;
  level: number;
  x: number;
  y: number;
  accent?: "blue" | "red" | "gold";
  size?: "small" | "large";
};

const strongholds: StrongholdProps[] = [
  { name: "Alder Keep", level: 42, x: 15, y: 35, accent: "red", size: "small" },
  { name: "Stormwatch", level: 87, x: 36, y: 29, accent: "red" },
  { name: "Valoria", level: 116, x: 58, y: 48, accent: "blue", size: "large" },
  { name: "Ravenfall", level: 73, x: 78, y: 47, accent: "red" },
  { name: "Ember Fort", level: 64, x: 23, y: 68, accent: "gold" },
  { name: "Ironcrest", level: 91, x: 76, y: 72, accent: "red" },
];

function Stronghold({ name, level, x, y, accent, size }: StrongholdProps) {
  return (
    <div className={`stronghold ${size === "small" ? "stronghold--small" : ""}`} style={{ left: `${x}%`, top: `${y}%` }}>
      <div className="stronghold__name">{name}</div>
      <div className={`stronghold__level stronghold__level--${accent ?? "red"}`}><CastleIcon size={14} /> {level}</div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="world-map">
      <WorldScene />
      <svg className="march-routes" viewBox="0 0 1000 600" preserveAspectRatio="none" aria-hidden="true">
        <path d="M330 420 C430 360 520 360 610 290" />
        <path d="M690 430 C650 385 620 350 610 290" />
      </svg>
      <div className="troop troop--a"><Swords size={15} /><b>12K</b></div>
      <div className="troop troop--b"><Shield size={15} /><b>8,4K</b></div>

      <header className="top-bar">
        <div className="player-card">
          <div className="player-card__avatar"><Crown size={27} /></div>
          <div><strong>Lord Arkan</strong><span>Reino de Valoria</span></div>
          <b>36</b>
        </div>
        <div className="resources">
          <span>🪵 <b>84,2K</b></span><span>🪨 <b>62,8K</b></span><span>🪙 <b>1,24M</b></span><span>💎 <b>742</b></span>
        </div>
        <nav className="top-actions" aria-label="Ações rápidas">
          <button aria-label="Mensagens"><MessageSquare /></button>
          <button aria-label="Notificações"><Bell /><i>3</i></button>
          <button aria-label="Configurações"><Settings /></button>
        </nav>
      </header>

      <section className="quest-card">
        <div className="quest-card__icon"><Swords /></div>
        <div><span>MISSÃO DO REINO</span><strong>Conquiste 3 fortalezas</strong><small>2 de 3 concluídas</small></div>
        <div className="quest-card__progress"><i /></div>
        <button aria-label="Abrir missão"><ChevronRight /></button>
      </section>

      {strongholds.map((stronghold) => <Stronghold key={stronghold.name} {...stronghold} />)}

      <div className="village village--one">◆</div><div className="village village--two">◆</div>
      <div className="forest-label">Floresta Sombria</div>
      <div className="region-label">PLANÍCIES DE AURORA</div>

      <aside className="event-rail">
        <button><Trophy /><span>TORNEIO<small>2d 14h</small></span></button>
        <button><Shield /><span>ESCUDO<small>08h 31m</small></span></button>
        <button><Map /><span>EXPLORAR<small>3 áreas</small></span></button>
      </aside>

      <div className="coordinates"><Compass size={16} /> X: 284 &nbsp; Y: 517</div>
      <nav className="bottom-nav" aria-label="Navegação principal">
        <button><Map /><span>Mapa</span></button>
        <button><Shield /><span>Aliança</span></button>
        <button className="bottom-nav__kingdom"><CastleIcon /><span>Reino</span></button>
        <button><Swords /><span>Exército</span></button>
        <button><Trophy /><span>Ranking</span></button>
      </nav>
    </main>
  );
}
