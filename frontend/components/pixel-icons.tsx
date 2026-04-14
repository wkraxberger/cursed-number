/**
 * Icons for the About page.
 *
 * Source PNGs are 64×64 white-on-transparent pixel art in `public/icons/`.
 * Rendered with `image-rendering: pixelated` so they stay blocky when
 * scaled. Color is applied via CSS mask (the PNG alpha channel is the
 * mask shape, `backgroundColor` provides the visible color).
 */

type IconProps = {
  size?: number;
  color?: string;
};

function PixelIcon({
  size = 28,
  color = "#6878B0",
  src,
  label,
}: IconProps & { src: string; label: string }) {
  const mask = `url(${src})`;
  return (
    <span
      role="img"
      aria-label={label}
      style={{
        display: "inline-block",
        width: size,
        height: size,
        backgroundColor: color,
        WebkitMaskImage: mask,
        maskImage: mask,
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        imageRendering: "pixelated",
      }}
    />
  );
}

export function SignalIcon(props: IconProps) {
  return <PixelIcon {...props} src="/icons/radio-tower.png" label="Signal" />;
}

export function BinaryIcon(props: IconProps) {
  return <PixelIcon {...props} src="/icons/computing.png" label="Decode" />;
}

export function SkullIcon({ color = "#C44030", ...rest }: IconProps) {
  return <PixelIcon {...rest} color={color} src="/icons/skull.png" label="Skull" />;
}
