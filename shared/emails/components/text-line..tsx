import React from "react";
import { Text } from "@react-email/components";

interface TextLineProps {
  children: React.ReactNode;
}

export default function TextLine({ children }: TextLineProps) {
  return <Text style={textLine}>{children}</Text>;
}

const textLine = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "32px 0",
};
