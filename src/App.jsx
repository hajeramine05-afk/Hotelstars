import { useState } from 'react'
import './App.css'

const rooms = [
  {
    name: 'Chambre Jardin',
    detail: 'Un refuge lumineux, ouvert sur la végétation.',
    price: 'À partir de 185 €',
    image: 'photo-1611892440504-42a792e24d32',
    alt: 'Chambre lumineuse aux matières naturelles',
  },
  {
    name: 'Suite Azur',
    detail: 'Le bleu de la Méditerranée comme horizon.',
    price: 'À partir de 290 €',
    image: 'photo-1616486338812-3dadae4b4ace',
    alt: 'Suite élégante ouverte sur une terrasse ensoleillée',
  },
  {
    name: 'Suite Étoile',
    detail: 'Un espace rare, pensé pour prendre son temps.',
    price: 'À partir de 420 €',
    image: 'photo-1615874959474-d609969a20ed',
    alt: 'Suite de caractère aux teintes douces',
  },
]

const experiences = [
  ['01', 'La table du jardin', 'La Provence dans l’assiette, au rythme des saisons.'],
  ['02', 'Le temps suspendu', 'Un massage sur mesure, à l’ombre des oliviers.'],
  ['03', 'La côte autrement', 'Nos adresses secrètes, de crique en village perché.'],
]

function App() {
  const [guests, setGuests] = useState(2)
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingMessage, setBookingMessage] = useState('')
  const localToday = new Date()
  localToday.setMinutes(localToday.getMinutes() - localToday.getTimezoneOffset())
  const earliestDate = localToday.toISOString().slice(0, 10)

  function submitBooking(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const arrival = formData.get('arrival')
    const departure = formData.get('departure')
    if (arrival < earliestDate || departure <= arrival) {
      setBookingMessage('Choisissez une arrivée à partir d’aujourd’hui et un départ après celle-ci.')
      return
    }
    setBookingMessage(`Votre demande pour ${guests} voyageur${guests > 1 ? 's' : ''} est prête. Contactez-nous pour confirmer les disponibilités.`)
  }

  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#accueil" aria-label="Hotel Stars, accueil">
          <span className="wordmark-star">✳</span>
          <span>HOTEL <strong>STARS</strong><small>HÔTEL DE CHARME · CÔTE D’AZUR</small></span>
        </a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          <span></span><span></span>
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Navigation principale">
          <a href="#hotel" onClick={() => setMenuOpen(false)}>L’hôtel</a>
          <a href="#chambres" onClick={() => setMenuOpen(false)}>Chambres & suites</a>
          <a href="#experiences" onClick={() => setMenuOpen(false)}>Expériences</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Nous trouver</a>
        </nav>
        <a className="header-book" href="#reserver">Réserver <span aria-hidden="true">↗</span></a>
      </header>

      <main>
        <section className="hero" id="accueil">
          <img className="hero-image" src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2400&q=90" alt="Hôtel de charme avec piscine, entouré de jardins méditerranéens" />
          <div className="hero-shade"></div>
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow"><span></span> HÔTEL DE CHARME · CÔTE D’AZUR</p>
            <h1>Un séjour<br />près du <em>soleil.</em></h1>
            <p className="hero-description">18 chambres, un accueil attentionné et toute la douceur de vivre du Sud.</p>
            <a className="hero-link" href="#hotel">Découvrez l’hôtel <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-note"><span>43° 32′ N</span><span>6° 56′ E</span><i></i><span>RIVIERA FRANÇAISE</span></div>
          <div className="hero-counter"><span>01</span><i></i><span>04</span></div>
        </section>

        <section className="booking-wrap" id="reserver">
          <form className="booking-bar" onSubmit={submitBooking}>
            <label className="booking-field"><span>ARRIVÉE</span><input name="arrival" type="date" min={earliestDate} required aria-label="Date d’arrivée" /></label>
            <label className="booking-field"><span>DÉPART</span><input name="departure" type="date" min={earliestDate} required aria-label="Date de départ" /></label>
            <div className="booking-field guest-field"><span>VOYAGEURS</span><div className="guest-control"><button type="button" aria-label="Retirer un voyageur" onClick={() => setGuests(Math.max(1, guests - 1))}>−</button><output aria-live="polite">{guests} personnes</output><button type="button" aria-label="Ajouter un voyageur" onClick={() => setGuests(Math.min(8, guests + 1))}>+</button></div></div>
            <button className="booking-submit" type="submit">Vérifier les disponibilités <span aria-hidden="true">↗</span></button>
          </form>
          {bookingMessage && <p className="booking-message" role="status">{bookingMessage}</p>}
        </section>

        <section className="intro section-pad" id="hotel">
          <p className="eyebrow"><span></span> L’ART DE SE SENTIR AILLEURS</p>
          <div className="intro-grid">
            <h2>Un hôtel à part,<br />au rythme du <em>Sud.</em></h2>
            <div className="intro-text"><p>À l’Hotel Stars, vous êtes accueillis par une équipe présente tout au long du séjour. Installez-vous dans l’une de nos chambres, profitez du petit-déjeuner servi chaque matin et laissez-nous vous guider vers nos belles adresses de la Riviera.</p><a className="text-link" href="#experiences">Les services de l’hôtel <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="intro-details"><span>18 chambres & suites</span><span>Petit-déjeuner chaque matin</span><span>Accueil et service hôtelier</span></div>
        </section>

        <section className="rooms-section section-pad" id="chambres">
          <div className="section-heading"><div><p className="eyebrow"><span></span> VOTRE REFUGE</p><h2>Des nuits <em>étoilées.</em></h2></div><a className="text-link" href="#reserver">Toutes nos chambres <span aria-hidden="true">↗</span></a></div>
          <div className="room-grid">
            {rooms.map((room, index) => <article className="room-card" key={room.name}>
              <a className="room-image-link" href="#reserver" aria-label={`Réserver ${room.name}`}><img src={`https://images.unsplash.com/${room.image}?auto=format&fit=crop&w=1100&q=85`} alt={room.alt} loading="lazy" /><span className="room-number">0{index + 1}</span><span className="room-arrow" aria-hidden="true">↗</span></a>
              <div className="room-info"><div><h3>{room.name}</h3><p>{room.detail}</p></div><span className="room-price">{room.price}</span></div>
            </article>)}
          </div>
        </section>

        <section className="quote-section">
          <img src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=2000&q=85" alt="Village coloré de la Riviera surplombant la Méditerranée" loading="lazy" />
          <div className="quote-overlay"></div>
          <div className="quote-content"><p className="eyebrow">UNE INVITATION À DÉCONNECTER</p><blockquote>« Ici, le luxe,<br />c’est d’avoir <em>le temps.</em> »</blockquote><span>— LA PHILOSOPHIE STARS</span></div>
        </section>

        <section className="experiences section-pad" id="experiences">
          <div className="section-heading"><div><p className="eyebrow"><span></span> VIVRE LA RIVIERA</p><h2>Les jours <em>heureux.</em></h2></div><p className="experiences-intro">Des plaisirs simples, choisis avec soin.<br />Et toujours une bonne adresse à partager.</p></div>
          <div className="experience-list">{experiences.map(([number, title, description]) => <article className="experience-row" key={number}><span className="experience-number">{number}</span><h3>{title}</h3><p>{description}</p><a href="#contact" aria-label={`En savoir plus : ${title}`}>↗</a></article>)}</div>
        </section>

        <section className="review-section">
          <p className="eyebrow"><span></span> LES MOTS DE NOS HÔTES</p>
          <div className="review-stars" aria-label="5 étoiles sur 5">★★★★★</div>
          <blockquote>« Une parenthèse merveilleuse. On se sent accueillis comme des amis, dans un décor dont on ne se lasse pas. »</blockquote>
          <p className="review-author">CLAIRE & THOMAS <span>·</span> JUIN 2025</p>
        </section>

        <section className="contact-section section-pad" id="contact">
          <div><p className="eyebrow"><span></span> À BIENTÔT SOUS LE SOLEIL</p><h2>L’hôtel<br />vous <em>attend.</em></h2></div>
          <div className="contact-info"><p>12 chemin des Oliviers<br />06230 Saint-Jean-Cap-Ferrat, France</p><a href="tel:+33493000000">+33 (0)4 93 00 00 00</a><a href="mailto:bonjour@hotelstars.fr">bonjour@hotelstars.fr</a><a className="text-link" href="https://maps.google.com/?q=Saint-Jean-Cap-Ferrat" target="_blank" rel="noreferrer">Nous trouver <span aria-hidden="true">↗</span></a></div>
        </section>
      </main>

      <footer className="site-footer"><a className="wordmark footer-mark" href="#accueil"><span className="wordmark-star">✳</span><span>HOTEL <strong>STARS</strong><small>HÔTEL DE CHARME · CÔTE D’AZUR</small></span></a><p>Votre hôtel au cœur de la Riviera.</p><span>© HOTEL STARS 2025</span><a href="mailto:bonjour@hotelstars.fr">Instagram ↗</a></footer>
    </>
  )
}

export default App
