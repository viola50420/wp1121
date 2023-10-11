import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Album as AlbumIcon } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Add as AddIcon } from "@mui/icons-material";
import { Button, Container } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";
import CardDetail from './components/CardDetail';



function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [DeleteMode, setDeleteMode] = useState(false);
  const [windowopen, setwindowopen] = useState(false);
  const [whichwindow, setwhichwindow] = useState("");
  
  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);


  function getIndex()
  {
      return lists.findIndex((playlist) => (playlist.id === whichwindow));
  }

  return (
    <>

<HeaderBar />

<div className="flex justify-center items-center h-full">
<main className={`flex flex-col gap-6 px-4 md:px-8 lg:px-24 py-12  ${windowopen ? 'hidden' : ''}`}>
 


    <div className="flex flex-col lg:flex-row items-center gap-4">
      <div className="flex items-center gap-4"> 
        <p style={{ color: 'white' }}>my playlists</p>
        <Button
          variant="contained"
          style={{ width: '100%' }}
          className="w-80 md:w-auto"
          onClick={() => setNewListDialogOpen(true)}
        >
          <AddIcon className="mr-2" />
          Add
        </Button>

        <Button
          variant="contained"
          style={{ width: '100%' }}
          className="w-80 md:w-auto"
          onClick={() => DeleteMode(true)}
        >
          <AddIcon className="mr-2" />
          Delete
        </Button>
                
      </div>
    </div>
    <Container columnGap={"7%"} rowGap={'5%'} justifyContent={"space-between"}  sx={{ mr: 10, ml:10, mt:5}}>
    {/* <div className="flex flex-row w-full lg:w-full mt-6 lg:mt-0"> */}
      {lists.map((list) => (
          <button onClick={() => {setwindowopen(true);setwhichwindow(list.id);}} style={{background: "transparent", border: "none", textAlign:"left", letterSpacing:1}}>

        <CardList key={list.id} {...list} />
        </button>
      ))}
      </Container>
   
     

    {/* </div> */}
    
   
    <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        />
  </main>
</div>

{windowopen? (
            <>
                <IconButton
                    size="medium"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ ml: 2, mt:2 }}
                    onClick={() => {setwindowopen(false); setwhichwindowopen("");}}
                    >
                    <ArrowBackIcon />
                </IconButton>
                <CardDetail
                  id={lists[getIndex()].id}
                  name={lists[getIndex()].name} 
                  description={lists[getIndex()].description}
                  // songs={lists[getIndex()].songs}
                />
            </>):(<>/</>)}
    </>
  );
}


export default App;
