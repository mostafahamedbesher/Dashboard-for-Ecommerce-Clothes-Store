import { Link } from "react-router-dom";
interface LogoProps {
  size?: string;
}

function Logo({ size = "text-4xl" }: LogoProps) {
  return (
    <div className={`${size} uppercase tracking-wider text-primary_3 mb-10`}>
      <Link to="/">Fasco</Link>
    </div>
  );
}

export default Logo;
