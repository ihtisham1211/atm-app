const Header = () => {
  return (
    <div className="relative mt-8 rounded-md bg-blue p-4 flex items-center justify-center w-full">
      <img
        src="/assets/atm_sign.png"
        alt="hero-logo"
        className="object-cover w-4/5"
        loading="lazy"
      />
      <img
        src="/assets/graffiti.png"
        alt="hero-graffiti"
        className="absolute w-3/6 left-3/7 top-1/4"
        loading="lazy"
      />
    </div>
  );
};

export default Header;
