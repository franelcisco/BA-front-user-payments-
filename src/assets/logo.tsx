import logoSvg from "./logo-full-color-stacked.svg";

export default function BoneAppetitLogo() {
  return (
    <img
      src={logoSvg}
      alt="Bone Appetit Logo"
      width="100"
      height="90"
      style={{ objectFit: "contain" }}
    />
  );
}
