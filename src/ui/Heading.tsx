interface HeadingProp {
  name: string;
  size: keyof typeof sizes;
  marginBottom?: string;
}

const sizes = {
  tiny: "text-base",
  small: "text-xl",
  medium: "text-3xl",
};

function Heading({ name, size, marginBottom = "mb-8" }: HeadingProp) {
  return (
    <h2 className={`${sizes[size]} uppercase text-primary_2 ${marginBottom}`}>
      {name}
    </h2>
  );
}

export default Heading;
