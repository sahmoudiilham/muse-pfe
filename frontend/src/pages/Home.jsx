import Navbar from '../components/Navbar';
import './Home.scss';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="hero-container text-center p-5">
        <h1>Bienvenue sur Muse</h1>
        <p>Découvrez votre style idéal ✨</p>
        <a href="/morphologie" className="btn btn-primary mt-3">Commencer</a>
      </div>
    </>
  );
}
