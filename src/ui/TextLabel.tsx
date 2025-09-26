interface TextLabelProps {
  labelText: string;
  textColor?: string;
  textSize?: string;
}

function TextLabel({
  labelText,
  textColor = "text-primary_2",
  textSize = "text-sm",
}: TextLabelProps) {
  return <p className={`mb-0.5 ${textColor} ${textSize}`}>{labelText}</p>;
}

export default TextLabel;
