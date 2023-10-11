import { Button, Container } from "@mui/material";
import { useRef } from "react";


export type CardDetailProps = {
  id: string;
  name: string;
  description: string;
};

export default function CardDetail({ id, name, description }: CardDetailProps) {
  const inputRef1 = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: "black",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md" sx={{ mt: "2%", paddingBottom: "15%" }}>
      <h1 style={{ fontSize: '2rem', marginTop: '1rem' }}>{name}</h1>     <p>{description}</p>
        <img
          src="d4162862.jpg"
          alt="Card Image"
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <div>
          <Button className="text-start" ref={inputRef1}>
            Button 1
          </Button>
          <Button className="text-start" ref={inputRef2}>
            Button 2
          </Button>
        </div>
      </Container>
    </Container>
  );
}