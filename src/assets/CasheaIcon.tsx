import React from "react";

/**
 * Icono de círculo completo dividido en 4 cuadrantes.
 * Margen exacto de 0px entre cuadrantes (se tocan perfectamente).
 *
 * Geometría (ViewBox 512x512):
 * - Centro: 256
 * - Gap Total: 0px
 * - Offset desde el centro: 0px
 * - Radio Exterior: 256
 * - Radio Interior: 128
 */
interface FaQuadrantCircleProps extends React.SVGProps<SVGSVGElement> {
  color?: string;
  size?: string | number;
  title?: string;
  className?: string;
}

const CasheaIcon: React.FC<FaQuadrantCircleProps> = (props) => {
  const {
    color = "currentColor",
    size = "20em",
    title,
    className,
    ...rest
  } = props;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill={color}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...rest}
    >
      {title && <title>{title}</title>}

      {/* Explicación de Coordenadas para Gap 0px:
        Centro = 256.
        Todas las líneas rectas (L) y puntos finales de arcos (A) usan exactamente 256
        como coordenada x o y cuando tocan los ejes divisores.
      */}

      {/* Cuadrante 2: Inferior Derecho */}
      <path d="M512 256 L384 256 A128 128 0 0 1 256 384 L256 512 A256 256 0 0 0 512 256 Z" />

      {/* Cuadrante 3: Inferior Izquierdo */}
      <path d="M256 512 L256 384 A128 128 0 0 1 128 256 L0 256 A256 256 0 0 0 256 512 Z" />

      {/* Cuadrante 4: Superior Izquierdo */}
      <path d="M0 256 L128 256 A128 128 0 0 1 256 128 L256 0 A256 256 0 0 0 0 256 Z" />
    </svg>
  );
};

export default CasheaIcon;
