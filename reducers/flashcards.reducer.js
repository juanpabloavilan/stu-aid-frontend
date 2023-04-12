import { FLASHCARD_TYPES } from "./flashcard.types";

const initialState = {
  flashcards: [],
};

//Reducer function.
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FLASHCARD_TYPES.setFlashcards:
      return setFlashcards(action, state);
    case FLASHCARD_TYPES.addFlashcard:
      return addFlashcard(action, state);
    case FLASHCARD_TYPES.removeFlashcard:
      return removeFlashcard(action, state);
    case FLASHCARD_TYPES.editFlashcard:
      return editFlashcard(action, state);
    default:
      console.log(state, action);
      return state;
  }
};

// Flashcard payload según el tipo
const payloadAccordingType = {
  "front-reverse": {
    front: "",
    back: "",
  },
  "true-false": {
    front: "",
    back: {
      answer: true,
    },
  },
  elaborated: {
    front: "",
    back: {
      answer: "",
    },
  },
};
//Setear flashcards.
// El action.payload: {newFlashcards}
const setFlashcards = (action, state) => {
  return { ...state, flashcards: action.payload };
};

//Añadir flashcard al estado.
// El action.payload: {subjectId, type}
const addFlashcard = (action, state) => {
  const { subjectId, type } = action.payload;
  return {
    ...state,
    flashcards: [
      ...state.flashcards,
      {
        id: state.flashcards.length + 1,
        pos: state.flashcards.length + 1,
        subjectId: subjectId,
        type: type,
        status: "active",
        payload: payloadAccordingType[type],
      },
    ],
  };
};

//Eliminar flashcard del estado
// El action.payload: {id, pos}
const removeFlashcard = (action, flashcards) => {
  const { id, pos } = action.payload;
  return flashcards.filter(
    ({ id: currId, pos: currPos }) =>
      !((currId && currId === id) || (currPos && currPos === pos))
  );
};

//Editar flashcard del estado
// El action.payload: {id, pos, front, back}
const editFlashcard = (action, state) => {
  const { id, pos, front, back } = action.payload;
  return state.flashcards.map((item) => {
    if ((item.id && item.id === id) || (item.pos && item.pos === pos))
      return {
        ...item,
        payload: {
          front,
          back,
        },
      };
    return item;
  });
};
