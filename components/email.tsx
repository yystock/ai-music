import React from "react";
import { Body, Container, Head, Tailwind, Heading, Html, Img, Link, Text, Button } from "@react-email/components";

interface EmailTemplateProps {
  message: string;
}

export const EmailTemplate = ({ message }: EmailTemplateProps) => (
  <Html>
    <Head />
    <Tailwind>
      <Body className="mx-auto bg-white font-sans">
        <Container className="rounded-lg  p-8 shadow-lg">
          <Heading className="pt-4 text-xl">🫶 Hello There 🫶</Heading>
          <Text className="text-lg font-medium text-gray-700 ">{message}</Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);

export default EmailTemplate;
