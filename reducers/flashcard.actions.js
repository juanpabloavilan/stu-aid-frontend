import { FLASHCARD_TYPES } from "./flashcard.types";

export const setFlashcards = (payload) => ({
  type: FLASHCARD_TYPES.setFlashcards,
  payload,
});

export const addFlashcard = (payload) => ({
  type: FLASHCARD_TYPES.addFlashcard,
  payload: {
    type: payload.type,
    subjectId: payload.subjectId,
  },
});
