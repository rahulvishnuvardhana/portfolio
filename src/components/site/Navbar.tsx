import NavLinks from "./NavLinks";
import GlitchLogo from "./GlitchLogo";

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <GlitchLogo />
        <NavLinks />
      </nav>
    </header>
  );
}
