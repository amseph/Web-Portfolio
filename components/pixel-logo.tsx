export function PixelLogo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-labelledby="pixel-logo-title"
      shapeRendering="crispEdges"
    >
      <title id="pixel-logo-title">Pixel Logo</title>
      <path
        fill="currentColor"
        d="
          M264 20H296V88H328V136H360V168H392V200H424V232H488V264H424V296H392V344H360V304H328V264H296V224H264V192H232V168H192V136H232V104H264V20Z

          M248 492H216V424H184V376H152V344H120V312H88V280H24V248H88V216H120V168H152V208H184V248H216V288H248V320H280V344H320V376H280V408H248V492Z
        "
      />
    </svg>
  );
}
