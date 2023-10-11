import { Button, Container,  ClickAwayListener, Typography } from "@mui/material";
import { useRef, useState, useEffect } from "react";

import AddIcon from "@mui/icons-material/Add";
import Input from "@mui/material/Input";

import useCards from "@/hooks/useCards";


import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";

import {updateList } from "@/utils/client";

export type CardDetailProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
};


export default function CardDetail({ id, name,description}: CardDetailProps) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [edittingName, setEdittingName] = useState(false);
  const { fetchLists, fetchCards } = useCards();

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  const handleUpdateName = async () => {
    if (!inputRef.current) return;

    const newName = inputRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setEdittingName(false);
  };
  const editName = (event: React.MouseEvent<HTMLElement>) => {
    setEdittingName(true); 
    event.stopPropagation();
  };
  
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
         <p>{description}</p>
        <img
          src="d4162862.jpg"
          alt="Card Image"
          style={{ maxWidth: "100%", height: "auto" }}
        />
                  {edittingName ? (
                    <ClickAwayListener onClickAway={handleUpdateName}>
                      <Input
                        autoFocus
                        defaultValue={name}
                        className="grow"
                        placeholder="Enter a new name for this list..."
                        sx={{ fontSize: "1.5rem" }}
                        inputRef={inputRef}
                      />
                    </ClickAwayListener>
                  ) : (
                    <button
                      onClick={(event) => editName(event)}
                      className="w-full rounded-md p-2 hover:bg-white/10"
                      style={{zIndex: 2}}
                    >
                      <Typography gutterBottom variant="h5" component="div">
                        {name}
                      </Typography>
                    </button>
                  )}
       
     
          <div className="flex flex-col gap-4">
       
          <Button
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            <AddIcon className="mr-2" />
            Add a card
          </Button>
        </div>
  
        <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={id}
      />  
      </Container>
    </Container>
  );
}