import { useRef, useState } from "react";


import DeleteIcon from "@mui/icons-material/Delete";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { deleteList, updateList } from "@/utils/client";


import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";

export type CardListProps = {
  id: string;
  name: string;
  cards: CardProps[];  
  isdeleteMode: number;

};

export default function CardList({ id, name,  isdeleteMode  }: CardListProps) {
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const { fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);

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
    setEditingName(false);
  };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  };

  return (
    <>
      <Paper className="w-80 p-6">
        <div className="flex gap-4">
          {editingName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a new name for this list..."
                sx={{ fontSize: "2rem" }}
                inputRef={inputRef}
              />
            </ClickAwayListener>
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="w-full rounded-md p-2 hover:bg-white/10"
            >
              <Typography className="text-start" variant="h4">
                {name}
              </Typography>
            </button>
          )}
          <div className="grid place-items-center">
        
            {(isdeleteMode === 1) ? (
                  <IconButton 
                  color="error" 
                  onClick={() => {
                    handleDelete();
                    window.location.reload();
                  }} 
                  style={{zIndex: 3}}
                >
                        <DeleteIcon/>
                      </IconButton>
                  ) : (
                    <></>
                  )}
          </div>
        </div>
        <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />

      </Paper>
      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={id}
      />
    </>
  );
}
