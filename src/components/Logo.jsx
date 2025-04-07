import logoKV from "/logo/karlovaVesLogo.svg";

const Logo = () => {
  return (
    <>
      <a href="https://www.karlovaves.sk/">
        <img
          src={logoKV}
          alt="logo Karlova Ves"
          className="size-10 absolute bottom-10 left-4 shadow"
        />
      </a>
    </>
  );
};

export default Logo;
