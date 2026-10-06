import geometry from "../brand-geometry.json";

/** Selected symbol C. “Legame” is the concept label, not the product name. */
export function BrandSymbol({
  small = false,
  className = "",
}: {
  small?: boolean;
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 96 96"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      {geometry[small ? "small" : "regular"].map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
export function Brand() {
  return (
    <span
      className="brand"
      role="img"
      aria-label="Simbolo del prodotto, nome da confermare"
    >
      <BrandSymbol className="brand-symbol" />
    </span>
  );
}
