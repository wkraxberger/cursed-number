type Scene = "home" | "about" | "faq" | "log";

const sceneExt: Record<Scene, string> = {
  home: "png",
  about: "png",
  faq: "png",
  log: "png",
};

export function Background({ scene }: { scene: Scene }) {
  const id = `bg-${scene}`;
  return (
    <>
      <style>{`
        #${id} {
          background-position: center;
        }
        @media (max-width: 600px) and (orientation: portrait) {
          #${id} {
            background-position: 62% center;
          }
        }
      `}</style>
      <div
        id={id}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `url(/backgrounds/${scene}.${sceneExt[scene]})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          imageRendering: "pixelated",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          backgroundColor: "#0A0A0F",
          opacity: 0.35,
        }}
      />
    </>
  );
}
