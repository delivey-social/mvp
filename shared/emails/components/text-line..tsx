import React from "react";
import { Text } from "@react-email/components";

interface TextLineProps {
  style?: React.HTMLProps<unknown>["style"];
  children: React.ReactNode;
}

export default function TextLine({ children, style }: TextLineProps) {
  return <Text style={{ ...textLine, ...style }}>{children}</Text>;
}

const textLine = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "left" as const,
  margin: "16px 0",
};
