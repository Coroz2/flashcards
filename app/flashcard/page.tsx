"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { useSearchParams } from "next/navigation";
import db from "../../firebase"; // Adjust import according to your firebase config file
import { collection, doc, getDocs } from "firebase/firestore";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

interface FlashcardData {
  id: string;
  front: string;
  back: string;
  // Add any other fields you may have in your flashcards
}

interface FlippedState {
  [key: string]: boolean;
}

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([]);
  const [flipped, setFlipped] = useState<FlippedState>({});

  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      const colRef = collection(doc(collection(db, "users"), user.id), search);
      const docsSnapshot = await getDocs(colRef);
      const flashcardsData: FlashcardData[] = [];
      docsSnapshot.forEach((doc) => {
        flashcardsData.push({ id: doc.id, ...doc.data() } as FlashcardData);
      });
      setFlashcards(flashcardsData);
    }
    getFlashcard();
  }, [search, user]);

  const handleCardClick = (id: string) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={3} sx={{ mt: 4 }}>
        {flashcards.map((flashcard) => (
          <Grid item xs={12} sm={6} md={4} key={flashcard.id}>
            <Card>
              <CardActionArea onClick={() => handleCardClick(flashcard.id)}>
                <CardContent>
                  <Box
                    sx={
                      {
                        /* Add your flip animation styling here */
                      }
                    }
                  >
                    <div>
                      <div>
                        <Typography variant="h5" component="div">
                          {flashcard.front}
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="h5" component="div">
                          {flashcard.back}
                        </Typography>
                      </div>
                    </div>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
